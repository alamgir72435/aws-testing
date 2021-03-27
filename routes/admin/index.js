const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./../../config/auth");
const moment = require("moment");

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/backend");
});

router.get("/", checkNotAuthenticated, (req, res) => {
  res.render("admin/auth");
});

router.get("/home", checkAuthenticated, (req, res) => {
  res.render("admin/home");
});

router.get("/banner", checkAuthenticated, (req, res) => {
  res.render("admin/banner");
});
router.get("/about", checkAuthenticated, (req, res) => {
  res.render("admin/about");
});
router.get("/statictics", checkAuthenticated, (req, res) => {
  res.render("admin/statictics");
});
router.get("/team", checkAuthenticated, (req, res) => {
  res.render("admin/team");
});
router.get("/contact", checkAuthenticated, (req, res) => {
  res.render("admin/contact");
});
router.get("/product", checkAuthenticated, (req, res) => {
  res.render("admin/product");
});
router.get("/mics", checkAuthenticated, (req, res) => {
  res.render("admin/mics");
});
router.get("/socials", checkAuthenticated, (req, res) => {
  res.render("admin/socials");
});

// post request handle

// banner start

// banner get
router.get("/banner/all", async (req, res) => {
  let banners = [];
  const snapshot = await db.collection("banner").get();
  snapshot.forEach((doc) => {
    banners.push({ ...doc.data(), id: doc.id });
  });
  res.json(banners);
});

router.post("/banner/del", async (req, res) => {
  const { id } = req.body;
  await db.collection("banner").doc(id).delete();
  res.json({ success: true });
});

router.post("/banner", (req, res) => {
  const { title, editor, photo } = req.body;
  db.collection("banner")
    .add({
      title,
      desc: editor,
      photo,
      date: moment.now(),
    })
    .then(() => {
      res.redirect("/backend/banner");
    })
    .catch((error) => {
      res.redirect("/backend/banner");
    });
});

// banner End

// statictics start
router.post("/statictics/add", (req, res) => {
  const { StaticticsName, count, icon } = req.body;
  db.collection("statictics")
    .add({
      StaticticsName,
      count,
      icon,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.get("/statictics/list", async (req, res) => {
  let banners = [];
  const snapshot = await db.collection("statictics").get();
  snapshot.forEach((doc) => {
    banners.push({ ...doc.data(), id: doc.id });
  });
  res.json(banners);
});

router.post("/statictics/del", async (req, res) => {
  const { id } = req.body;
  await db.collection("statictics").doc(id).delete();
  res.json({ success: true });
});

// statics end

// team start

router.post("/team/add", (req, res) => {
  const {
    memberName,
    position,
    photo,
    FbLink,
    TwitterLink,
    LinkdinLink,
  } = req.body;
  db.collection("team")
    .add({
      memberName,
      position,
      photo,
      FbLink,
      TwitterLink,
      LinkdinLink,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.get("/team/list", async (req, res) => {
  let banners = [];
  const snapshot = await db.collection("team").get();
  snapshot.forEach((doc) => {
    banners.push({ ...doc.data(), id: doc.id });
  });
  res.json(banners);
});

router.post("/team/del", async (req, res) => {
  const { id } = req.body;
  await db.collection("team").doc(id).delete();
  res.json({ success: true });
});

// team start end

// product start

router.post("/product/add", (req, res) => {
  const { productName, desc, photo } = req.body;
  db.collection("product")
    .add({
      productName,
      desc,
      photo,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.get("/product/list", async (req, res) => {
  let banners = [];
  const snapshot = await db.collection("product").get();
  snapshot.forEach((doc) => {
    banners.push({ ...doc.data(), id: doc.id });
  });
  res.json(banners);
});

router.post("/product/del", async (req, res) => {
  const { id } = req.body;
  await db.collection("product").doc(id).delete();
  res.json({ success: true });
});

// product end

// socials start

router.get("/product/social", async (req, res) => {
  let sites = [];
  const snapshot = await db.collection("social").get();
  snapshot.forEach((doc) => {
    sites.push({ ...doc.data(), id: doc.id });
  });
  res.json(sites);
});

router.post("/social/facebook", (req, res) => {
  const { facebook } = req.body;
  db.collection("social")
    .doc("facebook")
    .set({
      link: facebook,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.post("/social/twitter", (req, res) => {
  const { twitter } = req.body;
  db.collection("social")
    .doc("twitter")
    .set({
      link: twitter,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.post("/social/linkdin", (req, res) => {
  const { linkdin } = req.body;
  db.collection("social")
    .doc("linkdin")
    .set({
      link: linkdin,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.post("/social/youtube", (req, res) => {
  const { youtube } = req.body;
  db.collection("social")
    .doc("youtube")
    .set({
      link: youtube,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

// social end

// messages start
router.get("/messages/list", async (req, res) => {
  let messages = [];
  const snapshot = await db.collection("messages").get();
  snapshot.forEach((doc) => {
    messages.push({ ...doc.data(), id: doc.id });
  });
  res.json(messages);
});

router.post("/message/read", async (req, res) => {
  const { id } = req.body;
  const message = await (await db.collection("messages").doc(id).get()).data();
  await db.collection("messages").doc(id).update({
    read: true,
  });
  res.json(message);
});

router.post("/message/del", async (req, res) => {
  const { id } = req.body;
  await db.collection("messages").doc(id).delete();
  res.json({ success: true });
});

// messages end

router.post("/send-message", (req, res) => {
  const { name, phone, subject, message } = req.body;
  db.collection("messages")
    .add({
      name,
      phone,
      subject,
      message,
      read: false,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

// mics

// update info
router.post("/update/info", (req, res) => {
  const {
    companyName,
    footerInfo,
    phone,
    mail,
    address1,
    address2,
    address3,
    address4,
  } = req.body;
  db.collection("company")
    .doc("info")
    .set({
      companyName,
      footerInfo,
      phone,
      mail,
      address1,
      address2,
      address3,
      address4,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.post("/update/logo", (req, res) => {
  const { logo } = req.body;
  db.collection("company")
    .doc("logo")
    .set({
      logo,
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.json({ success: false });
    });
});

router.get("/utils", async (req, res) => {
  let utils = [];
  const snapshot = await db.collection("company").get();
  snapshot.forEach((doc) => {
    utils.push({ ...doc.data(), id: doc.id });
  });
  res.json(utils);
});

module.exports = router;
