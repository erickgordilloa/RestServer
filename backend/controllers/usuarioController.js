const asyncHandler = require("express-async-handler");
const Usuario = require("../models/usuarioModel");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    try {
        const { nombre, correo, sistema, cedula } = req.body;
        const usuario = await Usuario.create({
            nombre, correo, sistema, cedula 
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});


const getUsuario = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const usuarios = await Usuario.findById(id);
    res.json(usuarios);
});

const getUsers = asyncHandler(async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

exports.getUsuario = getUsuario;
exports.createUser = createUser;
exports.getUsers = getUsers;
