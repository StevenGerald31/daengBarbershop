const express = require('express');
const router = express.Router();
const adminrouter = require("../modules/admin-modules/admin-router")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/admin",adminrouter)

module.exports = router;
