const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

app.use(cors());

app.get("/articles", (req, res) => {
  db.query("SELECT description, is_deposit FROM clothing", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("error when getting articles route");
    }
    res.status(200).send(rows);
  });
});

//Clothing

app.get("/user", (req, res) => {
  if (req.query.isUser) {
    db.query(
      `SELECT nickname,password,email,phone,firstname,lastname,birthdate,avatar,location,points,is_admin,created_at,id_borrow FROM user WHERE id=${
        req.query.isUser
      } `,
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting user route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

app.get("/clothing", (req, res) => {
  if (req.query.idVetement) {
    db.query(
      `SELECT id_user,clothing.type,brand,size,gender,description,is_deposit,created_at FROM clothing WHERE id=${
        req.query.idVetement
      } `,
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting clothing route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

app.get("/comments", (req, res) => {
  if (req.query.idVetement) {
    db.query(
      `SELECT content FROM comment WHERE id_clothing=${req.query.idVetement}`,
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting comments route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

app.post("/comments", (req, res) => {
  db.query(
    "INSERT INTO `comment` (`id_user`,`id_clothing`,`content`,`created_at`) VALUES ('1','1','commentaire de test',NOW())",
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when getting comments route");
      }
      res.status(200).send(rows);
    }
  );
});

app.get("/pictures", (req, res) => {
  if (req.query.idVetement) {
    db.query(
      `SELECT url FROM picture WHERE id=${req.query.idVetement}`,
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting picture route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

//Messaging

app.get("/messagerie/:id_reader", (req, res) => {
  if (req.params.id_reader) {
    db.query(
      `SELECT content, message.created_at, nickname, avatar FROM message INNER JOIN user ON user.id = message.id_author WHERE id_reader=${
        req.params.id_reader
      }`,
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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
