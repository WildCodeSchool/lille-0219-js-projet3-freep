const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
  if (req.params.id) {
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

app.get("/comments/:id", (req, res) => {
  if (req.params.id) {
    db.query(
      `SELECT content FROM comment WHERE id_clothing=${req.params.id}`,
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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
