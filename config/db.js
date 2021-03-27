const firebaseAdmin = require("firebase-admin");

const admin = {};
admin.connectDB = () => {
  const configData = require("./b-logic-agro-firebase.json");
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(configData),
    storageBucket: "gs://b-logic-agro.appspot.com",
  });
};

module.exports = admin;
