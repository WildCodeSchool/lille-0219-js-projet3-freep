const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const passport = require("passport");

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", require("./auth"));

// Homepage

app.get(
  "/articles/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // if (req.user) {
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
    // } else {
    //   res.redirect("/");
    // }
  }
);

// ClothingPage

app.get(
  "/articles/:id/",
  // passport.authenticate("jwt", { session: false }),
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
              `SELECT id, id_user, id_clothing, content, created_at FROM comment WHERE id_clothing=${articleId}`,
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
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.params.id_reader) {
      db.query(
        `SELECT id_author, id_reader, content, 
      DATEDIFF(NOW(), message.created_at) AS date_diff,
      TIME(message.created_at) as hour_send,
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

app.post(
  `/comment/:id`,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.content !== "") {
      db.query(
        `INSERT INTO comment ( id_user, id_clothing, content, created_at)
      VALUES ( '4', ${req.params.id}, '${req.body.content}', NOW());
  `,
        (err, rows, fields) => {
          if (err) throw err;
          console.log("Comment recorded !");
          res.status(200).send(rows);
        }
      );
    }
  }
);

//Details messaging
app.get(
  "/message/:P1/:P2",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const P1 = req.params.P1;
    const P2 = req.params.P2;
    db.query(
      `SELECT 
    TIME(DATE_ADD(message.created_at,INTERVAL 2 hour)) as hour_send,
    content, 
    DATEDIFF(NOW(), message.created_at) AS date_diff,
    nickname, 
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
app.post(
  "/message/:P1/:P2",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const P1 = req.params.P1;
    const P2 = req.params.P2;
    const content = req.body.content;
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
        }
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
    );
  }
);
// Profile page routes

app.get(
  "/profil/:profileId",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileId = req.params.profileId;
    db.query(
      `SELECT id, nickname, avatar, description FROM user WHERE id=${profileId}`,
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
                  `SELECT DISTINCT(id_user) FROM social WHERE content_type = "follow" AND id_user=${profileId} `,
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
  // passport.authenticate("jwt", { session: false }),
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
app.delete(
  `/emprunt/:borrowId`,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Add a Borrow
app.post(
  `/emprunt/:userId/:clothingId/:pictureId`,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// Upload a proof-picture
app.post(
  "/uploaddufichier",
  upload.single("monfichier"),
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    fs.rename(
      req.file.path,
      "public/pictures/" + req.file.originalname,
      err => {
        if (err) {
          res.send("error during the move");
        } else {
          res.send("File upload");
        }
      }
    );
  }
);
app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
