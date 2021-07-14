const sequelize = require('../models/shared/sequelize');
const User = sequelize.import('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = async (ctx) => {
  const {username, password, confirmPassword} = ctx.request.body;

  if (password !== confirmPassword) {
    ctx.throw(400, {
      code: 400,
      message: "确认密码不一致"
    });
  }

  const user = await User.findOne({
    where: {username}
  });

  if (user !== null) {
    ctx.throw(400, {
      code: 400,
      message: "用户名重复"
    });
  }

  try {
    await User.create({
      username,
      password
    });
  } catch (err) {
    ctx.throw(400, {
      code: 400,
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
      code: 400,
      message: "请填写完整"
    });
  }

  const user = await User.findOne({
    where: {username}
  });

  if (user === null || !user.checkPassword(password)) {
    ctx.throw(401, {
      code: 401,
      message: "账号或密码错误"
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
  const {userId, gender, nickname} = ctx.request.body;

  if (!userId) {
    ctx.throw(400, {
      code: 400,
      message: "用户不存在"
    });
  }

  try {
    await User.update({
      gender: gender,
      nickname: nickname
    }, {
      where: {userId}
    });
  } catch (err) {
    ctx.throw(400, {
      code: 400,
      message: "修改失败"
    });
  }

  ctx.body = {
    code: 200,
    content: "修改成功"
  };
};
