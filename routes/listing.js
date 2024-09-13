const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controller/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// New Route to render new listing form
router.get("/new", isLoggedIn, listingController.getCreateNewRoute);

// Create Route to handle new listing creation
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[img]"),
  validateListing,
  wrapAsync(listingController.postCreateRoute)
);

// Show Route to display a specific listing
router.get("/:id", wrapAsync(listingController.showRoute));

// Edit Route to render edit form for a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.getEditRoute)
);

// Update Route to update an existing listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[img]"),
  validateListing,
  wrapAsync(listingController.updateRoute)
);

// Delete Route to delete a listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyRoute)
);

module.exports = router;
