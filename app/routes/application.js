import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  afterModel() {
    this.set('headData.title', 'aaron petcoff | web developer | brooklyn');
    this.set('headData.image', 'http://aaronpetcoff.me/img/me.jpeg');
    this.set('headData.description', 'I\'m a web developer living in Brooklyn who is excited about working with new technologies, working with cool people, and trying to make the web (and the world) a better place.')
  },

  actions: {
    loading() {
      if (window && window.document) {
        document.body.classList.add('loading');
      }
    },

    didTransition() {
      if (window && window.document) {
        document.body.classList.remove('loading');
      }
    }
  }
});
