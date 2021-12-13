const express = require("express");
const session = require("express-session")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const usersRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
usersRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb("ticketWebsite");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
}, {
  collection: "users"
});

const User = mongoose.model('users', UserSchema);


// This section will help you get a single record by id
usersRoutes.route("/login").post(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("users").findOne({username: req.body.username}).then(user => {
    console.log("User from login", user)
    if (!user) {
      console.log("user don't exist");
      
    }
    else {
        bcrypt.compare(req.body.password, user.password)
            .then(passwordMatch => {
              if(passwordMatch) {
                console.log('yes')
                return res.json(user);
              }
              else {
                console.log("no")
                return res.json(false);
              }
            })
          }
});

//Token validator
// usersRoutes.route("/tokenIsValid").post(async function(req,res) {
//   try{
//     const token = req.header("x-auth-token");
//     if(!token) {
//       return res.json(false);
//     }
//     const verified = jwt.verify(token, ']x"_w%n.^kGC(/]M5A6\:+xyV{v^jy?vq?%?sHQ{$(>uQ7,E5B')
//     if(!verified) {
//       return res.json(false);
//     }
//     const user = await dbo.getDb().collection("users").find(req.username);
//     res.json({
//       username: user.username,
//       id: user.id
//     })
//   }
//   catch (err) {
//     res.status(500).json({error: err})
//   }
// })


  // let myquery = {username: req.params.username};
  // const password = req.body.password
  // db_connect
  //     .collection("users")
  //     .findOne(myquery, function (err, user) {
  //       if (err) throw err;
  //       bcrypt.compareSync(req.body.password, user.password).then(isMatch => {
  //         if(isMatch) {
  //           console.log("Success")
  //         }
  //         else{
  //           console.log("Nah")
  //         }
  //       })
        
  //     });
});

// This section will help you create a new record.
usersRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  db_connect.collection("users").insertOne(newUser, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// usersRoutes.get("/auth").get(auth, async (req, res) => {
//   let db_connect = dbo.getDb();
//   const user = db_connect.collection("users").find(req.username);
//   res.json({
//     displayName: user.displayName,
//     id: user.id
//   })
// })

usersRoutes.route("/get/:id").get((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("users").findOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
});
// This section will help you delete a record
usersRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = usersRoutes;