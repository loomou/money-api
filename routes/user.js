const Router = require('koa-router');
const user = require('../controllers/user');

const router = new Router({prefix: '/api/user'});

router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/update', user.update);

module.exports = router;
