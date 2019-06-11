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

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
