import Ember from 'ember';
import fetch from 'ember-network/fetch'

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model() {
    return fetch('https://api.github.com/search/repositories?q=mytalks+user:ughitsaaron')
      .then(response => response.json())
      .then(function (response) {
        return response.items.map(repo => {
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
            title: title,
            location: location,
            date: date,
            url: `http://ughitsaaron.github.io/${repo.name}`,
            slides: slides || '',
            status: status
          };
        });
      });
  },

  afterModel() {
    this.set('headData.title', 'talks | aaron petcoff | web developer | brooklyn');

    if (window && window.ga) {
      ga('send', 'event', 'talks', 'click', 'talks');
    }
  }
});
