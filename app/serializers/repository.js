import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(key) {
    return Ember.String.decamelize(key);
  },

  normalizeQueryResponse(store, model, payload) {
    let response = {};

    response.data = payload.items.map(repo => {
      /**
       * data about each talk is stored in the repository's
       * description in a comma separated list
      */
      let description = repo.description.split(', '), // break desc into array

        // assign properties
        title = description[1],
        location = description[2],
        date = new Date(description[3]),
        status = description[4],
        slides; // optional property in case slides aren't HTML

      if (description[5]) {
        slides = description[5];
      }

      return {
        id: repo.id,
        type: model.modelName,
        attributes: {
          title: title,
          location: location,
          date: date,
          url: `http://ughitsaaron.github.io/${repo.name}`,
          slides: slides || '',
          status: status
        }
      };
    });

    return {
      data: response.data
    };
  }
});
