const { Post } = require('../models');

const postData = [
  {
    title: "Understanding Insomnia REST Client Made Easy 101", 
    post_url: "https://hevodata.com/learn/insomnia-rest-client/", 
    user_id: "1"
  },
  {
    title: "Session Management in Node.js using ExpressJS and Express Session", 
    post_url: "https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/", 
    user_id: "2"
  },
  {
    title: "A Beginner’s Guide to Handlebars", 
    post_url: "https://www.sitepoint.com/a-beginners-guide-to-handlebars/", 
    user_id: "3"
  },
  {
    title: "A Future Made of JavaScript!", 
    post_url: "https://medium.com/bitsrc/a-future-made-of-javascript-5ab417f34355", 
    user_id: "4"
  },
  {
    title: "A Complete Guide for Reading Files in Node.js", 
    post_url: "https://medium.com/javascript-in-plain-english/complete-guide-for-reading-file-in-nodejs-3cf6b3d0b2f4", 
    user_id: "5"
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
