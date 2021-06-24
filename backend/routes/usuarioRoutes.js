const express = require("express");
const router = express.Router();
const {  createUser,getUsers,getUsuario } = require("../controllers/usuarioController");



router.route("/").post(createUser).get(getUsers);
router.get("/:id", getUsuario);

module.exports = router;
