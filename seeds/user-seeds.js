const { User } = require('../models');

const userData = [
  {
      first_last_name: "Larry Brown",
      email: "larryxx@ymail.com",
      password: "amen2that",
      isAdmin: "false",
      zipCode: 06032
  },
  {
    first_last_name: "John Smith",
    email: "pattx@ymail.com",
    password: "prudent1",
    isAdmin: "false",
    zipCode: 06001 
  },
  {
    first_last_name: "Erin Shields",
    email: "blue@ymail.com",
    password: "bluebird@1",
    isAdmin: "true",
    zipCode: 06114
  },
  {
    first_last_name: "Nancy Caddigan",
    email: "yello@ymail.com",
    password: "marshmalloxx",
    isAdmin: "false",
    zipCode: 55443
  },
  {
    first_last_name: "Pat Campbell",
    email: "savrx@ymail.com",
    password: "save_her",
    isAdmin: "false",
    zipCode: 33311
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
