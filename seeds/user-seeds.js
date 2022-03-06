const { User } = require('../models');

const userData = [
  {
      username: "Larryx",
      email: "larryxx@ymail.com",
      password: "amen2that",
      isAdmin: "false"
  },
  {
    username: "Patronix",
    email: "pattx@ymail.com",
    password: "prudent1",
    isAdmin: "false" 
  },
  {
    username: "Blue",
    email: "blue@ymail.com",
    password: "bluebird@1",
    isAdmin: "true"
  },
  {
    username: "Yellowbird",
    email: "yello@ymail.com",
    password: "marshmalloxx",
    isAdmin: "false"
  },
  {
    username: "Savior",
    email: "savrx@ymail.com",
    password: "save_her",
    isAdmin: "false"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
