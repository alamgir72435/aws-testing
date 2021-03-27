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


// multer
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: true,
  })
);


const users = [
  {
    id: 1,
    email: "b-logicagrovet@gmail.com",
    password: "blogicagro0099",
    name: "B-Logic Admin",
  },
  { id: 2, email: "a", password: "7243", name: "admin" },
];

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

//==

app.use(flash());
app.use(
  session({
    secret: "abcd",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.post(
  "/auth",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/backend/home",
    failureRedirect: "/backend",
    failureFlash: true,
  })
);

app.post("/test", (req, res) => {
  console.log(req.body);
  // res.redirect("/admin");
});

// authentication part end

app.use("/backend", require("./routes/admin"));
app.use("/", require("./routes"));

//==

app.get("/", (req, res) => {
  res.send("<h1>Hello world updated 1/2</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
