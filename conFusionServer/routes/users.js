var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var User = require('../models/user');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {//allow admin to be able to retrieve all administered users
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null){
      var err = new Error('User '+req.body.username + ' already exists!');
      err.status = 403;//forbidden
      next(err);
    }
    else{
      return User.create({
        username: req.body.username,
        password: req.body.password
      });
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Sucessful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/login', (req,res,next) => {
  if(!req.session.user){
    var authHeader = req.headers.authorization;//authorization header
    if(!authHeader){
      var err = new Error('Your are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;//unauthorize access
      return next(err);//error handler
    }
  
    var auth = new Buffer(authHeader.split(' ')[1], 'base64')//take base64 encoding
                  .toString().split(':');
    var username = auth[0];
    var password = auth[1];

    User.findOne({username: username})
    .then((user) => {
      if(user === null){
        var err = new Error('User '+username+' does not exists!');
        err.status = 403;
        return next(err);
      }else if(user.password != password){
        var err = new Error('Incorrect password');
        err.status = 403;
        return next(err);
      }else if(user.password === password){
        req.session.user = 'authenticated';//set for check in app
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!');
      }
    })
    .catch((err) => next(err));
  }else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');//user tries to log the already logged account
  }
});

router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');//clear cookie on client to avoid the use of an expired session
    res.redirect('/');
  }else{
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
