const sequelize = require('../models/shared/sequelize');
const Tag = sequelize.import('../models/tag');
const Record = sequelize.import('../models/record');

exports.createTag = async (ctx) => {
  const {type, icon, name, userId} = ctx.request.body;

  if (!userId) {
    ctx.throw(400, {
      code: 1111,
      content: "缺少用户信息"
    });
  }

  const findTag = await Tag.findOne({
    where: {name}
  });

  if (findTag) {
    ctx.throw(400, {
      code: 1010,
      content: "标签名重复"
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
      code: 1011,
      content: '创建标签失败',
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
      code: 1111,
      content: "缺少用户信息"
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
      code: 1012,
      content: '标签不存在'
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
      code: 1111,
      content: "缺少用户信息"
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
      code: 1013,
      content: '标签更新失败',
      message: err.msg
    });
  }

  ctx.body = {
    code: 200,
    content: '修改成功'
  };
};

exports.deleteTag = async (ctx) => {
  const {userId, id} = ctx.request.query;

  if (!userId || !id) {
    ctx.throw(400, {
      code: 1111,
      content: "缺少用户信息"
    });
  }

  const findTag = await Tag.findOne({
    where: {id}
  })

  try {
    await Tag.destroy({
      where: {id}
    });
  } catch (err) {
    ctx.throw(400, {
      code: 1014,
      content: '标签删除失败',
      message: err.msg
    });
  }

  try {
    await Record.update({
      icon: findTag.type === 'pay' ? '-20' : '-21'
    }, {
      where: {icon: id}
    });
  } catch (err) {
    ctx.throw(400, {
      code: 1015,
      content: '记录标签更改失败',
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
      code: 1111,
      content: '缺少用户信息'
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
      code: 1016,
      content: '标签信息不存在'
    });
  }

  ctx.body = {
    code: 200,
    content: '查询成功',
    inf: inf
  };
};
