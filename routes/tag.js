const Router = require('koa-router');
const tag = require('../controllers/tag');

const router = new Router({prefix: '/api/tag'});

router.post('/create', tag.createTag);
router.get('/get', tag.getTagByUser);
router.post('/update', tag.updateTag);
router.delete('/delete', tag.deleteTag);
router.post('/find', tag.findTag);

module.exports = router;
