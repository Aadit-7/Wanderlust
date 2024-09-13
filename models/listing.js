const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review"); // Import the Review model

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  img: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // Ensure this matches the User model's name
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
