import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  host: 'https://api.github.com',
  namespace: 'search',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
