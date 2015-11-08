import Ember from 'ember';
import _ from 'lodash';

export default Ember.Controller.extend({
  getSlugFromLink(link) {
    return _.last(link.split('/'))
  }
});
