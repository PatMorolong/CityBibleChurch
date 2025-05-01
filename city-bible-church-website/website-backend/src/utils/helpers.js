// This file contains utility functions that can be used throughout the application.

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to hash a password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Function to generate a JWT token
const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Exporting utility functions
module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};