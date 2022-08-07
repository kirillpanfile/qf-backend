// imports
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const dotenv = require("dotenv");

dotenv.config();

app
  .use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      withCredentials: true,
      Credentials: "include",
    })
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    compression({
      windowBits: 15,
      level: 9,
      memLevel: 9,
      threshold: 0,
    })
  );

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
    const Role = require("./models/role.model");
    ["ROLE_USER", "ROLE_MODERATOR", "ROLE_SUPER_ADMIN"].forEach((e) => {
      Role.findOne({ e }, (err, role) => {
        if (!role) {
          console.log("Creating role: " + e);
          new Role({ name: e }).save();
        }
      });
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

// routes
app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/recipes", require("./routes/recipe.routes"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
