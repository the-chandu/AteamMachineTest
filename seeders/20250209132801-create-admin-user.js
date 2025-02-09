const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Admin",
        lastName: "User",
        profilePicture: null, // Change if needed
        userType: "Admin", // or "Manager"
        email: "admin2@machine.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "admin2@machine.com" }, {});
  }
};
