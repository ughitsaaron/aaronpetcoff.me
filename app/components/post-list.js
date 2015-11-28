import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'ul',
  classNames: ['post-list'],
  order: ['created:desc'],
  attributeBindings: ['itemscope', 'itemtype'],
  itemscope: 'itemscope',
  itemtype: 'https://schema.org/Blog',
  posts: Ember.computed.sort('data', 'order')
});
