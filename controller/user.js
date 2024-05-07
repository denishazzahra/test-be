require('dotenv').config();
let userList = require('../model/User');

const getAllUser = async(req, res, next)=>{
  try {
    res.status(200).json({
      status: "Success",
      message: "Successfully fetch all user data",
      users: userList
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const getUserById = (req,res,next)=>{
  try {
    const {userId} = req.params
    let user = userList.filter(item => item.id == userId);
    if(user.length>0){
      res.status(200).json({
        status: "Success",
        message: `Successfully fetch user with id ${userId}`,
        user: user[0]
      })
    }else{
      const error = new Error(`User with id ${userId} doesn't exist`);
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
}

const postUser = async(req,res,next)=>{
  try {
    const {
      id, name, email, nim
    } = req.body;

    const isIdUsed = userList.some(item => item.id == id);
    const isEmailUsed = userList.some(item => item.email == email);
    const isNimUsed = userList.some(item => item.nim == nim);

    if(isIdUsed){
      const error = new Error(`ID already used!`);
      error.statusCode = 400;
      throw error;
    }
    if(isEmailUsed){
      const error = new Error(`Email already used!`);
      error.statusCode = 400;
      throw error;
    }
    if(isNimUsed){
      const error = new Error(`NIM already used!`);
      error.statusCode = 400;
      throw error;
    }

    userList.push({
      "id": id,
      "name": name,
      "nim": nim,
      "email": email
    });

    res.status(201).json({
      status: "Success",
      message: "Register Successfull!"
    })

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
};


module.exports = {
  getAllUser, getUserById, postUser
}