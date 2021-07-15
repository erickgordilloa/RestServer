const express = require("express");
const router = express.Router();
const { searchStudent } = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:cedula").get(searchStudent);

module.exports = router;