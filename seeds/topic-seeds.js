const { Topic } = require('../models');

const topicData = [
  {
    topic_title: "Citizenship Test"
    
  },
  {
    topic_title: "N-400"
    
  },
  {
    topic_title: "The interview"
    
  },
  {
    topic_title: "Traveling after sending in your N-400"
   
  },
  {
    topic_title: "What is 'Good Moral Character'"

  }
];

const seedTopics = () => Topic.bulkCreate(topicData);

module.exports = seedTopics;