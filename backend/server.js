const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/articles", (req, res) => {
  db.query("SELECT description, is_deposit FROM clothing", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("error when getting articles route");
    }
    res.status(200).send(rows);
  });
});

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

app.get("/articles/:id", (req, res) => {
  db.query(
    `SELECT id, id_user, type, brand, size, gender, description, is_deposit, created_at FROM clothing WHERE id=${
      req.params.id
    }`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error when getting articles route");
      }
      if (!rows) {
        return res.status(404).send("No articles found");
      }
      res.status(200).send(rows[0]);
    }
  );
});

app.get("/users/:id/clothing", (req, res) => {
  if (req.params.id) {
    db.query(
      `SELECT u.id, u.nickname, u.avatar FROM user AS u JOIN clothing AS cl ON u.id = cl.id_user WHERE u.id=${
        req.params.id
      } `,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).send("error when getting users route");
        }
        if (!rows) {
          return res.status(404).send("No users found");
        }
        res.status(200).send(rows[0]);
      }
    );
  }
});

app.get("/user/:id", (req, res) => {
  if (req.params.id) {
    db.query(
      `SELECT nickname,password,email,phone,firstname,lastname,birthdate,avatar,location,points,is_admin,created_at,id_borrow FROM user WHERE id=${
        req.params.id
      } `,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).send("error when getting users route");
        }
        if (!rows) {
          return res.status(404).send("No users found");
        }
        res.status(200).send(rows[0]);
      }
    );
  }
});

//Messaging

app.get("/messagerie/:id_reader", (req, res) => {
  if (req.params.id_reader) {
    db.query(
      `SELECT content, 
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

// Profile page routes

app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  db.query(
    `SELECT id, nickname, avatar, description FROM user WHERE id=${userId}`,
    (err, rowsUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send("error when getting profile route");
      }
      let profileData = {
        profile: rowsUser[0]
      };
      db.query(
        `SELECT id, id_clothing, url FROM picture WHERE id_user=${userId}`,
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
