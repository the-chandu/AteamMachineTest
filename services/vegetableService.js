const { VegetableRepository } = require('../repository');
const { getPaginationParams } = require("../utils/common");


class VegetableService {
    constructor() {
        this.vegetableRepository = new VegetableRepository();
    }

    getCleanedData(data) {
        const { color, price, name } = data;

        return {color, price, name};
    }

    async isExistingVegetable(vegId) {
        try {
            const existingVeg = await this.vegetableRepository.getVegetable(vegId);
            if (!existingVeg) {
                const error = new Error("Invalid vegetable Id");
                error.statusCode = 400;
                throw error;
            }
        } catch(error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async createVegetable(data) {
        try {
            const cleanedData = this.getCleanedData(data);
            const vegetable = await this.vegetableRepository.createVegetable(cleanedData);
            return vegetable;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async deleteVegetable(vegId) {
        try {
            await this.isExistingVegetable(vegId);
            const response = await this.vegetableRepository.deleteVegetable(vegId);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async updateVegetable(vegId, data) {
        try {
            await this.isExistingVegetable(vegId);
            const cleanedData = this.getCleanedData(data);
            cleanedData.id = vegId;
            const vegetable = await this.vegetableRepository.updateVegetable(vegId, cleanedData);
            return vegetable;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async getVegetable(vegId) {
        try {
            await this.isExistingVegetable(vegId);
            const vegetable = await this.vegetableRepository.getVegetable(vegId);
            return vegetable;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async getAllVegetables(filter) {
        try {
            const { page, offset, limit, order } = getPaginationParams(filter);
            filter = {...filter, page, page, offset, limit, order}
            const vegetables = await this.vegetableRepository.getAllVegetables(filter);
            return vegetables;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }
}

module.exports = VegetableService;