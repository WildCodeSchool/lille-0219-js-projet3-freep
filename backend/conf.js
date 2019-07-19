require("dotenv").config();
const mysql = require("mysql");

const portNumber = process.env.BACKEND_PORT || "42134";
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "42.42.42.42",
  user: process.env.DB_USER || "user",
  database: process.env.DB_DATABASE || "database",
  password: process.env.DB_PASSWORD || "password"
});

const jwtSecret = process.env.JWT_SECRET || "secret";
const saltRounds = process.env.SALT_ROUNDS || 256;
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dlxzd7tqf",
  api_key: "923592476985338",
  api_secret: "8-vl6Uy_EJr9RsQ3r4Don5c4Q1A"
});

const key = {
  facebook: {
    clientID: "",
    clientSecret: ""
  }
};

module.exports = {
  portNumber,
  db,
  jwtSecret,
  saltRounds,
  key,
  cloudinary
};
