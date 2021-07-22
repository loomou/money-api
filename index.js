const Koa = require('koa');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');
const koaJsonError = require('koa-json-error');
const cors = require('kcors');

const userRouter = require('./routes/user');
const recordRouter = require('./routes/record');
const tagRouter = require('./routes/tag');

const app = new Koa();

app.use(cors({
  origin: "*",
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024,
  }
}));

function formatError(err) {
  return err;
}

app.use(koaJsonError(formatError));

app.use(koaJwt({
  secret: 'loginStatus'
}).unless({
  path: ['/api/user/login','/api/user/signup']
}));

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(recordRouter.routes()).use(recordRouter.allowedMethods());
app.use(tagRouter.routes()).use(tagRouter.allowedMethods());

app.listen(8080, () => {
  console.log('listen on 8080');
});
