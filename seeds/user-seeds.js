const { User } = require('../models');

const userData = [
  {
      username: "Larryx",
      email: "larryxx@ymail.com",
      password: "amen2that" 
  },
  {
    username: "Patronix",
    email: "pattx@ymail.com",
    password: "prudent1" 
  },
  {
    username: "Blue",
    email: "blue@ymail.com",
    password: "bluebird@1" 
  },
  {
    username: "Yellowbird",
    email: "yello@ymail.com",
    password: "marshmalloxx" 
  },
  {
    username: "Savior",
    email: "savrx@ymail.com",
    password: "save_her" 
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
