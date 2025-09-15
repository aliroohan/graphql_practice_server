const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllUsers = async () => {
    const users = await userModel.find();
    if (!users) {
        throw new Error('No users found');
    }
    return users;
};

const getUserById = async (id) => {
    const user = await userModel.findById(id);
    if (!user) {
        throw new Error('User does not exist');
    }
    return user;
};

const createUser = async (user) => {
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = await userModel.create(user);
    return newUser;
};

const login = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return { token };
}

const updateUser = async (id, user) => {
    const existingUser = await userModel.findById(id);
    if (!existingUser) {
        throw new Error('User does not exist');
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
};

const deleteUser = async (id) => {
    const user = await userModel.findById(id);
    if (!user) {
        throw new Error('User does not exist');
    }
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    login,
    updateUser,
    deleteUser
};