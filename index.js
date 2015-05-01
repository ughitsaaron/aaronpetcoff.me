"use strict";
// dependencies
var express = require("express"),
    app = express(),
    path = require("path"),
    compress = require("compression"),
    logger = require("morgan"),
    server = require("./lib/server"),
    opts = require("./config");

// start logging
app.use(logger("common"));

// gzip static assets
app.use(compress());

// start web server
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");
app.use(express.static(__dirname + opts.dirs.public));

// build blog api

app.get("/api/posts/archive", function(req, res) {
  server.getPosts(__dirname + "/posts/")
  .then(function(posts) {    
    res.json(posts);
  });
});

app.get("/api/posts/:slug", function(req, res) {

  server.readPostsDir(__dirname + "/posts/")
  .then(function(posts) {
    posts = posts.filter(function(value) {
      return path.basename(value,".md") === req.params.slug;
    });

    return posts;
  })
  .then(function(posts) {
    console.log(posts);
    var post = server.readPost(posts, __dirname + "/posts/", 0)
    .then(function(post) {
      res.json(post);
    });
  });
});

app.get("/api/posts", function(req, res) {
  server.getPosts(__dirname + "/posts/")
  .then(function(posts) {
    posts = posts.filter(function(value, index) {
      return ++index <= opts.maxPosts;
    });
    
    res.json(posts);
  });
});

app.get("/api/tags/:tag", function(req, res) {
  server.getPosts(__dirname + "/posts/")
  .then(function(posts) {
    posts = posts.filter(function(value) {
      return value.tags.indexOf(req.params.tag) > -1
    });

    res.json(posts);
  });  
});

/* -----
/ TAGS /
----- */

/* SERVER SIDE */

// Make route to tags app.get("/api/tags/")

  // Read posts directory

    // Gather metadata from each post

  // Compile data:

  // {
  //   "tag name": {
  //     "totalPosts": ##,
  //     "posts": [
  //       "post_title_1": {
  //         "slug": slug
  //         "date": date
  //       }
  //       // etc., etc.
  //     ]
  //   }
  //   // etc., etc.
  // }

  // Then render data into JSON object that
  // lists each tag and each post appropriately

/* CLIENT SIDE */

// Make request to tag api

  // Read JSON object

  // Make route for /tags/:tag

    // List each post under that tag appropriately

app.get("/api/config", function(req, res) {
  server.getPosts(__dirname + "/posts/")
  .then(function(results) {
    opts.totalPosts = results.length;
    opts.dirs = undefined;
    res.json(opts);
  });
});