import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  afterModel(model) {
    const title = 'not found | aaron petcoff | web developer | brooklyn';
    this.set('headData.title', title);
    this.set('headData.description', 'I\'m a web developer living in Brooklyn who is excited about working with new technologies, working with cool people, and trying to make the web (and the world) a better place.')
  }
});
