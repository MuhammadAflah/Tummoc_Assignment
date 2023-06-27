const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).send("user");
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
