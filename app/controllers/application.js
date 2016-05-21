import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    resume() {
      ga('send', 'event', 'nav', 'click', 'resume');
    }
  }
});
