import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('post', { slug: params.slug });
  },

  titleToken: function(model) {
    return model.get('title');
  },

  afterModel(model) {
    // scroll to top of window after
    // transition between posts
    window.scrollTo(0, 0);
    ga('send', 'event', 'post', 'click', model.get('title'));
  }
});
