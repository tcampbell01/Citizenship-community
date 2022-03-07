const seedComments = require('./comment-seeds');
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedTopics = require('./topic-seeds');
const seedTopicPost = require('./topicpost-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();

  console.log('\n----- USERS SEEDED -----\n');

  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');

  await seedTopics();
  console.log('\n----- TOPICS SEEDED -----\n');

  await seedTopicPost();
  console.log('\n----- TOPICPOSTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
