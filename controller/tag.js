const sequelize = require('../models/shared/sequelize');
const Tag = sequelize.import('../models/tag');

exports.createTag = async (ctx) => {
  const {idNum, type, icon, name, userId} = ctx.request.body;

  if (!userId) {
    ctx.throw(400, {
      code: 400,
      message: "记录不能为空"
    });
  }

  try {
    await Tag.create({
      userId,
      type,
      icon,
      name,
      idNum
    });
  } catch (err) {
    ctx.throw(400, {
      code: 400,
      message: err.msg
    });
  }

  ctx.body = {
    code: 200,
    content: "创建标签成功"
  };
};

exports.getTagByUser = async (ctx) => {
  const {userId} = ctx.request.query;

  if (!userId) {
    ctx.throw(400, {
      code: 400,
      message: "不存在"
    });
  }

  const tagsList = await Tag.findAll({
    where: {userId},
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'userId', 'id']
    }
  });

  ctx.body = {
    code: 200,
    tagsList: tagsList
  };
};

exports.updateTag = async (ctx) => {
  const {idNum, type, icon, name, userId} = ctx.request.body;

  if (!userId || !idNum) {
    ctx.throw(400, {
      code: 400,
      message: "信息错误"
    });
  }

  try {
    await Tag.update({
      type: type,
      icon: icon,
      name: name
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

exports.deleteTag = async (ctx) => {
  const {userId, idNum} = ctx.request.query;

  if (!userId || !idNum) {
    ctx.throw(400, {
      code: 400,
      message: "信息错误"
    });
  }

  try {
    await Tag.destroy({
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
