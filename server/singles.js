"use strict";

var hbs = require("handlebars"),
    fs = require("fs"),
    hljs = require("highlight.js");

module.exports = function(posts, opts) {

  var template, index;

  index = hbs.compile(fs.readFileSync("./templates/default.html", {encoding:"utf-8"}));

  posts.forEach(function(post, i) {

    template = hbs.compile(fs.readFileSync("./templates/" + post.meta.template + ".html", {encoding:"utf-8"}));

    // helpers

    hbs.registerHelper("previous", function(body) {
      var link;
      
      if(i - 1 >= 0) link = posts[i - 1].meta.address;

      return link;
    });

    hbs.registerHelper("next", function(body) {
      var link;

      if(posts.length - 1 >= i + 1) link = posts[i + 1].meta.address;

      return link;
    });

    hbs.registerHelper("title", function() {
      var title;

      if(post.meta.title) {
        title = post.meta.title + " | " + opts.title;
      } else {
        title = opts.title;
      }

      return title;
    });

    hbs.registerPartial("content", template(post));

    fs.writeFile(opts.dirs.public + "posts/" + post.meta.address + ".html", index(template(post)), function(err) {
      if(err) throw err;

      if(opts.verbose) {
        var colors = require("colors");
        console.log((opts.dirs.public).green + "posts/".green + (post.meta.address).green + ".html".green + " written!".green);
      }
    });

    hbs.unregisterHelper("title");
  });
};