import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    ga('send', 'event', 'tag', 'click', params.tag);
    return this.store.queryRecord('post', { tag: params.tag });
  },
});
