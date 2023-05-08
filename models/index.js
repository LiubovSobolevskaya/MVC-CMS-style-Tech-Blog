const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL', // Set the foreign key value to NULL if the post is deleted
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // //if a user is deleted, also delete associated comments
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE', //if a post is deleted, also delete associated comments
});

module.exports = { User, Post, Comment };
