const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const usersRoute = require('./routes/users');
const eventsRoute = require('./routes/events');
const postingsRoute = require('./routes/ticketPostings');
// const passportRoute = require('./routes/passport');
app.use(usersRoute);
app.use(eventsRoute);
app.use(postingsRoute);
// app.use(passportRoute);
// get driver connection
const dbo = require("./db/conn");

 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});



