const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Very interesting idea!",
    user_id: 5,
    post_id: 1
  },
  {
    comment_text: "I need to implement that ASAP!",
    user_id: 4,
    post_id: 2
  },
  {
    comment_text: "This requires more exploration",
    user_id: 3,
    post_id: 3
  },
  {
    comment_text: "I found a different interpretation elsewhere",
    user_id: 2,
    post_id: 4
  },
  {
    comment_text: "Check out my Github please!",
    user_id: 1,
    post_id: 5
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
