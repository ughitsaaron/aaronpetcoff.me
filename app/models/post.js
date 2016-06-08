import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  created: DS.attr('date'),
  body: DS.attr('string'),
  image: DS.attr('string'),
  tags: DS.attr(),
  slugs: DS.attr(),

  fromNow: Ember.computed('created', function () {
    const created = this.get('created');

    return moment().diff(created, 'days') < 1 ? 'earlier today' : moment(created).fromNow();
  })
});
