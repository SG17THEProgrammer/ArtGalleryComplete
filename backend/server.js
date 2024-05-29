const app = require("./index.js");
const connectDatabase = require("./database/db.js");
const express = require("express");

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

app.use(express.static(path.join(__dirname,'../frontend/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/dist/index.html'))
})

connectDatabase();

const PORT=process.env.PORT || 8000;

const server=app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  