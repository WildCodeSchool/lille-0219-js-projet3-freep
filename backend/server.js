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

app.post("/social/:pictureId", (req, res) => {
  db.query(
    `INSERT INTO social (id_user, content_type, id_content, created_at ) VALUES ('1', 'like', ${
      req.params.pictureId
    }, NOW())`
  ),
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when liking picture");
      }
      res.status(200).send(rows);
    };
});

app.delete("/social/:pictureId", (req, res) => {
  db.query(
    `DELETE FROM social WHERE id_user = 1 AND id_content = ${
      req.params.pictureId
    }`
  ),
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("error when liking picture");
      }
      res.status(200).send(rows);
    };
});

// app.post("/comments", (req, res) => {
//   db.query(
//     "INSERT INTO `comment` (`id_user`,`id_clothing`,`content`,`created_at`) VALUES ('1','1','commentaire de test',NOW())",
//     (err, rows) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("error when getting comments route");
//       }
//       res.status(200).send(rows);
//     }
//   );
// });

// app.get("/pictures", (req, res) => {
//   if (req.query.idVetement) {
//     db.query(
//       `SELECT url FROM picture WHERE id=${req.query.idVetement}`,
//       (err, rows) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("error when getting picture route");
//         }
//         res.status(200).send(rows);
//       }
//     );
//   }
// });

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
