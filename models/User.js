const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,       // ISALPHA DOESNT ALLOW SPACE BETWEEN FIRST & LAST NAME- WE EITHER HAVE 2 SEPARATE BOXES IN SIGNUP BOX FOR NAME OR REMOVE VALIDATION
      len: [2]             // we can add min length of 2 to prevent use of initials only
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,       // ISALPHA DOESNT ALLOW SPACE BETWEEN FIRST & LAST NAME- WE EITHER HAVE 2 SEPARATE BOXES IN SIGNUP BOX FOR NAME OR REMOVE VALIDATION
      len: [2]             // we can add min length of 2 to prevent use of initials only
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4],
    },
  // },
  // isAdmin: {                // POSSIBLY NEED PASSPORT OR OTHER NPM PACKAGE FOR USER PERMISSIONs but we can collect data in interim
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  //   validate: {
  //     isAdmin: true,
  //   },
  },
  zipCode: {
    type: DataTypes.STRING,  // ZIP HAS TO BE A STRING BECAUSE INTEGERS WILL NOT ALLOW LEADING 0-PROBLEM FOR CT ETC
    allowNull: false,
    validate: {             // validate here restricts zipcode entry to 5 numbers
      len: [5],    
      isNumeric: true        
    },
  }
},
{
  hooks: {
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(
        updatedUserData.password,
        10
      );
      return updatedUserData;
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "user",
});

module.exports = User;
