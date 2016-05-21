import Ember from 'ember';

export default Ember.Controller.extend({
  order: ['date:desc'],
  sorted: Ember.computed.sort('model', 'order'),
  talks: Ember.computed.filterBy('sorted', 'status', 'published'),

  actions: {
    talk(title) {
      ga('send', 'event', 'talk', 'click', title);
    }
  }
});
