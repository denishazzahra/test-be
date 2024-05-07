const express = require('express');
const router = express.Router();

const { 
  getAllUser, getUserById, postUser, deleteUser
} = require('../controller/user');

//GET ALL USER (ENDPOINT 1)
router.get("/users/fetch-all", getAllUser);

//GET User By ID
router.get("/users/:userId", getUserById);

//Register new User
router.post("/users/register", postUser);

module.exports = router;