const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// connect to local database
const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "password",
  database: "covidtravel_db",
  multipleStatements: true,
});

// insert a user into the database users table
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

// only returns list of countries where everything is requried 
app.get("/list-req", (req, res) => {
  db.query(
    `CALL get_countries_req(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

// only returns list of countries where everything is not requried 
app.get("/list-noreq", (req, res) => {
  db.query(
    `CALL get_countries_noreq(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

//  returns list of all countries in DB
app.get("/list-all", (req, res) => {
  db.query(
    `CALL get_all_countries(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

// returns list of all airlines in DB
app.get("/list-all-airlines", (req, res) => {
  db.query(
    `CALL get_all_airlines(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.get("/list-noreq-airline", (req, res) => {
  db.query(
    `CALL get_all_noreq_airlines(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

app.get("/list-req-airline", (req, res) => {
  db.query(
    `CALL get_all_req_airlines(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});


// select all users in the database.
app.get("/users", (req, res) => {
  db.query(`CALL get_all_users(?)`, true, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
});

// delete all users in the database and reset the increment counter.
app.get("/clear-users", (req, res) => {
  db.query(
    `CALL delete_users_and_reset(?)`, true,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});


// searchs the airline table based on the given inputs
app.post("/search-airlines", (req, res) => {
  const V = req.body.V;
  const M = req.body.M;
  db.query(
    `SELECT * from covidtravel_db.airlines where vaccine_required=${V} and mask_required=${M}`, [V, M],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// searchs the contries table based on the given inputs
app.post("/search-countries", (req, res) => {
  const V = req.body.V;
  const T = req.body.T;
  const Q = req.body.Q;
  db.query(
    `SELECT * from covidtravel_db.countries where vaccine_required=${V} and testing_required=${T} and quarantine_required=${Q}`, [V, T, Q],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//listen port for the server.
app.listen(3001, () => {
  console.log("the server is running on 3001");
});
