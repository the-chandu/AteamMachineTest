const { User } = require("../models");

class AuthRepository {
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findByPk(id)
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = AuthRepository;