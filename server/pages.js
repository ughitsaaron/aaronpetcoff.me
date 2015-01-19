"use strict";

var hbs = require("handlebars"),
    path = require("path"),
    md = require("meta-marked"),
    hljs = require("highlight.js"),
    colors = require("colors"),
    fs = require("fs");

module.exports = function(opts) {
  var pages;

  var pages = fs.readdirSync("./pages").filter(function(page) {
    return path.extname(page) === ".md" || ".html";
  });

  pages.forEach(function(page,i) {

    // take page parse markdown
    var address, template, container;

    address = path.basename(page,".md");
    page = fs.readFileSync("./pages/" + page, {encoding:"utf-8"});

    page = md(page, {
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });

    hbs.registerHelper("page", function() {
      return "page";
    });

    hbs.registerHelper("title", function() {
      var title;

      if(page.meta.title) {
        title = page.meta.title + " | " + opts.title;
      } else {
        title = opts.title;
      }

      return title;
    });

    page.meta.address = address;
    page.meta.container = page.meta.container || "page";

    if(page.meta.address === "profile") {
      page.profile = JSON.parse(fs.readFileSync("data/profile.json"));
    }

    hbs.registerHelper("canonical", function() {
      return "http://aaronpetcoff.me/" + (page.meta.address !== "index" ? page.meta.address : "");
    });

    container = hbs.compile(fs.readFileSync("./templates/" + page.meta.container + ".html", {encoding:"utf-8"}));

    hbs.registerPartial("content", container(page));

    template = hbs.compile(fs.readFileSync("./templates/" + page.meta.template + ".html", {encoding:"utf-8"}));

    // console.log(page);

    fs.writeFile(opts.dirs.public + page.meta.address + ".html", template(container(page)), function(err){
      if (err) throw err;

      console.log((opts.dirs.public).green + (page.meta.address).green + ".html".green + " written!".green);
    });

    hbs.unregisterPartial("content");
    hbs.unregisterHelper(["title", "page","canonical"]);
  });
};