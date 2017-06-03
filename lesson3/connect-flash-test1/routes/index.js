var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
/* GET home page. */
//router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
//});

router.get('/test', function(req, res, next) {
  res.send('I am a test');
});

router.get('/', function(req, res, next) {
  if(req.session.user)
  {
      req.flash('info','登录成功');
      res.redirect('login');
  }
  else
  {
      res.send('未登录，请先登录！')
  }
});

// 登录
router.get('/login', function(req, res, next) {
  res.render('index', { title: '欢迎登录' });
});

router.get('/loginfirst',function(req,res,next){
   req.session.user = 'lichao'; 
   res.send('登录好了');
});


module.exports = router;
