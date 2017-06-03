var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore=require('connect-mongo')(session);

var app = express();

app.use(cookieParser('12345'));
app.use(session({  
  secret: '12345',
  name: 'testapp',
  cookie: {maxAge: 80000},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({   //创建新的mongodb数据库
  url: 'mongodb://localhost/testdb',    //数据库+表的地址，本机的话就是127.0.0.1或者localhost，也可以是网络主机
  port: 27017,          //数据库的端口号
     })
 }));


app.get('/',function(req,res){
    if(req.session.lastPage)
    {
       res.send('已经有sessiion信息：'+req.session.lastPage);
    }
    else
    {
        res.send('还没有session信息，请先访问其他页面！');
    }
})

app.get('/awesome', function(req, res){
    
    if(req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + ".");    
    }    
    req.session.lastPage = '/awesome'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
    req.session.another='another-test';
    res.send("lastPage:"+req.session.lastPage+";another:"+req.session.another+";You're Awesome. And the session expired time is: " + req.session.cookie.maxAge);
});

app.listen(5000);