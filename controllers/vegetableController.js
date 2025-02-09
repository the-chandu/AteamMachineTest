const { VegetableService } = require('../services');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/common');

const vegService = new VegetableService();

const createVegetable = async (req, res) => {
    try {
        const vegetable = await vegService.createVegetable(req.body);
        return sendSuccessResponse(res, vegetable, "Successfully created vegetable", 201);
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to create vegetable");
    }
};

const deleteVegetable = async (req, res) => {
    try {
        const response = await vegService.deleteVegetable(req.params.id);
        return sendSuccessResponse(res, response, "Successfully deleted the vegetable");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to delete the vegetable");
    }
};

const getVegetable = async (req, res) => {
    try {
        const response = await vegService.getVegetable(req.params.id);
        return sendSuccessResponse(res, response, "Successfully fetched the vegetable");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to fetch the vegetable");
    }
};

const updateVegetable = async (req, res) => {
    try {
        const response = await vegService.updateVegetable(req.params.id, req.body);
        return sendSuccessResponse(res, response, "Successfully updated the vegetable");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to update the vegetable");
    }
};

const getAllVegetables = async (req, res) => {
    try {
        const vegetables = await vegService.getAllVegetables(req.query);
        return sendSuccessResponse(res, vegetables, "Successfully fetched all vegetables");
    } catch (error) {
        return sendErrorResponse(res, error, "Not able to fetch vegetables");
    }
};

module.exports = {
    createVegetable,
    deleteVegetable,
    getVegetable,
    updateVegetable,
    getAllVegetables
}