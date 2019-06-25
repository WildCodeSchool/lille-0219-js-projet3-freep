const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    `SELECT id_user, type, size, gender, description, is_deposit FROM clothing WHERE id=${articleId}`,
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

//Update message
app.put("/message/:id_reader/:id_author", (req, res) => {
  const P1 = req.params.id_reader;
  const P2 = req.params.id_author;
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
      res.status(200).send(rows);
    }
  );
});

//Post message
app.post("/message/:id_reader/:id_author", (req, res) => {
  const P1 = req.params.id_reader;
  const P2 = req.params.id_author;
  db.query(
    `INSERT INTO message(id_author,id_reader,content,created_at,isLast) 
    VALUES(${P1},${P2},"Hello",NOW(),1);`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when post new message");
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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
