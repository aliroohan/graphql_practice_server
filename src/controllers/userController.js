const userService = require('../services/user');

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(
        {
            success: true,
            data: users
        }
    );
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(
        {
            success: true,
            data: user
        }
    );
};

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(200).json(
        {
            success: true,
            data: user
        }
    );
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json(
        {
            success: true,
            data: { user, token }
        }
    );
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(
        {
            success: true,
            data: user
        }
    );
};

const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(
        {
            success: true,
            data: user
        }
    );
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    login,
    updateUser,
    deleteUser
};