import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  location: DS.attr('string'),
  date: DS.attr('date'),
  url: DS.attr('string')
});
