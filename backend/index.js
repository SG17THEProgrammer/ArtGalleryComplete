const express = require("express");
const app = express();
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error.js")
const userRoute = require('./routes/userRoute.js')
const cartRoute = require('./routes/cartRoute.js')
const productRoute = require('./routes/productRoute.js')
const teamRoute = require('./routes/teamRoute.js')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const {fileURLToPath} = require("url");
const contactRoute = require("./routes/contactRoute.js")
dotenv.config()
const path = require('path')
const connectDatabase = require("./database/db.js");


const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// console.log(path.join(__dirname,'../frontend/dist/index.html'))
// app.use(express.static(path.join(__dirname,'../frontend/dist')))



app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/team',teamRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1',contactRoute);

// console.log(path.join(__dirname, "../frontend/dist"))
// console.log(path.resolve(__dirname, "../frontend", "dist", "index.html"))
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


app.use(errorMiddleware);


process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

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
  

module.exports = app;