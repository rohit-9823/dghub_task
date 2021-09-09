const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
//const db1 = require("./db");
const bodyParser = require("body-parser");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const mysql = require("mysql2");
app.use(router);
app.use(cors());
app.use(express.json());
const db1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
  
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const pass = req.body.pass;
  db1.query(
    "INSERT INTO logininfo (username,pass) VALUES (?,?)",
    [username, pass],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/logins", (req, res) => {
  const username = req.body.uname;
  const pass = req.body.passwor;
  db1.query(
    "Select * FROM logininfo WHERE username = ? AND pass = ?",
    [username, pass],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "wrong username/password" });
      }
    }
  );
});


server.listen(process.env.PORT || 3022, () =>
  console.log(`Server has started.`)
);
