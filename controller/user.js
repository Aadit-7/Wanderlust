const User = require("../models/user.js");

module.exports.getSignUpUserRoute = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postSignUpUserRoute = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/allListings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.getLogInUserRoute = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLogInUserRoute = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.redirectUrl || "/allListings";
  res.redirect(redirectUrl);
};

module.exports.logOutUserRoute = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out!");
    res.redirect("/allListings");
  });
};
