const sequelize = require('../models/shared/sequelize');
const User = sequelize.import('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = async (ctx) => {
  const {username, password, confirmPassword} = ctx.request.body;

  if (password !== confirmPassword) {
    ctx.throw(400, {
      code: 1112,
      content: "确认密码不一致",
    });
  }

  const user = await User.findOne({
    where: {username}
  });

  if (user !== null) {
    ctx.throw(400, {
      code: 1000,
      content: "用户名重复"
    });
  }

  try {
    await User.create({
      username,
      password
    });
  } catch (err) {
    ctx.throw(400, {
      code: 1001,
      content: '注册失败',
      message: err.msg
    });
  }

  ctx.body = {
    code: 200,
    content: "账号创建成功"
  };
};

exports.login = async (ctx) => {
  const {username, password} = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, {
      code: 1112,
      content: "请填写完整"
    });
  }

  const user = await User.findOne({
    where: {username}
  });

  if (user === null || !user.checkPassword(password)) {
    ctx.throw(400, {
      code: 1002,
      content: "账号或密码错误"
    });
  }

  const payLoad = {
    username: user.username,
    token: 'banana123',
    isValid: true
  };

  const token = jwt.sign(payLoad, 'loginStatus', {
    expiresIn: '1d'
  });

  ctx.body = {
    code: 200,
    content: "登录成功",
    token: 'Bearer ' + token,
    UserId: user.id
  };
};

exports.update = async (ctx) => {
  const {id, gender, nickname} = ctx.request.body;

  if (!id) {
    ctx.throw(400, {
      code: 1111,
      content: "用户不存在"
    });
  }

  try {
    await User.update({
      gender: gender,
      nickname: nickname
    }, {
      where: {id}
    });
  } catch (err) {
    ctx.throw(400, {
      code: 1003,
      content: "用户信息修改失败"
    });
  }

  ctx.body = {
    code: 200,
    content: "修改成功"
  };
};

exports.findUser = async (ctx) => {
  const {userId} = ctx.request.body;

  if (!userId) {
    ctx.throw(400, {
      code: 1111,
      content: '不存在用户'
    });
  }

  const inf = await User.findOne({
    where: {id: userId},
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'id', 'password', 'username', 'avatar']
    }
  });

  if (!inf) {
    ctx.throw(400, {
      code: 1004,
      content: '用户信息不存在'
    });
  }

  ctx.body = {
    code: 200,
    content: '查找成功',
    inf: inf
  };
};
