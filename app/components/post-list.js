import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'ul',
  classNames: ['post-list'],
  order: ['created:desc'],
  posts: Ember.computed.sort('data', 'order')
});
