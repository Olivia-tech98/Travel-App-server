const User = require("./user");
const Country= require("./country");
const Review = require("./review");
// create individual files for your models and import them here

// Setup Associations

User.hasMany(Country)
User.hasMany(Review)

Country.belongsTo(User)
Country.hasMany(Review)

Review.belongsTo(Country)
Review.belongsTo(User)

module.exports = {
  User,
  Country,
  Review
};
