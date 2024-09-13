const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

router.get("/signup", userController.getSignUpUserRoute);

router.post("/signup", wrapAsync(userController.postSignUpUserRoute));

router.get("/login", userController.getLogInUserRoute);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.postLogInUserRoute
);

router.get("/logout", userController.logOutUserRoute);

module.exports = router;
