---
title: Porting my personal site to Ember
---

This was super hard! zomg

```javascript
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("/api/posts").then(function(results) {
      console.log(results);
      return results.sortBy('date').reverse();
    });
  },
  setupController: function(controller,posts) {
    controller.set('model', posts);
  }
});
```