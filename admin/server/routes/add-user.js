const mongoose = require("mongoose");
const User = require("../model/userSchema");
const express = require("express");
const addUserController = require("../controllers/addUserController");
const Router = express.Router();

const server = require("../server");

server.post("/add-user", addUserController);

mongoose.connect(process.env.DBURL);

// const user = new User();
