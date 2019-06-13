const express = require("express");
const cors = require("cors");
const app = express();
const { portNumber, db } = require("./conf");

app.use(cors());

app.get("/", (req, res) => {
  const msg = "Welcome on Freep!";
  console.log(msg);
  res.status(200).send(msg);
});

app.get("/articles", (req, res) => {
  db.query("SELECT description, is_deposit FROM clothing", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("error when getting articles route");
    }
    res.status(200).send(rows);
  });
});

app.get("/comments", (req, res) => {
  db.query("SELECT content FROM comment", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("error when getting comments route");
    }
    res.status(200).send(rows);
  });
});

app.get("/commentsById", (req, res) => {
  db.query(
    "SELECT COUNT(id_clothing) AS count FROM comment WHERE id_clothing = 1 GROUP BY id_clothing",
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when getting comments number");
      }
      res.status(200).send(rows);
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("error when getting users route");
    }
    res.status(200).send(rows);
  });
});

//Clothing

app.get("/user/", (req, res) => {
  if (req.query.isUser) {
    db.query(
      "SELECT nickname,password,email,phone,firstname,lastname,birthdate,avatar,location,points,is_admin,created_at,id_borrow FROM user",
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting articles route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

app.get("/vetement/", (req, res) => {
  if (req.query.idVetement) {
    db.query(
      "SELECT id_user,type,brand,size,gender,description,is_deposit,created_at FROM clothing",
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting articles route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

app.get("/commentaire", (req, res) => {
  if (req.query.idVetement) {
    db.query(
      "SELECT content FROM clothing WHERE id = '1' FROM clothing",
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("error when getting articles route");
        }
        res.status(200).send(rows);
      }
    );
  }
});

app.post("/commentaire", (req, res) => {
  db.query(
    "INSERT INTO `comment` (`id_user`,`id_clothing`,`content`,`created_at`) VALUES ('1','1','commentaire de test',NOW())",
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when getting articles route");
      }
      res.status(200).send(rows);
    }
  );
});

//app.get("/photo?idVetement=:idVetement", (req, res) => {
app.get("/photo", (req, res) => {
  if (req.query.idVetement) {
    db.query("SELECT url FROM picture WHERE id='1", (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when getting articles route");
      }
      res.status(200).send(rows);
    });
  }
});

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
