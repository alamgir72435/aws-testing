// const functions = require("firebase-functions");
const express = require("express");
const app = express();

const admin = require("./config/db");
const moment = require("moment");
admin.connectDB();
const cors = require("cors");

const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const firebaseAdmin = require("firebase-admin");
const bucket = firebaseAdmin.storage().bucket();


// authentication
const { checkNotAuthenticated } = require("./config/auth");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>Hello world updated 1</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
