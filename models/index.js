const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Topic = require('./Topic');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Post, {
    foreignKey: 'user_id'
});
  
Post.belongsToMany(User, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Topic.hasMany(Post, {
    foreignKey: 'post_id'
});

Post.belongsTo(Topic, {
    foreignKey: 'topic_id',
});

module.exports = { User, Post, Comment, Topic };

