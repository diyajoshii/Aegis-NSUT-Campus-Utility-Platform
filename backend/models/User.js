// models/User.js
const mongoose = require('mongoose');

const testScoreSchema = new mongoose.Schema({
  testType: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branch: { type: String, default: "CSE" },
  section: { type: Number, default: "1" },
  year: { type: String, default: "First" },
  campus: { type: String, default: "Main" },
  rollNumber: { type: String, required: true, unique: true },
  avatar: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  course: { type: String, default: "B.Tech" },
  familyincome: { type: String, default: "" },
  location: { type: String, default: "" },
  testScores: [testScoreSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);