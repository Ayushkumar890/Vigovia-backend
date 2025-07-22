const express = require('express');
const { postdata,getdata } = require('../controller/data_controller');
const router = express.Router();

router.post('/postdata', postdata);
router.get('/getdata', getdata);

module.exports = router;
