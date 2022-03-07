const { TopicPost } = require('../models');

const topicPostData = [
  {
    post_id: 1,
    topic_id: 1,
    topic_title: "Citizenship Test"
  },
  {
    post_id: 2,
    topic_id: 2,
    topic_title: "N-400"
  },
  {
    post_id: 3,
    topic_id: 3,
    topic_title: "The interview"
  },
  {
    post_id: 4,
    topic_id: 4,
    topic_title: "Traveling after sending in your N-400"
  },
  {
    post_id: 5,
    topic_id: 5,
    topic_title: "What is 'Good Moral Character'"
  }
];

const seedTopicPost = () => TopicPost.bulkCreate(topicPostData);

module.exports = seedTopicPost;
