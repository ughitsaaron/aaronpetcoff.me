"use strict";

// dependencies
var express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require("path"),
    compress = require("compression"),
    logger = require("morgan"),
    md = require("meta-marked"),
    hljs = require("highlight.js"),
    Promise = require("bluebird");

// hook bluebird into fs module
Promise.promisifyAll(fs);

// set config options
var opts = {
  dirs : { posts : "./posts/", public : "/public/" },
  maxPosts: 10,
  blog:false
};

// start logging
app.use(logger("common"));

// gzip static assets
app.use(compress());

// start web server
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");
app.use(express.static(__dirname + opts.dirs.public));

// build blog api
var posts = [];

var Post = function(id,title,slug,date,body) {
  this.id = id;
  this.title = title;
  this.slug = slug;
  this.date = date;
  this.body = body;
};

var getPost = function(files, index) {
  var post = fs.readFileAsync(opts.dirs.posts + files[index], "utf-8")
  .then(function(data) {
    var id, title, slug, date, body;
  
    data = md(data, {
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  
    id = index + 1;
    title = data.meta.title;
    slug = path.basename(files[index], ".md");
    date = new Date(files[index].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0]);
    body = data.html;
  
    return new Post(id, title,slug,date,body);
  });
  
  posts.push(post);
};

var postData = fs.readdirAsync(opts.dirs.posts)
.then(function(files) {
  for(var index = 0; index < files.length; index++) {
    getPost(files,index);
  }

  return Promise.all(posts);
});

app.get("/api/posts/archive", function(req, res) {
  postData.then(function(results) {
    res.json(results);
  });
});

app.get("/api/posts/:slug", function(req, res) {
  postData.then(function(results) {
    res.json(results.filter(function(value) {
      return value.slug === req.params.slug;
    }));
  });
});

app.get("/api/posts", function(req, res) {
  postData.then(function(results) {
    res.json(results.reverse().filter(function(value,index) {
      return index+1 <= opts.maxPosts;
    }));
  });
});

app.get("/api/config", function(req, res) {
  postData.then(function(results) {
    opts.totalPosts = results.length;
    opts.dirs = undefined;
    res.json(opts);
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect("/#/four-oh-four");
  next();
});