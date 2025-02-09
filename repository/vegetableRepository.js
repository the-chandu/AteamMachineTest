const { Op } = require('sequelize');
const { Vegetable } = require("../models");
const { getPaginatedResults } = require("../utils/common");


class VegetableRepository {
    async createVegetable({ name, price, color }) {
        try {
            const vegetable = await Vegetable.create({ name, price, color });
            return vegetable;
        } catch (error) {
            throw error;
        }
    }

    async deleteVegetable(vegetableId) {
        try {
            await Vegetable.destroy({ where: { id: vegetableId } });
            return { message: "Vegetable deleted successfully" };
        } catch (error) {
            throw error;
        }
    }

    async updateVegetable(vegetableId, data) {
        try {
            const vegetable = await Vegetable.findByPk(vegetableId);
            if (!vegetable) throw new Error("Vegetable not found");
            Object.assign(vegetable, data);
            await vegetable.save();
            return vegetable;
        } catch (error) {
            throw error;
        }
    }

    async getVegetable(vegetableId) {
        try {
            const vegetable = await Vegetable.findByPk(vegetableId);
            return vegetable;
        } catch (error) {
            throw error;
        }
    }

    async getAllVegetables({ search, sortBy, order, page, offset, limit }) {
        try {

            const where = {};

            //option to search with name only
            if (search) {
                where[Op.or] = [
                    // { price: { [Op.like]: `%${search}%` } },
                    { name: { [Op.like]: `%${search}%` } },
                    // { color: { [Op.like]: `%${search}%` } },
                ];
            }

            const vegetables = await Vegetable.findAndCountAll({
                where,
                order: [[sortBy || "id", order]],
                limit,
                offset,
            });

            const totalCount = vegetables.count;
            const totalPages = Math.ceil(totalCount / limit);

            return page !== null
                ? { totalPages, page, limit, vegetables: vegetables.rows }
                : { totalCount, offset, limit, vegetables: vegetables.rows }; 

        } catch (error) {
            throw error;
        }
    }
}

module.exports = VegetableRepository;
