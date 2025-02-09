const { UserService } = require('../services');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/common');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return sendSuccessResponse(res, user, "Successfully created the user", 201);
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to create the user");
    }
};

const deleteUser = async (req, res) => {
    try {
        const response = await userService.deleteUser(req.params.id);
        return sendSuccessResponse(res, response, "Successfully deleted the user");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to delete the user");
    }
};

const getUser = async (req, res) => {
    try {
        const response = await userService.getUser(req.params.id);
        return sendSuccessResponse(res, response, "Successfully fetched the user");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to fetch the user");
    }
};

const updateUser = async (req, res) => {
    try {
        const response = await userService.updateUser(req.params.id, req.body);
        return sendSuccessResponse(res, response, "Successfully updated the user");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to update the user");
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers(req.query);
        return sendSuccessResponse(res, users, "Successfully fetched all users");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to fetch users");
    }
};

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAllUsers
}