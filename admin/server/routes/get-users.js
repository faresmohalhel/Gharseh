const mongoose = require("mongoose");
const User = require("../model/userSchema");
const express = require("express");
const getUsersController = require("../controllers/getUsersController");
const Router = express.Router();

const server = require("../server");

server.get("/get-users", getUsersController);

mongoose.connect(process.env.DBURL);

// const user = new User();
