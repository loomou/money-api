const sequelize = require('../models/shared/sequelize');
const Tag = sequelize.import('../models/tag');

exports.createTag = async (ctx) => {
  const {type, icon, name, userId} = ctx.request.body;

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
      name
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
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'userId']
    }
  });

  if (!tagsList) {
    ctx.throw(400, {
      code: 400,
      message: '标签不存在'
    });
  }

  ctx.body = {
    code: 200,
    tagsList: tagsList
  };
};

exports.updateTag = async (ctx) => {
  const {id, type, icon, name, userId} = ctx.request.body;

  if (!userId || !id) {
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

exports.deleteTag = async (ctx) => {
  const {userId, id} = ctx.request.query;

  if (!userId || !id) {
    ctx.throw(400, {
      code: 400,
      message: "信息错误"
    });
  }

  try {
    await Tag.destroy({
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

exports.findTag = async (ctx) => {
  const {userId, id} = ctx.request.body;

  if (!userId || !id) {
    ctx.throw(400, {
      code: 400,
      message: '无法查找'
    });
  }

  const inf = await Tag.findOne({
    where: {userId, id},
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'userId']
    }
  });

  if (!inf) {
    ctx.throw(400, {
      code: 400,
      message: '标签不存在'
    });
  }

  ctx.body = {
    code: 200,
    content: '查询成功',
    inf: inf
  };
};
