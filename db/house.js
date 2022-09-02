const Sequelize = require('sequelize');
const db = require('./database');

const House = db.define('house', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  colorPrimary: Sequelize.STRING,
  colorSecondary: Sequelize.STRING,
  ghost: Sequelize.STRING
});

//class method
House.getEverything = async function() {
  const houses = await House.findAll({
    include: Student
  });
  return houses;
}

//instance method
House.prototype.colorStatement = function() {
  return `The house ${this.name} has the colors ${this.colorPrimary} and ${this.colorSecondary}.`;
}

module.exports = House;
