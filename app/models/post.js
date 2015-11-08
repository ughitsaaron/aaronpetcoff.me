import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  created: DS.attr('date'),
  body: DS.attr('string'),
  tags: DS.attr(),
  slugs: DS.attr()
});
