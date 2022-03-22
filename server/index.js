const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "password",
  database: "covidtravel_db",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const VaccineStatus = req.body.VaccineStatus;
  const VaccineType = req.body.VaccineType;
  const passport = req.body.passport;

  db.query(
    "INSERT INTO users (email, password, name, lastName, vaccine_status, vaccine_type, passport) VALUES (?,?,?,?,?,?,?)",
    [email, password, name, lastName, VaccineStatus, VaccineType, passport],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM covidtravel_db.users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("the server is running on 3001");
});
