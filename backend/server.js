const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");
const passport = require("passport");

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", require("./auth"));

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
app.get("/message/:P1/:P2", (req, res) => {
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
});

//Update message
app.post("/message/:P1/:P2", (req, res) => {
  const P1 = req.params.P1;
  const P2 = req.params.P2;
  const content = req.body.content;
  console.log(req.body);
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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
