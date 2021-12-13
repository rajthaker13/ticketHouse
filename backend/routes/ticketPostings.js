const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const postingsRoute = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
postingsRoute.route("/posting").get(function (req, res) {
  let db_connect = dbo.getDb();
  
  db_connect.collection("tickets").find({}).toArray(function(err, result) {
    console.log(result);
    res.json(result);
  })
});

// This section will help you get a single record by id
postingsRoute.route("/posting/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("tickets")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
postingsRoute.route("/posting/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newPosting = {
    username: req.body.username,
    event: req.body.event,
    duration: req.body.duration,
    starting_price: req.body.starting_price,
  };
  db_connect.collection("tickets").insertOne(newPosting, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
postingsRoute.route("/posting/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let changePosting = {
    $set: {
        username: req.body.username,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date,
    },
  };
  db_connect
    .collection("postings")
    .updateOne(myquery, changePosting, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
postingsRoute.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("tickets").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

postingsRoute.route("/getuserticks/:username").get((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = {username: req.params.username, duration: 0}
  db_connect.collection("tickets").find(myquery).toArray(function (err, result) {
    if(err) throw err;
    response.json(result);
  })
})

postingsRoute.route("/trade").post((req, response) => {
  let db_connect = dbo.getDb();
  let newPosting = {
    username: req.body.username,
    userReq: req.body.userReq,
    sendTicks: req.body.sendTicks,
    recieveTicks: req.body.recieveTicks,
  };
  db_connect.collection("trades").insertOne(newPosting,function (err, res) {
    if (err) throw err;
    response.json(res);
  }); 
})

postingsRoute.route("/getTradeReqs").post((req, response) => {
  let db_connect = dbo.getDb();
  let tradeReqQuery = {userReq: req.body.username}
  db_connect.collection("trades").find(tradeReqQuery).toArray(function (err, result) {
    if(err) throw err;
    response.json(result);
  })

})

postingsRoute.route("/getPendingTrades").post((req, response) => {
  let db_connect = dbo.getDb();
  let pendingTradesQuery = {username: req.body.username}
  db_connect.collection("trades").find(pendingTradesQuery).toArray(function (err, result) {
    if(err) throw err;
    response.json(result);
  })

})

postingsRoute.route("/acceptTrade/:id").post((req,response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let userRecieves = {
    username: req.body.userReq,
    event: req.body.recieveTicks,
    duration: 0,
    starting_price: 0,
  };
  let userGives = {
    username: req.body.username,
    event: req.body.sendTicks,
    duration: 0,
    starting_price: 0,
  }
  let currentUserTicket = {
    username: req.body.username,
    event: req.body.sendTicks,
  }
  let theirCurrentTicket = {
    username: req.body.userReq,
    event: req.body.recieveTicks,
  }
  db_connect.collection("tickets").deleteOne(currentUserTicket, function(err, obj) {
    if(err) throw err;
  })
  db_connect.collection("tickets").deleteOne(theirCurrentTicket, function(err, obj) {
    if(err) throw err;
  })
  db_connect.collection("tickets").insertOne(userRecieves, function(err, obj) {
    if(err) throw err;
  })
  db_connect.collection("tickets").insertOne(userGives, function(err, obj) {
    if(err) throw err;
  })
  db_connect.collection("trades").deleteOne(myquery, function(err, obj) {
    if(err) throw err;
  })
})

postingsRoute.route("/deleteTrade/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("trades").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

postingsRoute.route("/bid/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      starting_price: req.body.bid,
    },
  };
  db_connect
    .collection("tickets")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });

})
postingsRoute.route("/duration/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      duration: req.body.duration,
    },
  };
  db_connect
    .collection("tickets")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });

})
module.exports = postingsRoute;