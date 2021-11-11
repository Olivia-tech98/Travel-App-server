const { DataTypes } = require("sequelize");
const db = require("../db");

const Country = db.define("country", {
    countryName: {
        type: DataTypes.STRING,
        allolwNull: false
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
   
    history: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    attractions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    languages: {
        type: DataTypes.STRING,
        allowNull: false
    },
    safteyRates: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
})


module.exports = Country;