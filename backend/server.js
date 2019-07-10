const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");
const passport = require("passport");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.static("./uploadPictures"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/auth", require("./auth"));

// Initialize upload

const storage = multer.diskStorage({
  destination: "./uploadPictures/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Allow 1 file

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myFile");

// Allow multiple files

const uploadClothe = multer({
  storage: storage
}).array("pictureClotheUpload", 3);

// Allow extensions

checkFileType = (file, cb) => {
  const fileTypes = /jpeg||jpg||png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only");
  }
};

// Homepage

app.get(
  "/articles/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.query(
      `SELECT id, id_clothing, id_user, is_proof, created_at, url FROM picture ORDER BY created_at DESC`,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).send("error when getting pictures route");
        }
        if (!rows) {
          return res.status(404).send("No pictures found");
        }
        res.status(200).send(rows);
      }
    );
  }
);

// Upload a proof-picture

app.post("/currentUser/:clothingId/:uploadProof", (req, res) => {
  const path = req.file.path;
  const clothingId = req.params.clothingId;
  const currentUser = req.params.currentUser;
  upload(req, res, err => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("error when upload a proof picture: File too large");
    } else {
      console.log(req.file);
      res.send(req.file);
    }
  });
});

// Upload clothes pictures

app.post("/currentUser/:uploadPicture", (req, res) => {
  const path = req.file.path;
  const currentUser = req.params.currentUser;
  const type = req.body.type;
  const brand = req.body.brand;
  const size = req.body.size;
  const description = req.body.description;
  const deposit = req.body.deposit;

  uploadClothe(req, res, err => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("error when upload a proof picture: File too large");
    } else {
      console.log(req.file);
      res.send(req.file);
    }
  });
  db.query(
    `INSERT INTO clothing ( id_user, type, brand, size, description, is_deposit, created_at)
    VALUES ( ${currentUser}, ${type}, ${brand}, ${size}, ${description}, ${deposit}, Now());`,
    (err, rows, fields) => {
      if (err) throw err;
      db.query(
        `INSERT INTO pictures ( id_clothing, id_user, is_proof, created_at, url)
        VALUES (${clothingId}, ${currentUser}, 0, Now(), ${path});`,
        (err, rows, fields) => {
          if (err) throw err;
          res.status(200).send(rows);
        }
      );
    }
  );
});

// Clothing-deposit

app.get("/deposit/", (req, res) => {
  let result = {};
  db.query(
    `SELECT id_clothing FROM picture ORDER BY created_at DESC`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error when getting pictures route");
      }
      if (!rows) {
        return res.status(404).send("No pictures found");
      }
      result.pictures = rows;

      db.query(
        `SELECT id FROM clothing WHERE is_deposit=1`,
        (err, rowsDeposits) => {
          if (err) {
            console.log(err);
            return res.status(500).send("error when getting articles route");
          }
          result.deposit = rowsDeposits.map(deposit => {
            return deposit.id;
          });
          res.status(200).send(result);
        }
      );
    }
  );
});

// ClothingPage

app.get(
  "/articles/:id/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const articleId = req.params.id;
    let answer = {};
    db.query(
      `SELECT id, id_user, type, size, gender, description, is_deposit FROM clothing WHERE id=${articleId}`,
      (err, rowsArticle) => {
        if (err) {
          console.log(err);
          return res.status(500).send("error when getting articles route");
        }
        answer.clothing = rowsArticle[0];

        db.query(
          `SELECT id, id_clothing, id_user, url FROM picture WHERE id_clothing=${articleId}`,
          (err, rowsPics) => {
            if (err) {
              console.log(err);
              return res.status(500).send("error when getting picture route");
            }
            answer.pictures = rowsPics;

            const picUsers = rowsPics.map(pic => {
              return pic.id_user;
            });

            db.query(
              `SELECT DATEDIFF(NOW(), created_at) AS date_diff,
              TIME(DATE_ADD(created_at,INTERVAL 2 hour)) as hour_send, id, id_user, id_clothing, content
               FROM comment WHERE id_clothing=${articleId} ORDER BY created_at DESC`,
              (err, rowsComments) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .send("error when getting comment route");
                }
                answer.comments = rowsComments;
                const commUsers = rowsComments.map(comm => {
                  return comm.id_user;
                });

                let listeUsers = picUsers.concat(commUsers);
                listeUsers.push(rowsArticle[0].id_user);

                const uniqUsers = Array.from(new Set(listeUsers));

                db.query(
                  `SELECT id, nickname, avatar FROM user WHERE id IN (${uniqUsers})`,
                  (err, rowsUsers) => {
                    if (err) {
                      console.log(err);
                      return res
                        .status(500)
                        .send("error when getting comment route");
                    }
                    answer.users = rowsUsers;
                    res.status(200).send(answer);
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

//Messaging

app.get(
  "/messagerie/:id_reader",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.params.id_reader) {
      db.query(
        `SELECT id_author, id_reader, content, 
      DATEDIFF(NOW(), message.created_at) AS date_diff,
      TIME(DATE_ADD(message.created_at,INTERVAL 2 hour)) as hour_send,
      nickname, 
      avatar
      FROM message
      INNER JOIN user ON user.id = message.id_author
      WHERE (id_author=${req.params.id_reader} OR id_reader=${
          req.params.id_reader
        }) AND isLast=1;`,
        (err, rows) => {
          if (err) {
            console.log(err);
            res.status(500).send("error when getting messagerie route");
          }
          res.status(200).send(rows);
        }
      );
    }
  }
);

// Commenting

app.post(`/comment/:id`, (req, res) => {
  if (req.body.content !== "") {
    const content = req.body.content;
    const authorId = req.body.idAuthor;
    db.query(
      `INSERT INTO comment (id_user, id_clothing, content, created_at)
      VALUES ( ${authorId}, ${req.params.id}, "${content}", NOW());
  `,
      (err, rows) => {
        if (err) throw err;
        console.log("Comment recorded !");
        db.query(
          `SELECT nickname, avatar FROM comment INNER JOIN user on user.id=comment.id_user INNER JOIN clothing ON clothing.id = id_clothing WHERE id_clothing=${
            req.params.id
          }`,
          (err, rows) => {
            if (err) {
              console.log(err);
              res.status(500).send("error when getting comments route");
            }
            const newComment = {
              content: content,
              date_diff: 0,
              nickname: rows[0].nickname,
              avatar: rows[0].avatar,
              id_user: authorId
            };
            res.status(200).send(newComment);
          }
        );
      }
    );
  }
});

//Details messaging

app.get(
  "/message/:P1/:P2",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const P1 = req.params.P1;
    const P2 = req.params.P2;
    db.query(
      `SELECT 
    TIME(DATE_ADD(message.created_at,INTERVAL 2 hour)) as hour_send,
    content, 
    DATEDIFF(NOW(), message.created_at) AS date_diff,
    nickname, id_author,
    avatar
    FROM message
    INNER JOIN user ON user.id = message.id_author
      WHERE
      (id_author = ${P1} OR id_reader = ${P1})
      AND (id_author = ${P2} OR id_reader = ${P2})
      ORDER BY message.created_at DESC;`,
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting message route");
        }
        res.status(200).send(rows);
      }
    );
  }
);

//Update message

app.post("/message/:P1/:P2", (req, res) => {
  const P1 = req.params.P1;
  const P2 = req.params.P2;
  const content = req.body.content;
  if (content !== "") {
    db.query(
      `UPDATE
    message
    SET isLast=0
    WHERE
    (id_author = ${P1} OR id_reader = ${P1})
    AND (id_author = ${P2} OR id_reader = ${P2});`,
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when update message route");
        } else {
          db.query(
            `INSERT INTO message(id_author,id_reader,content,created_at,isLast) 
          VALUES(${P1},${P2},"${content}",NOW(),1);`,
            (err, rows) => {
              if (err) {
                console.log(err);
                res.status(500).send("error when post new message");
              }
              db.query(
                `SELECT nickname, avatar FROM user WHERE id=${P1}`,
                (err, rows) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("error when getting message route");
                  }
                  const newMess = {
                    content: content,
                    date_diff: 0,
                    nickname: rows[0].nickname,
                    avatar: rows[0].avatar
                  };
                  res.status(200).send(newMess);
                }
              );
            }
          );
        }
      }
    );
  } else {
    res.status(403).send("empty message");
  }
});

// Profile page routes

app.get(
  "/profil/:profileId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileId = req.params.profileId;
    db.query(
      `SELECT id, nickname, avatar, description, location FROM user WHERE id=${profileId}`,
      (err, rowsUser) => {
        if (err) {
          console.log(err);
          return res.status(500).send("error when getting profile route");
        }
        let profileData = {
          profile: rowsUser[0]
        };

        db.query(
          `SELECT id, id_clothing, url FROM picture WHERE id_user=${profileId} ORDER BY created_at DESC`,
          (err, rowsPics) => {
            if (err) {
              console.log(err);
              return res.status(500).send("error when getting picture route");
            }
            profileData.pictures = rowsPics;

            db.query(
              `SELECT DISTINCT(id_user) FROM social WHERE content_type = "follow" AND id_content=${profileId} `,
              (err, rowsFollowers) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .send("error when getting social route");
                }
                profileData.followers = rowsFollowers;

                db.query(
                  `SELECT DISTINCT(id_content) FROM social WHERE content_type = "follow" AND id_user=${profileId} `,
                  (err, rowsFollowings) => {
                    if (err) {
                      console.log(err);
                      return res.status(500);
                    }
                    profileData.followings = rowsFollowings;

                    db.query(
                      `SELECT id FROM clothing WHERE id_user = ${profileId}`,
                      (err, rowsPosts) => {
                        if (err) {
                          console.log(err);
                          return res
                            .status(500)
                            .send("error when getting clothing route");
                        }
                        profileData.posts = rowsPosts;
                        res.status(200).send(profileData);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

//Borrow

app.get(
  "/emprunt/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.params.userId;
    db.query(
      `SELECT borrow.id_clothing, url, borrow.id
    FROM borrow 
    INNER JOIN picture ON picture.id= borrow.id_picture
    INNER JOIN clothing on clothing.id = borrow.id_clothing
    INNER JOIN user on user.id = borrow.id_user
    WHERE borrow.id_user = ${userId}`,
      (err, rows) => {
        if (err) {
          return res.status(500).send("error when getting emprunt route");
        }
        res.status(200).send(rows);
      }
    );
  }
);

//Delete a Borrow

app.delete(`/emprunt/:borrowId`, (req, res) => {
  const borrowId = req.params.borrowId;
  db.query(
    `DELETE FROM borrow
    WHERE id=${borrowId}`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error when delete borrow");
      }
      res.status(200).send(rows);
    }
  );
});

// Add a Borrow

app.post(`/emprunt/:userId/:clothingId/:pictureId`, (req, res) => {
  const userId = req.params.userId;
  const clothingId = req.params.clothingId;
  const pictureId = req.params.pictureId;
  db.query(
    `INSERT INTO borrow (id_user, id_clothing, id_picture) VALUES (${userId}, ${clothingId}, ${pictureId});
    `,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error when post borrow");
      }
      const newBorrow = {
        id_user: userId,
        id_clothing: clothingId,
        id_picture: pictureId
      };
      res.status(200).send(newBorrow);
    }
  );
});

// Partners page

app.get(
  "/partenaire/:profileId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileId = req.params.profileId;
    db.query(`SELECT points FROM user WHERE id=${profileId}`, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error when getting profile route");
      }
      res.status(200).send(rows[0]);
    });
  }
);

// Picture liking

app.get("/like/:idAuthor", (req, res) => {
  const authorId = req.params.idAuthor;
  db.query(
    `SELECT DISTINCT(id_content) FROM social WHERE id_user = ${authorId} AND content_type = "like"`,
    (err, rows) => {
      if (err) {
        return res.status(500).send("error when getting like route");
      }
      let likesArray = rows.map(row => {
        return row.id_content;
      });
      res.status(200).send(likesArray);
    }
  );
});

app.post("/like/:idPicture", (req, res) => {
  const pictureId = req.params.idPicture;
  const authorId = req.body.idAuthor;
  db.query(
    `INSERT INTO social (id_user, content_type, id_content, created_at) VALUES (${authorId}, "like", ${pictureId}, NOW())`,
    (err, rows) => {
      if (err) {
        return res.status(500).send("error when posting like route");
      }
      res.status(200).send(rows);
    }
  );
});

app.put("/like/:idPicture", (req, res) => {
  const pictureId = req.params.idPicture;
  const authorId = req.body.idAuthor;
  db.query(
    `DELETE FROM social WHERE id_user=${authorId} AND content_type="like" AND id_content=${pictureId}`,
    (err, rows) => {
      if (err) {
        return res.status(500).send("error when deleting like route");
      }
      res.status(200).send(rows);
    }
  );
});

// Follow button

app.post("/follow/:followId", (req, res) => {
  const followId = req.params.followId;
  const authorId = req.body.idAuthor;
  db.query(
    `INSERT INTO social (id_user, content_type, id_content, created_at) VALUES (${authorId}, 'follow', ${followId}, NOW())`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when getting social route");
      }
      db.query(
        `SELECT DISTINCT(id_user) FROM social WHERE content_type="follow" AND id_content = ${followId}`,
        (err, rows) => {
          if (err) {
            console.log(err);
            res.status(500).send("error when getting social route");
          }
          res.status(200).send(rows);
        }
      );
    }
  );
});

app.put("/follow/:followId", (req, res) => {
  const followId = req.params.followId;
  const authorId = req.body.idAuthor;
  db.query(
    `DELETE FROM social WHERE id_user=${authorId} AND content_type="follow" AND id_content=${followId}`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when getting social route");
      }
      db.query(
        `SELECT DISTINCT(id_user) FROM social WHERE content_type="follow" AND id_content = ${followId}`,
        (err, rows) => {
          if (err) {
            console.log(err);
            res.status(500).send("error when getting social route");
          }
          res.status(200).send(rows);
        }
      );
    }
  );
});

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
