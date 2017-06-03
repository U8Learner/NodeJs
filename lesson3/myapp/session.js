var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser('12345'));
app.use(session({
    secret: '12345',
    //name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
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

app.get('/radical', function(req, res){
    if (req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + ".");    
    }
    req.session.lastPage = '/radical';  
    res.send('What a radical visit! And the session expired time is: ' + req.session.cookie.maxAge);
});

app.get('/tubular', function(req, res){
    if (req.session.lastPage){
        console.log("Last page was: " + req.session.lastPage + ".");    
    }

    req.session.lastPage = '/tubular';
    res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge);
});


app.listen(5000);