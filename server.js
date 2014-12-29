/* jshint node: true */

"use strict";

// dependencies
var express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require('path'),
    watch = require('watch'),
    md = require("meta-marked"),
    colors = require("colors"),
    hljs = require("highlight.js");

//Convert *.md files in ./posts to *.html in ./public/posts
watch.createMonitor("./posts", function(monitor) {

  var make, // function to make posts
      markdown, // function to check if markdown
      exists, // function to check if source has already been compiled
      source = []; // store of noncompiled markdown

  make = function(src) {
    // console.log(src);
    fs.readFile(src, {encoding:"utf-8"}, function(err, data) {
      if(err) throw err;
      data = md(data, {
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        }
      });

      // save current datetime to new post in unix format
      // for parsing by angular
      data.meta.date = Date.now();

      fs.writeFile("./public/posts/" + path.basename(src,".md") + ".json", JSON.stringify(data), function(err) {
        if(err) throw err;

        // confirm new file written
        console.log("./public/posts/".green + path.basename(src,".md").green + ".json".green + " saved!".green);
      });
    });
  };

  markdown = function(src) {
    return path.extname(src) === ".md";
  };
  
  exists = function(src) {
    return fs.existsSync("./public/posts/" + path.basename(src,".md") + ".json");
  };

  // filter out non-md and already compiled files
  source = Object.keys(monitor.files).filter(function(el) {
    return markdown(el) && !exists(el);
  });

  // list how many files to write
  console.log(source.length ? source.length.green + " files to write.".green : "No files to write!".red);


  source.forEach(function(el, index) {
    make(el);
  });

  // create new file when one is made
  monitor.on("created", function(f, stat) {
    console.log(f.green + " created.".green);
    markdown(f) && !exists(f) ? make(f) : console.log(f.red + " has already been written.".red);
  });
});

//Create API of total posts out of posts in ./public/posts
app.get("/api/blog/", function(req,res) {
  fs.readdir("./public/posts/", function(err, files) {
    var Post, posts = [];

    // post object constructor
    Post = function(address, title, date) {
      this.address = address;
      this.title = title;
      this.date = date;
    };

    files = files.filter(function(el) {
      return path.extname(el) === ".json";
    });

    files.forEach(function(el, i) {
      var post, data;
      
      data = JSON.parse(fs.readFileSync("./public/posts/" + el, {encoding:"utf-8"}));
      post = new Post(path.basename(el,".json"), data.meta.title, data.meta.date);
      posts.push(post);
    });

    var mostRecent = function(a,b) {
      if(a.date < b.date) return 1;
      if(a.date > b.date) return -1;
      return 0;
    };

    return res.json(posts.sort(mostRecent));
  });
});

app.use(express.static(__dirname + "/public/"));
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");