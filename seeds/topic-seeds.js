const { Topic } = require('../models');

const topicData = [
  {
    title: "Citizenship Test", 
    
  },
  {
    title: "N-400", 
    
  },
  {
    title: "The interview", 
    
  },
  {
    title: "Traveling after sending in your N-400", 
   
  },
  {
    title: "What is 'Good Moral Character'", 
   
  },
];

const seedTopics = () => Post.bulkCreate(topicData);

module.exports = seedTopics;