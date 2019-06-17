const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Articles

app.get("/articles/", (req, res) => {
  db.query(
    `SELECT id, id_clothing, id_user, is_proof, created_at, url FROM picture`,
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

app.get("/articles/:id/pictures", (req, res) => {
  if (req.params.id) {
    db.query(
      `SELECT p.url FROM picture AS p JOIN clothing AS cl ON p.id_clothing=${
        req.params.id
      }`,
      (err, rows) => {
        console.log(rows);
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send("error when getting pictures-by-article route");
        }
        if (!rows) {
          return res.status(404).send("No pictures found");
        }
        res.status(200).send(rows);
      }
    );
  }
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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
