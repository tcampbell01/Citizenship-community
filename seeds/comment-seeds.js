const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Where do I get that form again?",
    user_id: 5,
    post_id: 1
  },
  {
    comment_text: "How did your interview go?",
    user_id: 4,
    post_id: 2
  },
  {
    comment_text: "What resources have you used for study?",
    user_id: 3,
    post_id: 3
  },
  {
    comment_text: "Have you had your biometrics appointment yet?",
    user_id: 2,
    post_id: 4
  },
  {
    comment_text: "When is your interview date?",
    user_id: 1,
    post_id: 5
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
