const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../config/firebase");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const Property = require("../models/PropertyModel");
//route to add a new property
router.post("/post", auth, upload.array("files"), async (req, res) => {
  const {
    city,
    area,
    bedrooms,
    bathrooms,
    nearbyHospitals,
    nearbyColleges,
    additionalInfo,
  } = req.body;
  try {
    const files = req.files;
    const imageUrls = [];

    //get file urls to the fileUrls array
    if (files && files.length > 0) {
      for (const file of files) {
        const storageRef = ref(
          storage,
          `properties/${Date.now()}-${file.originalName}`
        );
        const metadata = {
          contentType: file.mimetype,
        };
        await uploadBytes(storageRef, file.buffer, metadata);

        const imageUrl = await getDownloadURL(storageRef);
        imageUrls.push(fileUrl);
      }
    }

    //create a new property
    const newProperty = new Property({
      seller: req.user.id,
      city,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      additionalInfo,
      images: imageUrls,
    });

    const property = await newProperty.save();
    res.status(200).json(property);
  } catch (err) {
    res.status(500).send("Unable to save property: " + err.message);
    console.log("Unable to save property", err);
  }
});

//route to get uploaded properties of a seller
router.get("/myproperties", auth, async (req, res) => {
  try {
    const properties = await Property.find({ seller: req.user.id });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).send("Can't get seller's properties");
    console.log("Can't get seller's properties", err);
  }
});

//route to update a property of a seller
router.put("/update/:id", auth, async (req, res) => {
  const {
    city,
    area,
    bedrooms,
    bathrooms,
    nearbyHospitals,
    nearbyColleges,
    additionalInfo,
  } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    if (property.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    property.city = city;
    property.area = area;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.nearbyHospitals = nearbyHospitals;
    property.nearbyColleges = nearbyColleges;
    property.additionalInfo = additionalInfo;
    await property.save();
    res.json(property);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Unable to update the property");
  }
});

//route to delete a property
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Property.deleteOne({ _id: req.params.id }); // Use deleteOne method here
    res.json({ message: "Property removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/test", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const storageRef = ref(storage, `test/${Date.now()}-${file.originalname}`);
    const metadata = {
      contentType: file.mimetype,
    };

    await uploadBytes(storageRef, file.buffer, metadata);

    const fileUrl = await getDownloadURL(storageRef);

    res.status(200).json({ fileUrl });
  } catch (err) {
    res.status(500).send("Unable to upload file: " + err.message);
    console.log("Unable to upload file", err);
  }
});
module.exports = router;
