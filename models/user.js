const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  userName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true
    //change allowNull to be false
    //dafualtValue: false
  },

});

module.exports = User;
