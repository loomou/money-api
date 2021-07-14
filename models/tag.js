const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.import('./user');

  class Tag extends Model {
  }

  // 关联定义
  Tag.init({
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收支类型'
      },
      name: {
        type: DataTypes.STRING(140),
        allowNull: false,
        comment: '标签名称'
      },
      icon: {
        type: DataTypes.STRING(140),
        allowNull: false,
        comment: '标签图标'
      },
      idNum: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'idNum'
      },
    },
    {
      sequelize: sequelize,
      tableName: 'tag',
      underscored: true,
      paranoid: true
    });

  Tag.belongsTo(User, {
    constraints: false,
    foreignKey: 'userId',
    as: 'user'
  });

  return Tag;
};
