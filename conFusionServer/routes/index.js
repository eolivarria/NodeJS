var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  if(! req.session. views){
    req.session.views = 1;
  }else{
    req.session.views += 1;
  }
  res.json({
    "status": "ok",
    "frequency": req.session.views
  });
});

module.exports = router;