import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model() {
    return this.store.findAll('post');
  },

  afterModel(model) {
    this.set('headData.title', 'blog | aaron petcoff | web developer | brooklyn');
    this.set('headData.image', 'http://aaronpetcoff.me/img/me.jpeg');
    this.set('headData.description', 'I\'m a web developer living in Brooklyn who is excited about working with new technologies, working with cool people, and trying to make the web (and the world) a better place.');

    if (window && window.ga) {
      ga('send', 'event', 'blog', 'click', 'blog');
    }
  }
});
