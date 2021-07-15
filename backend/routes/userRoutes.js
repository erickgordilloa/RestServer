const express = require("express");
const router = express.Router();
const { registerUser, getUsers, infoUser, authUser } = require("../controllers/userController");
const { protect,admin } = require("../middleware/authMiddleware");

router.route("/")
    .post(registerUser)
    .get(protect,admin,getUsers);
router.route("/login").post(authUser);
router.route("/:id").get(protect, infoUser);

module.exports = router;