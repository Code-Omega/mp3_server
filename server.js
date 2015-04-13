// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var Llama = require('./models/llama');
var User = require('./models/users');
var Task = require('./models/tasks');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
//mongoose.connect('mongodb://localhost/mp3');
mongoose.connect('mongodb://rooty:rootypass@ds043981.mongolab.com:43981/dbmp3', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// All our routes will start with /api
app.use('/api', router);

//Default route here
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.json({ message: 'Hello World!' });
});

//Llama route
var llamaRoute = router.route('/llamas');
var userRoute = router.route('/users');
var taskRoute = router.route('/tasks');

var parser = function(ep, req,res,next) {
  var ret = 'Llama';
  if (typeof req.query.where === 'undefined') ret = ret+'.find({})';
  else ret = ret+'.find('+req.query.where+')';
  if (typeof req.query.sort != 'undefined') ret = ret+'.sort('+req.query.sort+')';
  if (typeof req.query.select != 'undefined') ret = ret+'.select('+req.query.select+')';
  if (typeof req.query.skip != 'undefined') ret = ret+'.skip('+req.query.skip+')';
  if (typeof req.query.limit != 'undefined') ret = ret+'.limit('+req.query.limit+')';
  if (typeof req.query.count != 'undefined') ret = ret+'.count('+req.query.count+')';
  ret = ret + ".exec(function(err,get){if(err) return next(err); res.json(get);});"
  //console.log(ret);
  //console.log("----");
  eval(ret);
}

llamaRoute.get(function(req,res,next) {
  var ret = 'Llama';
  if (typeof req.query.where === 'undefined') ret = ret+'.find({})';
  else ret = ret+'.find('+req.query.where+')';
  if (typeof req.query.sort != 'undefined') ret = ret+'.sort('+req.query.sort+')';
  if (typeof req.query.select != 'undefined') ret = ret+'.select('+req.query.select+')';
  if (typeof req.query.skip != 'undefined') ret = ret+'.skip('+req.query.skip+')';
  if (typeof req.query.limit != 'undefined') ret = ret+'.limit('+req.query.limit+')';
  if (typeof req.query.count != 'undefined') ret = ret+'.count('+req.query.count+')';
  ret = ret + ".exec(function(err,get){if(err) return next(err); res.json(get);});"
  //console.log(ret);
  //console.log("----");
  eval(ret);
});

router.get('/users',function(req, res,next) {
  var ret = 'User';
  if (typeof req.query.where === 'undefined') ret = ret+'.find({})';
  else ret = ret+'.find('+req.query.where+')';
  if (typeof req.query.sort != 'undefined') ret = ret+'.sort('+req.query.sort+')';
  if (typeof req.query.select != 'undefined') ret = ret+'.select('+req.query.select+')';
  if (typeof req.query.skip != 'undefined') ret = ret+'.skip('+req.query.skip+')';
  if (typeof req.query.limit != 'undefined') ret = ret+'.limit('+req.query.limit+')';
  if (typeof req.query.count != 'undefined') ret = ret+'.count('+req.query.count+')';
  ret = ret + ".exec(function(err,get){if(err) {var msg = '{\"message\": \"Server Error\",\"data\":'+JSON.stringify(get)+'}';"+
      " msg = JSON.parse(msg); res.statusCode = 500; res.json(msg); return next(err);}"+
      "var msg = '{\"message\": \"OK\",\"data\":'+JSON.stringify(get)+'}';msg = JSON.parse(msg);res.statusCode = 200;res.json(msg);});"
  //console.log(ret);
  //console.log("----");
  eval(ret);
  return;
});

router.get('/tasks',function(req, res,next) {
  var ret = 'Task';
  if (typeof req.query.where === 'undefined') ret = ret+'.find({})';
  else ret = ret+'.find('+req.query.where+')';
  if (typeof req.query.sort != 'undefined') ret = ret+'.sort('+req.query.sort+')';
  if (typeof req.query.select != 'undefined') ret = ret+'.select('+req.query.select+')';
  if (typeof req.query.skip != 'undefined') ret = ret+'.skip('+req.query.skip+')';
  if (typeof req.query.limit != 'undefined') ret = ret+'.limit('+req.query.limit+')';
  if (typeof req.query.count != 'undefined') ret = ret+'.count('+req.query.count+')';
  ret = ret + ".exec(function(err,get){if(err) {var msg = '{\"message\": \"Server Error\",\"data\":'+JSON.stringify(get)+'}';"+
      " msg = JSON.parse(msg); res.statusCode = 500; res.json(msg); return next(err);}"+
      "var msg = '{\"message\": \"OK\",\"data\":'+JSON.stringify(get)+'}';msg = JSON.parse(msg);res.statusCode = 200;res.json(msg);});"
  //console.log(ret);
  //console.log("----");
  eval(ret);
  return;
});

llamaRoute.post(function(req,res,next){
  Llama.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

llamaRoute.options(function(req,res,next){
  res.writeHead(200);
  res.end();
});

router.get('/llamas/:id',function(req,res,next){
  Llama.findOne({_id:req.params.id},function(err,get){
    if(err) return next(err);
    res.json(get);
  });
});

router.put('/llamas/:id',function(req,res,next){
  Llama.findOneAndUpdate({_id:req.params.id},req.body,function(err,put){
    if(err) return next(err);
    res.json(put);
  });
});

router.delete('/llamas/:id',function(req,res,next){
  Llama.findOneAndRemove({_id:req.params.id},req.body,function(err,del){
    if(err) return next(err);
    res.json(del);
  });
});

//----------------------------

router.post('/users',function(req,res,next){
  User.create(req.body,function(err,post){
    if(err) {
        if(err.code == 11000) {
            res.status(500).json({message: 'Email already exists.', "data":[]});
            return;
        }
        var msg = '{"message": "Server Error","data":'+JSON.stringify(post)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(!post.name){
        res.status(500).json({message: 'Name field is required',"data":[]});
        return;
    }
    if(!post.email){
        res.status(500).json({message: 'Email field is required',"data":[]});
        return;
    }
    var msg = '{"message": "User Added","data":'+JSON.stringify(post)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 201;
    res.json(msg);
    return;
  });
});

router.options('/users',function(req,res,next){
  res.writeHead(200);
  res.end();
});

router.get('/users/:id',function(req,res,next){
  User.findOne({_id:req.params.id},function(err,get){
    if(err) {
        if (err.path == '_id') {
            var msg = '{"message": "User Not Found","data":[]}';
            msg = JSON.parse(msg);
            res.statusCode = 404;
            res.json(msg);
            return;
        }
        var msg = '{"message": "Server Error","data":'+JSON.stringify(get)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(JSON.stringify(get) == 'null') {
        var msg = '{"message": "User Not Found","data":[]}';
        msg = JSON.parse(msg);
        res.statusCode = 404;
        res.json(msg);
        return;
    }
    var msg = '{"message": "OK","data":'+JSON.stringify(get)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 200;
    res.json(msg);
    return;
  });
});

router.put('/users/:id',function(req,res,next){
  User.findOneAndUpdate({_id:req.params.id},req.body,function(err,put){
    if(err) {
        if (err.path == '_id') {
            var msg = '{"message": "User Not Found","data":[]}';
            msg = JSON.parse(msg);
            res.statusCode = 404;
            res.json(msg);
            return;
        }
        if(err.code == 11000) {
            res.status(500).json({message: 'Email already exists.', "data":[]});
            return;
        }
        var msg = '{"message": "Server Error",data":'+JSON.stringify(put)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(JSON.stringify(put) == 'null') {
        var msg = '{"message": "User Not Found","data":[]}';
        msg = JSON.parse(msg);
        res.statusCode = 404;
        res.json(msg);
        return;
    }
    if(!put.name){
        res.status(500).json({message: 'Name field is required',"data":[]});
        return;
    }
    if(!put.email){
        res.status(500).json({message: 'Email field is required',"data":[]});
        return;
    }
    var msg = '{"message": "User Updated",'+'"data":'+JSON.stringify(put)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 200;
    res.json(msg);
    return 200;
  });
});

router.delete('/users/:id',function(req,res,next){
  User.findOneAndRemove({_id:req.params.id},req.body,function(err,del){
    if(err) {
        if (err.path == '_id') {
            var msg = '{"message": "User Not Found","data":[]}';
            msg = JSON.parse(msg);
            res.statusCode = 404;
            res.json(msg);
            return;
        }
        var msg = '{"message": "Server Error",'+'"data":'+JSON.stringify(del)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500 ;
        res.json(msg);
        return next(err);
    }
    if(JSON.stringify(del) == 'null') {
        var msg = '{"message": "User Not Found","data":[]}';
        msg = JSON.parse(msg);
        res.statusCode = 404;
        res.json(msg);
        return;
    }
    var msg = '{"message": "User Removed",'+'"data":'+JSON.stringify(del)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 200;
    res.json(msg);
    return;
  });
});

//----------------------------

router.post('/tasks',function(req,res,next){
  Task.create(req.body,function(err,post){
    if(err) {
        var msg = '{"message": "Server Error","data":'+JSON.stringify(post)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(!post.name){
        res.status(500).json({message: 'Name field is required',"data":[]});
        return;
    }
    if(!post.deadline){
        res.status(500).json({message: 'Deadline is required',"data":[]});
        return;
    }
    var msg = '{"message": "Task Added","data":'+JSON.stringify(post)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 201;
    res.json(msg);
    return;
    });
});

router.options('/tasks',function(req,res,next){
  res.writeHead(200);
  res.end();
});

router.get('/tasks/:id',function(req,res,next){
  Task.findOne({_id:req.params.id},function(err,get){
    if(err) {
        /*console.log("XX");
        console.log(err);
        console.log("XX");*/
        if (err.path == '_id') {
            var msg = '{"message": "Task Not Found","data":[]}';
            msg = JSON.parse(msg);
            res.statusCode = 404;
            res.json(msg);
            return;
        }
        var msg = '{"message": "Server Error","data":"'+JSON.stringify(get)+'"}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(JSON.stringify(get) == 'null') {
        var msg = '{"message": "Task Not Found","data":[]}';
        msg = JSON.parse(msg);
        res.statusCode = 404;
        res.json(msg);
        return 404;
    }
    var msg = '{"message": "OK","data":'+JSON.stringify(get)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 200;
    res.json(msg);
    return;
  });
});

router.put('/tasks/:id',function(req,res,next){
  Task.findOneAndUpdate({_id:req.params.id},req.body,function(err,put){
    if(err) {
        if (err.path == '_id') {
            var msg = '{"message": "Task Not Found","data":[]}';
            msg = JSON.parse(msg);
            res.statusCode = 404;
            res.json(msg);
            return;
        }
        var msg = '{"message": "Server Error","data":'+JSON.stringify(put)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(JSON.stringify(put) == 'null') {
        var msg = '{"message": "Task Not Found","data":[]}';
        msg = JSON.parse(msg);
        res.statusCode = 404;
        res.json(msg);
        return;
    }
    if(!put.name){
        res.status(500).json({message: 'Name field is required',"data":[]});
        return;
    }
    if(!put.deadline){
        res.status(500).json({message: 'Deadline is required',"data":[]});
        return;
    }
    var msg = '{"message": "Task Updated","data":'+JSON.stringify(put)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 200;
    res.json(msg);
    return;
  });
});

router.delete('/tasks/:id',function(req,res,next){
  Task.findOneAndRemove({_id:req.params.id},req.body,function(err,del){
    if(err) {
        if (err.path == '_id') {
            var msg = '{"message": "Task Not Found","data":[]}';
            msg = JSON.parse(msg);
            res.statusCode = 404;
            res.json(msg);
            return;
        }
        var msg = '{"message": "Server Error,"data":'+JSON.stringify(del)+'}';
        msg = JSON.parse(msg);
        res.statusCode = 500;
        res.json(msg);
        return next(err);
    }
    if(JSON.stringify(del) == 'null') {
        var msg = '{"message": "Task Not Found","data":[]}';
        msg = JSON.parse(msg);
        res.statusCode = 404;
        res.json(msg);
        return;
    }
    var msg = '{"message": "Task Removed","data":'+JSON.stringify(del)+'}';
    msg = JSON.parse(msg);
    res.statusCode = 200;
    res.json(msg);
    return;
  });
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);