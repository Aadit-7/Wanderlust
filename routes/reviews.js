const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {
  validateReviews,
  isLoggedIn,
  isrreviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controller/reviews.js");

// Post Route to handle new reviews
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

// Delete Route to delete reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isrreviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
