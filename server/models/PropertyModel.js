const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  nearbyHospitals: {
    type: [String],
    required: true,
  },
  nearbyColleges: {
    type: [String],
    required: true,
  },
  additionalInfo: {
    type: String,
  },
  images: {
    type: [String],
  },
});

module.exports = mongoose.model("Property", PropertySchema);
