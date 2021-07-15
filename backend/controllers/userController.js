const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                isAdmin: user.isAdmin,
                isStudent: user.isStudent,
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }

});


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
            isStudent: user.isStudent,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    info user
// @route   GET /api/users/:id
// @access  Admin and Student
const infoUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const usuarios = await User.findById(id);
    res.json(usuarios);
});

// @desc    List users
// @route   GET /api/users
// @access  Admin
const getUsers = asyncHandler(async (req, res) => {
    const usuarios = await User.find();
    res.json(usuarios);
});

exports.infoUser = infoUser;
exports.authUser = authUser;
exports.registerUser = registerUser;
exports.getUsers = getUsers;
