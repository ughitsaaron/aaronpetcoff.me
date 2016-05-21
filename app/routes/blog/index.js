import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'blog',

  model() {
    return this.store.findAll('post');
  },

  afterModel(model) {
    ga('send', 'event', 'blog', 'click', 'blog');
  }
});
