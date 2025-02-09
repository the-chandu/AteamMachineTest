const bcrypt = require('bcryptjs');

const { UserRepository } = require('../repository');
const { getPaginationParams } = require("../utils/common");


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    excludePassword(user) {
        if (!user) return null;
        const { password, ...userWithoutPassword } = user.get({ plain: true });
        return userWithoutPassword;
    }

    async getCleanedUserData(data) {
        const { firstName, lastName, profilePicture, userType, email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);

        return {firstName, lastName, profilePicture, userType, email, password: hashedPassword};
    }

    async isExistingUser(userId) {
        try {
            const existingUser = await this.userRepository.getUser(userId);
            if (!existingUser) {
                const error = new Error("Invalid User Id");
                error.statusCode = 400;
                throw error;
            }
            return true;
        } catch(error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async createUser(data) {
        try {
            const cleanedData = await this.getCleanedUserData(data);
            // Check if user already exists
            const existingUser = await this.userRepository.getUserByEmail(data.email);
            if (existingUser) {
                const error = new Error("Email already registered");
                error.statusCode = 400;
                throw error;
            }


            const user = await this.userRepository.createUser(cleanedData);

            const userWithoutPassword = this.excludePassword(user)

            return userWithoutPassword;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            await this.isExistingUser(userId);            
            const response = await this.userRepository.deleteUser(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async updateUser(userId, data) {
        try {
            await this.isExistingUser(userId);            
            const cleanedData = await this.getCleanedUserData(data);
            cleanedData.id = userId;

            const user = await this.userRepository.updateUser(userId, cleanedData);

            const userWithoutPassword = this.excludePassword(user)
            return userWithoutPassword;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async getUser(userId) {
        try {
            await this.isExistingUser(userId);            
            const user = await this.userRepository.getUser(userId);
            const userWithoutPassword = this.excludePassword(user)
            return userWithoutPassword;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }

    async getAllUsers(filter) {
        try {
            const { page, offset, limit, order } = getPaginationParams(filter);
            filter = {...filter, page, page, offset, limit, order}
            const users = await this.userRepository.getAllUsers(filter);
            return users;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;
        }
    }
}

module.exports = UserService;