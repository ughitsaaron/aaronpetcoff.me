import Ember from 'ember';

export default Ember.Route.extend({
  title: tokens => {
    let title = 'aaron petcoff | web developer | brooklyn';

    return tokens.length
      ? `${tokens.join(' | ')} | ${title}`
      : `${title}`
  }
});
