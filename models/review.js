const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
    reviews: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favorites: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
});

module.exports = Review;