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
  if (req.params.id) {
    db.query(
      `SELECT id, id_user, type, brand, size, gender, description, is_deposit, created_at FROM clothing`,
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
