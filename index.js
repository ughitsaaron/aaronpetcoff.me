"use strict";
// dependencies
let express = require("express"),
    app = express(),
    path = require("path"),
    compress = require("compression"),
    logger = require("morgan"),
    server = require("./lib/server"),
    opts = require("./config"),
    Promise = require("bluebird"),
    Feed = require("feed");

// start logging
app.use(logger("common"));

// gzip static assets
app.use(compress());

// start web server
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");
app.use(express.static(__dirname + opts.dirs.public));

// build blog api

app.get("/", function(req, res) {
  res.sendFile("public/index.html", {root: __dirname});
});

app.get("/api/posts/archive", (req, res) => {
  server.getPosts(__dirname + "/posts/")
  .then(posts => res.json(posts));
});

app.get("/api/posts/:slug", (req, res) => {
  server.readPostsDir(__dirname + "/posts/")
  .then(posts => posts.filter(value => path.basename(value,".md") === req.params.slug))
  .then(posts => {
    try {
      server.readPost(posts, __dirname + "/posts/", 0)
      .then(post => res.json(post));
    } catch(err) {
      res.status(404).sendFile("public/index.html", {root: __dirname});
    }
  });
});

app.get("/api/posts/:slug/shares", (req, res) => {
  Promise.all([
    server.getShares("twitter", "http://aaronpetcoff.me/blog/" + req.params.slug),
    server.getShares("facebook", "http://aaronpetcoff.me/blog/" + req.params.slug)
  ]).then(shares => {
    let twitter = JSON.parse(shares[0][1]),
        facebook = JSON.parse(shares[1][1]);

    res.json({
      twitter: {
        link: twitter.url,
        count: twitter.count || 0
      },
      facebook: {
        link: facebook.id,
        count: facebook.shares || 0
      }
    });
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

app.get("/feed", (req, res) => {
  var year = new Date();
  var feed = new Feed({
    title: "Aaron Petcoff",
    description: "Aaron Petcoff is a web developer based out of Brooklyn.",
    link: "http://aaronpetcoff.me",
    image: "http://aaronpetcoff.me/img/about.jpg",
    copyright: "Copyright (c) " + year.getFullYear() + " Aaron Petcoff",
    author: {
      name: "Aaron Petcoff",
      email: "hello@aaronpetcoff.me",
      link: "http://aaronpetcoff.me"
    }
  });

  return server.getPosts(__dirname + "/posts/")
  .then(posts => {
    posts = posts.filter((value, index) => ++index <= opts.maxPosts);
    posts.forEach(function(post) {
      feed.addItem({
        title: post.title,
        link: "http://aaronpetcoff.me/#/blog/" + post.slug,
        date: post.date,
        content: post.body
      });
    });

    res.set('Content-Type', 'text/xml');
    res.send(feed.render('rss-2.0'));
  });
});

app.get("*", function(req, res) {
  res.status(404).sendFile("public/index.html", {root: __dirname});
});