function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/backend");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/backend/home");
  }
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
