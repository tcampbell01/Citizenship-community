const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Topic extends Model {}

Topic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      topic_title: {
        type: DataTypes.STRING,
        allowNull: false
      }
      // post_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'post',
      //     key: 'id'
      //   }
      // }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'topic'
    }
);

module.exports = Topic;