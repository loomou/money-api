const sequelize = require('../models/shared/sequelize');
const Record = sequelize.import('../models/record');

exports.createRecord = async (ctx) => {
  const {idNum, type, icon, amount, note, createdDate, userId} = ctx.request.body;

  if (!userId) {
    ctx.throw(400, {
      code: 400,
      message: "记录不能为空"
    });
  }

  try {
    await Record.create({
      userId,
      type,
      note,
      icon,
      amount,
      idNum,
      createdDate
    });
  } catch (err) {
    ctx.throw(400, {
      code: 400,
      message: err.msg
    });
  }

  ctx.body = {
    code: 200,
    content: "记录成功"
  };
};

exports.getRecordByUser = async (ctx) => {
  const {userId} = ctx.request.query;

  if (!userId) {
    ctx.throw(400, {
      code: 400,
      message: "不存在"
    });
  }

  const recordList = await Record.findAll({
    where: {userId},
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'userId', 'id']
    }
  });

  ctx.body = {
    code: 200,
    recordList: recordList
  };
};

exports.updateRecord = async (ctx) => {
  const {idNum, type, icon, amount, note, createdDate, userId} = ctx.request.body;

  if (!userId || !idNum) {
    ctx.throw(400, {
      code: 400,
      message: "信息错误"
    });
  }

  try {
    await Record.update({
      type: type,
      icon: icon,
      amount: amount,
      note: note,
      createdDate: createdDate
    }, {
      where: {idNum}
    });
  } catch (err) {
    ctx.throw(400, {
      code: 400,
      message: err.msg
    });
  }

  ctx.body = {
    code: 200,
    message: '修改成功'
  };
};

exports.deleteRecord = async (ctx) => {
  const {userId, idNum} = ctx.request.query;

  if (!userId || !idNum) {
    ctx.throw(400, {
      code: 400,
      message: "信息错误"
    });
  }

  try {
    await Record.destroy({
      where: {idNum}
    });
  } catch (err) {
    ctx.throw(400, {
      code: 400,
      message: err.msg
    });
  }

  ctx.body = {
    code: 200,
    content: "删除成功"
  };
};
