const express = require("express");

const router = express.Router();

const UserDetail = require("../models/userDetail.model");
const City = require("../models/city.model");

router.get("/", async (req, res) => {
  try {
    const user = await UserDetail.aggregate([
      {
        $lookup: {
          from: "cities", // Collection name for City model
          localField: "city",
          foreignField: "_id",
          as: "cityData",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          city: { $arrayElemAt: ["$cityData.name", 0] },
        },
      },
    ]).exec();

    return res.status(200).send(user);
  } catch (e) {
    console.log("Error in get uses:", e);
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, city } = req.body;

    // Find the corresponding city by name
    let cityData = await City.findOne({ name: city });

    if (!cityData) {
      cityData = await City.create({ name: city });
    }

    // Create a new user detail object with the city reference
    const userDetail = new UserDetail({ name, email, city: cityData._id });

    // Save the user detail to the database
    await userDetail.save();

    res
      .status(201)
      .json({ message: "User detail created successfully", userDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
