'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vegetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Override the toJSON method to control response format
    toJSON() {
      const values = { ...this.get() };

      // Convert price to a number to prevent it from being a string
      values.price = parseFloat(values.price);

      // Return properties in a specific order
      return {
        id: values.id,
        name: values.name,
        color: values.color,
        price: values.price,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
      };
    }
  }
  Vegetable.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Vegetable',
  });
  return Vegetable;
};