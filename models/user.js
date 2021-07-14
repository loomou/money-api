const {Model} = require('sequelize');
const security = require('./shared/security');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    checkPassword(rawPassword) {
      return security.sha256(rawPassword) === this.password;
    }
  }

  User.init({
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '账号不能为空'
          },
          len: {
            msg: '账号长度为6-20位',
            args: [6, 20]
          },
          isAlphanumeric: {
            msg: '账号只能包含字母和数字'
          }
        },
        comment: '账号'
      },
      password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
        comment: '昵称'
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '头像'
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '性别'
      }
    },
    {
      sequelize: sequelize,
      tableName: 'user',
      underscored: true,
      paranoid: true,
      indexes: [
        {
          name: 'idx_username',
          fields: ['username']
        }
      ]
    });

  User.beforeSave((user) => {
    // 密码处理
    if (user.changed('password') && user.password.length > 0) {
      user.password = security.sha256(user.password);
    }
  });
  return User;
};
