"use strict";

// dependencies
var express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require('path'),
    md = require("meta-marked"),
    colors = require("colors"),
    hljs = require("highlight.js"),
    // extend = require("util")._extend,
    renderer = require("./server/renderer.js");

var extend, config, opts;

// extend borrowed from 
// youmightnotneedjquery.com

extend = function(target) {
  target = target || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          extend(target[key], obj[key]);
        else
          target[key] = obj[key];
      }
    }
  }

  return target;
};

// extend defaults to config.json 
config = JSON.parse(fs.readFileSync("./config.json"));

opts = extend({
  title: "My Blog",
  date: {
    format: "MMMM Do, YYYY [at] h:mm a",
    relative: false
  },
  dirs : {
    posts : "./posts/",
    templates : "./templates/",
    pages : "./pages/",
    public : "./public/"
  },
  sort: {
    date: true,
    title: false,
    descending: true
  },
  permalinks: "./posts/:title/",
  verbose: false,
  maxPostsHome: 10
}, config);

// pass options to renderer
renderer(opts);

// establish post routes
app.use(express.static(__dirname + "/public/"));

app.get("/posts/:title", function(req,res) {
  res.sendFile("./public/posts/" + req.params.title + ".html", {root: __dirname});
});

app.get("/:page", function(req, res) {
  res.sendFile("./public/" + req.params.page + ".html", {root: __dirname}, function(err) {
    if(err) try {
      res.status(404);
      res.sendFile("./public/404.html", {root: __dirname});
    } catch(err) {
      throw err;
    }
  });
});

app.get("*", function(req,res) {
  res.status(404);
  res.sendFile("./public/404.html", {root: __dirname});
});

app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");