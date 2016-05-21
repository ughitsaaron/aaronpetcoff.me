import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'talks',

  model() {
    return this.store.query('repository', { q: 'mytalks+user:ughitsaaron' });
  },

  afterModel() {
    ga('send', 'event', 'talks', 'click', 'talks');
  }
});
