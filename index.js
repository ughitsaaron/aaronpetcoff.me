"use strict";
// dependencies
let express = require("express"),
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

app.get("/api/posts/archive", (req, res) => {
  server.getPosts(__dirname + "/posts/")
  .then(posts => res.json(posts));
});

app.get("/api/posts/:slug", (req, res) => {
  server.readPostsDir(__dirname + "/posts/")
  .then(posts => posts.filter(value => path.basename(value,".md") === req.params.slug))
  .then(posts => {
    server.readPost(posts, __dirname + "/posts/", 0)
    .then(post => res.json(post));
  });
});

app.get("/api/posts", (req, res) => {
  server.getPosts(__dirname + "/posts/")
  .then(posts => {
    posts = posts.filter((value, index) => ++index <= opts.maxPosts);
    res.json(posts);
  });
});

app.get("/api/tags/:tag", (req, res) => {
  server.getPosts(__dirname + "/posts/")
  .then(posts => {
    posts = posts.filter(value => value.tags.indexOf(req.params.tag) > -1);
    res.json(posts);
  });
});

app.get("/api/config", (req, res) => {
  server.getPosts(__dirname + "/posts/")
  .then(results => {
    opts.totalPosts = results.length;
    opts.dirs = undefined;
    res.json(opts);
  });
});