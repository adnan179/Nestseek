const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyModel");
const User = require("../models/userModel");

router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "seller",
      "name email phone"
    );
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch properties" });
  }
});

router.get("/sellers/:id", async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch seller details" });
  }
});

module.exports = router;
