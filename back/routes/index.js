const express = require('express');
const router = express.Router();


router.get('/',function(req, res, next) {
  console.log(new Date());
  res.render('index',
      { title: '404'});
});



module.exports = router;
