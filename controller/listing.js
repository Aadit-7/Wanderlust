const Listing = require("../models/listing");

module.exports.getCreateNewRoute = (req, res) => {
  res.render("listings/new");
};

module.exports.postCreateRoute = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // Assign the current user as the owner
  newListing.img = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing was created!!");
  res.redirect("/allListings");
  console.log(newListing);
};

module.exports.showRoute = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist");
    res.redirect("/allListings");
  }

  // debugger;
  res.render("listings/show", { listing });
};

module.exports.getEditRoute = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist");
    res.redirect("/allListings");
  }
  let originalImageUrl = listing.img.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.img = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
  const { id } = req.params;
  const deleted = await Listing.findByIdAndDelete(id);
  console.log(deleted);
  req.flash("success", "Listing was deleted!!");
  res.redirect("/allListings");
};
