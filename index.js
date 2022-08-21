/** ==========================================================
 * @description Index file for the application.
 * @author: Panfile Kirill
 * @app QuckFood
 * ========================================================== */
// import express from "express";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const bodyPrser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const MongoDBStore = require("connect-mongodb-session");

dotenv.config();

// Import utils and configs
const { corsOptions, compressOptions } = require("./src/configs/config.js");
const connect = require("./src/utils/mongoose.util.js");

// Connect to the database
const port = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;
connect(URI);

const mongoStore = new MongoDBStore(expressSession);
const store = new mongoStore({
  uri: process.env.MONGO_URI,
  collection: "userSessions",
  expires: 10000,
});
// App initialization
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  expressSession({
    name: "quckfood",
    secret: "quckfood",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000,
    },
  })
);
app.use(compression(compressOptions));
app.use(bodyPrser.urlencoded({ extended: true }));
app.use(bodyPrser.json());

//Routes
const userRoutes = require("./src/routes/UserRoutes.js");
const authRoutes = require("./src/routes/AuthRoutes.js");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + port);
});
