import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    if (window && window.ga) {
      ga('send', 'event', 'tag', 'click', params.tag);
    }

    this.set('headData.title', params.tag + ' | aaron petcoff | web developer | brooklyn');
    this.set('headData.image', 'http://aaronpetcoff.me/img/me.jpeg');
    this.set('headData.description', 'I\'m a web developer living in Brooklyn who is excited about working with new technologies, working with cool people, and trying to make the web (and the world) a better place.');

    return this.store.queryRecord('post', { tag: params.tag });
  }
});
