const Router = require('koa-router');
const record = require('../controllers/record');

const router = new Router({prefix: '/api/record'});

router.post('/create', record.createRecord);
router.get('/get', record.getRecordByUser);
router.post('/update', record.updateRecord);
router.delete('/delete', record.deleteRecord);

module.exports = router;
