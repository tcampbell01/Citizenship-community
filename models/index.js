const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Topic = require('./Topic');
const TopicPost = require('./TopicPost');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});

Topic.belongsToMany(Post, {
    through: TopicPost,
    foreignKey: 'topic_id'
});

Post.belongsTo(Topic, {
    through: TopicPost,
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Topic, TopicPost };

