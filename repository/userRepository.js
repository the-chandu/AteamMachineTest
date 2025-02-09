const { Op } = require('sequelize');
const { User } = require("../models");
const { getPaginationParams } = require("../utils/common");


class UserRepository {
    async createUser({ firstName, lastName, profilePicture, userType, email, password }) {
        try {
            const user = await User.create({ firstName, lastName, profilePicture, userType, email, password });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            await User.destroy({ where: { id: userId } });
            return { message: "User deleted successfully" };
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, data) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error("User not found");
            Object.assign(user, data);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUser(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers({ search, firstName, lastName, email, userType, sortBy, order, page, offset, limit }) {
        try {
    
            const where = {};
    
            if (search) {
                where[Op.or] = ["firstName", "lastName", "email", "userType"].map(field => ({
                    [field]: { [Op.like]: `%${search}%` }
                }));
            } else {
                Object.assign(where, 
                    firstName && { firstName: { [Op.like]: `%${firstName}%` } },
                    lastName && { lastName: { [Op.like]: `%${lastName}%` } },
                    email && { email: { [Op.like]: `%${email}%` } },
                    userType && { userType: { [Op.like]: `%${userType}%` } }
                );
            }
    
            const users = await User.findAndCountAll({
                where,
                attributes: { exclude: ["password"] },
                order: [[sortBy || "id", order]],
                limit,
                offset,
            });

            const totalCount = users.count;
            const totalPages = Math.ceil(totalCount / limit);
    
            return page !== null
                ? { totalPages, page, limit, users: users.rows }
                : { totalCount, offset, limit, users: users.rows }; 
        } catch (error) {
            throw error;
        }
    }
    

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = UserRepository;
