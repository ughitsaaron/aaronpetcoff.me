import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('blog', function() {
    this.route('post', { path: ':slug' });
    this.route('tags', { path: 'tag/:tag' });
  });
});

export default Router;
