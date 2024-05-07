require('dotenv').config();

//ambil module express
const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//ambil router yang mengandle endpoint user
const userRouter = require('./routes/user');

//untuk ngambil request body
app.use(express.json());

//jalanin router
app.use(userRouter);

app.use("/", (req,res,next)=>{
  res.status(404).json({
    message: "Resource not found!"
  })
})

//ambil data dari dotenv
const PORT = process.env.PORT;


  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  })