const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploadPictures/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myFile");

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

app.use(cors());
app.use(express.static("./uploadPictures"));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Upload a proof-picture
app.post("/currentUser/:uploadProof", (req, res) => {
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
  db.query(
    `INSERT INTO pictures ( id_clothing, id_user, is_proof, created_at, url)
    VALUES (${clothingId}, ${currentUser}, 1, Now(), ${path});`,
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).send(rows);
    }
  );
});

// Homepage

app.get("/articles/", (req, res) => {
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
});

// ClothingPage

app.get("/articles/:id/", (req, res) => {
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
                return res.status(500).send("error when getting comment route");
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
});

//Messaging

app.get("/messagerie/:id_reader", (req, res) => {
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
});

// Commenting

app.post(`/comment/:id`, (req, res) => {
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
});

//Details messaging
app.get("/message/:id_reader/:id_author", (req, res) => {
  const P1 = req.params.id_reader;
  const P2 = req.params.id_author;
  db.query(
    `SELECT content, 
    DATEDIFF(NOW(), message.created_at) AS date_diff,
    TIME(message.created_at) as hour_send,
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
});

// Profile page routes
app.get("/profile/:profileId", (req, res) => {
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
        `SELECT id, id_clothing, url FROM picture WHERE id_user=${profileId}`,
        (err, rowsPics) => {
          if (err) {
            console.log(err);
            return res.status(500).send("error when getting picture route");
          }
          profileData.pictures = rowsPics;

          res.status(200).send(profileData);
        }
      );
    }
  );
});

//Borrow
app.get("/emprunt/:userId", (req, res) => {
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
});

//Delete a Borrow
app.delete(`/emprunt/:userId/:borrowId`, (req, res) => {
  const userId = req.params.userId;
  const borrowId = req.params.borrowId;
  db.query(
    `DELETE FROM borrow
    WHERE id_user=${userId}
    AND id=${borrowId}`,
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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
