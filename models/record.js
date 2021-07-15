const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.import('./user');

  class Record extends Model {
  }

  // 关联定义
  Record.init({
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收支类型'
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '备注'
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '标签图标'
      },
      amount: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
        defaultValue: 0,
        comment: '总数'
      },
      // idNum: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   comment: 'idNum'
      // },
      // createdDate: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   comment: '时间'
      // }
    },
    {
      sequelize: sequelize,
      tableName: 'record',
      underscored: true,
      paranoid: true
    });

  Record.belongsTo(User, {
    constraints: false,
    foreignKey: 'userId',
    as: 'user'
  });

  return Record;
};
