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
//==

// uploads
app.post("/upload", upload.single("Img"), (req, res) => {
  // multer config
  // const multer = require("multer");
  // const upload = multer({
  //   storage: multer.memoryStorage(),
  // });

  // connect firebase admin sdk
  // then initialize bucket
  // const bucket = firebaseAdmin.storage().bucket();

  if (!req.file) {
    return res.json({ message: "Select a valid File" });
  } else {
    let filename =
      moment.now() + "." + String(req.file.originalname).split(".")[1];

    const uploadableFile = bucket.file(filename);

    const fileWriter = uploadableFile.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    fileWriter.on("error", (err) => {
      res.json({ error: err });
    });

    // If all is good and done
    fileWriter.on("finish", () => {
      // Assemble the file public URL
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(uploadableFile.name)}?alt=media`;
      // Return the file name and its public URL
      // for you to store in your own database
      res.status(200).json({
        fileName: filename,
        fileLocation: publicUrl,
      });
    });

    fileWriter.end(req.file.buffer);
    // When there is no more data to be consumed from the stream the end event gets emitted
  }
});


//==



// app.get("/", (req, res) => {
//   res.send("<h1>Hello world updated 1/2/+3/+4</h1>");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
