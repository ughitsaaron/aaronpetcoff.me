import Ember from 'ember';

export default Ember.Route.extend({
  title: tokens => {
    let subtitle = 'aaron petcoff | web developer | brooklyn',
      title = tokens.length
      ? `${tokens.join(' | ')} | ${subtitle}`
      : `${subtitle}`;

    return title.toLowerCase();
  },

  actions: {
    loading() {
      document.body.classList.add('loading');
    },

    didTransition() {
      document.body.classList.remove('loading');
    }
  }
});
