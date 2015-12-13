import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  location: DS.attr('string'),
  date: DS.attr('date'),
  url: DS.attr('string'),
  status: DS.attr('string'),
  slides: DS.attr('string'),

  hasSlides: Ember.computed('slides', function() {
    return !!this.get('slides');
  })
});
