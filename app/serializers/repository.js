import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(key) {
    return Ember.String.decamelize(key);
  },

  normalizeQueryResponse(store, model, payload) {
    let response = {};

    response.data = payload.items.map(repo => {
      let description = repo.description.split(', '),
        title = description[1],
        location = description[2],
        date = new Date(description[3]);

      return {
        id: repo.id,
        type: model.modelName,
        attributes: {
          title: title,
          location: location,
          date: date,
          url: `http://ughitsaaron.github.io/${repo.name}`
        }
      };
    });

    return {
      data: response.data
    };
  }
});
