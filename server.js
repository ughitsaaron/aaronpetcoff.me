/* jshint node: true */

"use strict";

// dependencies
var express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require('path'),
    md = require("marked"),
    hljs = require("highlight.js");

// Create list of all posts for homepage
app.get("/api/blog/", function(req,res) {
  fs.readdir("posts/", function(err, files) {
    var Post, posts = [];

    // post object constructor
    Post = function(address, title) {
      this.address = address;
      this.title = title;
    };

    // grab markdown only files
    files = files.filter(function(el) {
      return path.extname(el) === ".md";
    });

    // on each markdown file in the posts directory
    // extract post title metadata and the file's
    // basename to act as address

    files.forEach(function(el, index) {
      var article, title;

      el = "posts/" + el;
      title = fs.readFileSync(el, {encoding:"utf-8"})
              .match(/(?:\btitle:)(.*)/gm)[0]
              .replace(/title:/g,"");
  
      article = new Post(path.basename(el,".md"), title);
      posts.push(article);
      
    });

    return res.json(posts);
  });
});

/* Render singles */
app.get("/api/blog/:file", function(req,res) {
  var file = "posts/" + req.params.file + ".md";

  fs.readFile(file, {encoding: "utf-8"}, function(err, data) {

    if (err) throw err;

    data = md.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    })(data);

    return res.json(data);
  });
});

app.use(express.static(__dirname + "/public/"));
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");