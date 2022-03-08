const { User } = require('../models');

const userData = [
  {
      first_name: "Larry",
      last_name: "Brown",
      email: "larryxx@ymail.com",
      password: "amen2that",
      // isAdmin: "false",
      zipCode: "06032"
  },
  {
    first_name: "John",
    last_name: "Smith",
    email: "pattx@ymail.com",
    password: "prudent1",
    // isAdmin: "false",
    zipCode: "06001" 
  },
  {
    first_name: "Erin",
    last_name: "Shields",
    email: "blue@ymail.com",
    password: "bluebird@1",
    // isAdmin: "true",
    zipCode: "06114"
  },
  {
    first_name: "Nancy",
    last_name: "Caddigan",
    email: "yello@ymail.com",
    password: "marshmalloxx",
    isAdmin: "false",
    zipCode: "55443"
  },
  {
    first_name: "Pat",
    last_name: "Campbell",
    email: "savrx@ymail.com",
    password: "save_her",
    // isAdmin: "false",
    zipCode: "33311"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
