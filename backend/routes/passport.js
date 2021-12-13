const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const express = require("express");
const keys = require("../keys");
const dbo = require("../db/conn");
require("dotenv").config({ path: "./config.env" });
const passportRoute = express.Router();

passportRoute.route("/token").get(function (req, res) {
    
  });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, (jwt_payload, done) => {
        })
    )
}