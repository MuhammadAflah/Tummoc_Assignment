const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, default: "Male" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserDetail = mongoose.model("user_detail", userDetailSchema);

module.exports = UserDetail;
