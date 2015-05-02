(function() {
  "use strict";

  var App = Ember.Application.create();

  // router

  App.Router.map(function() {
    this.resource("home", { path: "/" });
    this.resource("posts", { path: "blog" }, function() {
      this.resource("post", { path: ":slug" });
      this.resource("archive");
    });
    this.resource("tag", { path: "/tags/:tag" });
    this.resource("about", { path: "about"});
  });

  // routes

  App.ApplicationRoute = Ember.Route.extend({
    model: function() {
      return $.getJSON("/api/config");
    }
  });

  App.PostsRoute = Ember.Route.extend({
    model: function() {
      return $.getJSON("/api/posts").then(function(results) {
        return results.sortBy('date').reverse();
      });
    },
    setupController: function(controller,posts) {
      controller.set('model', posts);
    }
  });

  App.TagRoute = Ember.Route.extend({
    model: function(params) {
      return $.getJSON("/api/tags/" + params.tag).then(function(results) {
        return results;
      });
    },
    setupController: function(controller,posts) {
      controller.set('model', posts);
    }
  });

  App.ArchiveRoute = Ember.Route.extend({
    model: function() {
      return $.getJSON("/api/posts/archive").then(function(results) {
        console.log(results);
        return results.sortBy('date').reverse();
      });
    },
    setupController: function(controller,posts) {
      controller.set('model', posts);
    }
  });

  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return $.getJSON("/api/posts/" + params.slug).then(function(post) {
        return post;
      });
    },
    setupController: function(controller,post) {
      controller.set('model', post);
    }
  });

  // controllers

  App.ApplicationController = Ember.Controller.extend({
    showArchiveLink:function() {
      return this.get('model.totalPosts') >= this.get('model.maxPosts');
    }.property('model.showArchiveLink')
  });

  App.ApplicationController = Ember.Controller.extend({
    showBlogLink:function() {
      return this.get('model.showBlogLink');
    }.property('model.showBlogLink')
  });

  App.PostsIndexController = Ember.Controller.extend({
    needs:['application']
  });

  App.PostController = Ember.ObjectController.extend({
    needs: ['posts'],
    mostRecent: function() {
      return this.get('model._id') === this.get('controllers.posts.model.length');
    }.property('model.mostRecent'),
    oldest: function() {
      return this.get('model._id') === 1;
    }.property('model.oldest'),
    actions: {
      nextPost: function() {
        if(!this.get('mostRecent')) {
          this.transitionTo("post",this.get('controllers.posts.model').findBy('_id', (this.get('model._id') + 1)));
        }
      },
      previousPost: function() {
        if(!this.get('oldest')) {
          this.transitionTo("post",this.get('controllers.posts.model').findBy('_id', (this.get('model._id') - 1)));
        }
      }
    }
  });

  // helpers

  Ember.Handlebars.registerBoundHelper('relativeDate', function(date) {
    return moment(date).fromNow();
  });

  Ember.Handlebars.registerBoundHelper('formattedDate', function(date, format) {
    return moment(date).format(format);
  });
})();