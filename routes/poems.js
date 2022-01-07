const express = require('express');
const router = express.Router();
const poemsCtrl = require('../controllers/poems');
const readlistCtrl = require('../controllers/readlist');
const readCtrl = require('../controllers/read');
const isLoggedIn = require('../config/auth');

router.get('/', poemsCtrl.index);
router.get('/readlist', readlistCtrl.index);
router.get('/read', readCtrl.index);
router.put('/addreadlist/:id', readlistCtrl.add);
router.put('/markread/:id', readCtrl.mark);
// Use isLoggedIn middleware to protect routes
router.get('/new', isLoggedIn, poemsCtrl.new);
router.post('/', isLoggedIn, poemsCtrl.create);
// show
router.get('/:id', poemsCtrl.show);
// delete
router.delete('/:id', poemsCtrl.delete);
// update
router.put('/:id', poemsCtrl.update);

module.exports = router;