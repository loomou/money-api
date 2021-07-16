const sequelize = require('../models/shared/sequelize');
const Record = sequelize.import('../models/record');

exports.createRecord = async (ctx) => {
  const {type, icon, amount, note, createdAt, userId} = ctx.request.body;

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
      createdAt
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
      exclude: ['updatedAt', 'deletedAt', 'userId']
    }
  });

  if (!recordList) {
    ctx.throw(400, {
      code: 400,
      message: '记录不存在'
    });
  }

  ctx.body = {
    code: 200,
    recordList: recordList
  };
};

exports.updateRecord = async (ctx) => {
  const {id, type, icon, amount, note, createdAt, userId} = ctx.request.body;

  if (!userId || !id) {
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
      createdAt: createdAt
    }, {
      where: {id}
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
  const {userId, id} = ctx.request.query;

  if (!userId || !id) {
    ctx.throw(400, {
      code: 400,
      message: "信息错误"
    });
  }

  try {
    await Record.destroy({
      where: {id}
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

exports.findRecord = async (ctx) => {
  const {userId, id} = ctx.request.body;

  if (!userId || !id) {
    ctx.throw(400, {
      code: 400,
      message: '无法查找'
    });
  }

  const inf = await Record.findOne({
    where: {userId, id},
    attributes: {
      exclude: ['updatedAt', 'deletedAt', 'userId']
    }
  });

  if (!inf) {
    ctx.throw(400, {
      code: 400,
      message: '记录不存在'
    });
  }

  ctx.body = {
    code: 200,
    content: '查询成功',
    inf: inf
  };
};
