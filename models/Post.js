const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(155),
        allowNull: false
      },
      post_content: {
        type: DataTypes.STRING(620),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      // topic_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'topic',
      //     key: 'id'
      //   }
      // }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
);

module.exports = Post;