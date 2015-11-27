"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('aaronpetcoff/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].JSONAPIAdapter.extend({
    namespace: 'api/v1'
  });

});
define('aaronpetcoff/adapters/repository', ['exports', 'aaronpetcoff/adapters/application'], function (exports, ApplicationAdapter) {

  'use strict';

  exports['default'] = ApplicationAdapter['default'].extend({
    host: 'https://api.github.com',
    namespace: 'search',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

});
define('aaronpetcoff/app', ['exports', 'ember', 'ember-resolver', 'ember/load-initializers', 'aaronpetcoff/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('aaronpetcoff/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'aaronpetcoff/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var name = config['default'].APP.name;
  var version = config['default'].APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('aaronpetcoff/components/disqus-comment-count', ['exports', 'ember-disqus/components/disqus-comment-count'], function (exports, disqus_comment_count) {

	'use strict';



	exports['default'] = disqus_comment_count['default'];

});
define('aaronpetcoff/components/disqus-comments', ['exports', 'ember-disqus/components/disqus-comments'], function (exports, disqus_comments) {

	'use strict';



	exports['default'] = disqus_comments['default'];

});
define('aaronpetcoff/components/not-found', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('aaronpetcoff/components/post-list', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'ul',
    classNames: ['post-list'],
    order: ['created:desc'],
    posts: Ember['default'].computed.sort('data', 'order')
  });

});
define('aaronpetcoff/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('aaronpetcoff/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('aaronpetcoff/controllers/talks', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    order: ['date:desc'],
    sorted: Ember['default'].computed.sort('model', 'order'),
    talks: Ember['default'].computed.filterBy('sorted', 'status', 'published')
  });

});
define('aaronpetcoff/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, moment_duration) {

	'use strict';



	exports['default'] = moment_duration['default'];

});
define('aaronpetcoff/helpers/moment-format', ['exports', 'ember', 'aaronpetcoff/config/environment', 'ember-moment/helpers/moment-format'], function (exports, Ember, config, Helper) {

  'use strict';

  exports['default'] = Helper['default'].extend({
    globalOutputFormat: Ember['default'].get(config['default'], 'moment.outputFormat'),
    globalAllowEmpty: !!Ember['default'].get(config['default'], 'moment.allowEmpty')
  });

});
define('aaronpetcoff/helpers/moment-from-now', ['exports', 'ember', 'aaronpetcoff/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, Ember, config, Helper) {

  'use strict';

  exports['default'] = Helper['default'].extend({
    globalAllowEmpty: !!Ember['default'].get(config['default'], 'moment.allowEmpty')
  });

});
define('aaronpetcoff/helpers/moment-to-now', ['exports', 'ember', 'aaronpetcoff/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, Ember, config, Helper) {

  'use strict';

  exports['default'] = Helper['default'].extend({
    globalAllowEmpty: !!Ember['default'].get(config['default'], 'moment.allowEmpty')
  });

});
define('aaronpetcoff/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'aaronpetcoff/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](config['default'].APP.name, config['default'].APP.version)
  };

});
define('aaronpetcoff/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, ContainerDebugAdapter) {

  'use strict';

  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', ContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };

});
define('aaronpetcoff/initializers/export-application-global', ['exports', 'ember', 'aaronpetcoff/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('aaronpetcoff/models/post', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    created: DS['default'].attr('date'),
    body: DS['default'].attr('string'),
    tags: DS['default'].attr(),
    slugs: DS['default'].attr()
  });

});
define('aaronpetcoff/models/repository', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    location: DS['default'].attr('string'),
    date: DS['default'].attr('date'),
    url: DS['default'].attr('string'),
    status: DS['default'].attr('string')
  });

});
define('aaronpetcoff/router', ['exports', 'ember', 'aaronpetcoff/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('blog', function () {
      this.route('post', { path: ':slug' });
      this.route('tags', { path: 'tag/:tag' });
      this.route('error', { path: '*path' });
    });

    this.route('fourOhFour', { path: '*path' });
    this.route('talks');
  });

  exports['default'] = Router;

});
define('aaronpetcoff/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    title: function title(tokens) {
      var title = 'aaron petcoff | web developer | brooklyn';

      return tokens.length ? tokens.join(' | ') + ' | ' + title : '' + title;
    }
  });

});
define('aaronpetcoff/routes/blog/error', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('aaronpetcoff/routes/blog/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    titleToken: 'blog',

    model: function model() {
      return this.store.findAll('post');
    }
  });

});
define('aaronpetcoff/routes/blog/post', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.queryRecord('post', { slug: params.slug });
    },

    titleToken: function titleToken(model) {
      return model.get('title').toLowerCase();
    },

    afterModel: function afterModel() {
      // scroll to top of window after
      // transition between posts
      window.scrollTo(0, 0);
    }
  });

});
define('aaronpetcoff/routes/blog/tags', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.queryRecord('post', { tag: params.tag });
    }
  });

});
define('aaronpetcoff/routes/blog', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('aaronpetcoff/routes/four-oh-four', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    titleToken: 'nagl'
  });

});
define('aaronpetcoff/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('aaronpetcoff/routes/talks', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.query('repository', { q: 'mytalks+user:ughitsaaron' });
    }
  });

});
define('aaronpetcoff/serializers/repository', ['exports', 'ember-data', 'ember', 'moment'], function (exports, DS, Ember, moment) {

  'use strict';

  exports['default'] = DS['default'].JSONAPISerializer.extend({
    keyForAttribute: function keyForAttribute(key) {
      return Ember['default'].String.decamelize(key);
    },

    normalizeQueryResponse: function normalizeQueryResponse(store, model, payload) {
      var response = {};

      response.data = payload.items.map(function (repo) {
        var description = repo.description.split(', '),
            title = description[1],
            location = description[2],
            date = new Date(description[3]),
            status = description[4];

        return {
          id: repo.id,
          type: model.modelName,
          attributes: {
            title: title,
            location: location,
            date: date,
            url: 'http://ughitsaaron.github.io/' + repo.name,
            status: status
          }
        };
      });

      return {
        data: response.data
      };
    }
  });

});
define('aaronpetcoff/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, ajax) {

	'use strict';



	exports['default'] = ajax['default'];

});
define('aaronpetcoff/services/moment', ['exports', 'ember', 'moment'], function (exports, Ember, _moment) {

  'use strict';

  var computed = Ember['default'].computed;

  exports['default'] = Ember['default'].Service.extend({
    _locale: null,
    _timeZone: null,

    locale: computed({
      get: function get() {
        return this.get('_locale');
      },
      set: function set(propertyKey, locale) {
        this.set('_locale', locale);
        return locale;
      }
    }),

    timeZone: computed({
      get: function get() {
        return this.get('_timeZone');
      },
      set: function set(propertyKey, timeZone) {
        if (_moment['default'].tz) {
          this.set('_timeZone', timeZone);
          return timeZone;
        } else {
          Ember['default'].Logger.warn('[ember-moment] attempted to set timezone, but moment-timezone unavailable.');
        }
      }
    }),

    changeLocale: function changeLocale(locale) {
      this.set('locale', locale);
    },

    changeTimeZone: function changeTimeZone(timeZone) {
      this.set('timeZone', timeZone);
    },

    moment: function moment() {
      var time = _moment['default'].apply(undefined, arguments);
      var locale = this.get('locale');
      var timeZone = this.get('timeZone');

      if (locale) {
        time = time.locale(locale);
      }

      if (timeZone && time.tz) {
        time = time.tz(timeZone);
      }

      return time;
    }
  });

});
define('aaronpetcoff/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 28
            },
            "end": {
              "line": 3,
              "column": 171
            }
          },
          "moduleName": "aaronpetcoff/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","header-name-first");
          var el2 = dom.createTextNode("aaron");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","header-name-last");
          var el2 = dom.createTextNode("petcoff");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 6
            },
            "end": {
              "line": 6,
              "column": 145
            }
          },
          "moduleName": "aaronpetcoff/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          dom.setNamespace("http://www.w3.org/2000/svg");
          var el1 = dom.createElement("svg");
          dom.setAttribute(el1,"class","icon icon-home");
          dom.setAttribute(el1,"viewBox","0 0 32 32");
          var el2 = dom.createElement("use");
          dom.setAttributeNS(el2,"http://www.w3.org/1999/xlink","xlink:href","#icon-home");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 6
            },
            "end": {
              "line": 7,
              "column": 151
            }
          },
          "moduleName": "aaronpetcoff/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          dom.setNamespace("http://www.w3.org/2000/svg");
          var el1 = dom.createElement("svg");
          dom.setAttribute(el1,"class","icon icon-quill");
          dom.setAttribute(el1,"viewBox","0 0 1024 1024");
          var el2 = dom.createElement("use");
          dom.setAttributeNS(el2,"http://www.w3.org/1999/xlink","xlink:href","#icon-quill");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 6
            },
            "end": {
              "line": 8,
              "column": 150
            }
          },
          "moduleName": "aaronpetcoff/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          dom.setNamespace("http://www.w3.org/2000/svg");
          var el1 = dom.createElement("svg");
          dom.setAttribute(el1,"class","icon icon-podium");
          dom.setAttribute(el1,"viewBox","0 0 32 32");
          var el2 = dom.createElement("use");
          dom.setAttributeNS(el2,"http://www.w3.org/1999/xlink","xlink:href","#icon-podium");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "multiple-nodes"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","wrap");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        dom.setAttribute(el3,"class","header-name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","header-tagline");
        var el4 = dom.createTextNode("web developer • brooklyn");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("nav");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" <a href=\"\" class=\"nav-link\"><svg class=\"icon icon-profile\" viewBox=\"0 0 32 32\"><use xlink:href=\"#icon-stack\"></use></svg></a> ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","footer-contact-list");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","footer-contact-link");
        dom.setAttribute(el4,"href","/feed");
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el5 = dom.createElement("svg");
        dom.setAttribute(el5,"class","icon icon-syndication");
        dom.setAttribute(el5,"viewBox","0 0 1024 1024");
        var el6 = dom.createElement("use");
        dom.setAttributeNS(el6,"http://www.w3.org/1999/xlink","xlink:href","#icon-syndication");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace(null);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","footer-contact-link");
        dom.setAttribute(el4,"href","mailto:hello [ at ] aaronpetcoff [ dot ] me");
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el5 = dom.createElement("svg");
        dom.setAttribute(el5,"class","icon icon-email");
        dom.setAttribute(el5,"viewBox","0 0 32 32");
        var el6 = dom.createElement("use");
        dom.setAttributeNS(el6,"http://www.w3.org/1999/xlink","xlink:href","#icon-email");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace(null);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","footer-contact-link");
        dom.setAttribute(el4,"href","https://www.github.com/ughitsaaron");
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el5 = dom.createElement("svg");
        dom.setAttribute(el5,"class","icon icon-github");
        dom.setAttribute(el5,"viewBox","0 0 32 32");
        var el6 = dom.createElement("use");
        dom.setAttributeNS(el6,"http://www.w3.org/1999/xlink","xlink:href","#icon-github");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.setNamespace(null);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","footer-contact-link");
        dom.setAttribute(el4,"href","http://www.twitter.com/ughitsaaron");
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el5 = dom.createElement("svg");
        dom.setAttribute(el5,"class","icon icon-twitter");
        dom.setAttribute(el5,"viewBox","0 0 32 32");
        var el6 = dom.createElement("use");
        dom.setAttributeNS(el6,"http://www.w3.org/1999/xlink","xlink:href","#icon-twitter");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.setNamespace(null);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2,"class","footer-copyright");
        var el3 = dom.createTextNode("© ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Aaron Petcoff");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [5]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[1] = dom.createMorphAt(element2,1,1);
        morphs[2] = dom.createMorphAt(element2,3,3);
        morphs[3] = dom.createMorphAt(element2,5,5);
        morphs[4] = dom.createMorphAt(element0,3,3);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2, 3]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],["class","header-title","title","Home"],0,null,["loc",[null,[3,28],[3,183]]]],
        ["block","link-to",["index"],["class","nav-link","title","Home"],1,null,["loc",[null,[6,6],[6,157]]]],
        ["block","link-to",["blog"],["class","nav-link","title","Posts"],2,null,["loc",[null,[7,6],[7,163]]]],
        ["block","link-to",["talks"],["class","nav-link","title","Talks"],3,null,["loc",[null,[8,6],[8,162]]]],
        ["content","outlet",["loc",[null,[14,4],[14,16]]]],
        ["inline","moment-format",[["get","now",["loc",[null,[24,53],[24,56]]]],"YYYY"],[],["loc",[null,[24,37],[24,66]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('aaronpetcoff/templates/blog/error', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "empty-body"
            ]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 14
            }
          },
          "moduleName": "aaronpetcoff/templates/blog/error.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/blog/error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","not-found",[],[],0,null,["loc",[null,[1,0],[1,28]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/blog/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "empty-body"
            ]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 25
            }
          },
          "moduleName": "aaronpetcoff/templates/blog/index.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/blog/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","post-list",[],["data",["subexpr","@mut",[["get","model",["loc",[null,[1,18],[1,23]]]]],[],[]]],0,null,["loc",[null,[1,0],[1,39]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/blog/post', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 63
              }
            },
            "moduleName": "aaronpetcoff/templates/blog/post.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","tag",["loc",[null,[6,56],[6,63]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 4
            },
            "end": {
              "line": 7,
              "column": 4
            }
          },
          "moduleName": "aaronpetcoff/templates/blog/post.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["block","link-to",["blog.tags",["get","tag",["loc",[null,[6,29],[6,32]]]]],["class","post-tags-tag"],0,null,["loc",[null,[6,6],[6,75]]]]
        ],
        locals: ["tag"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 81
              }
            },
            "moduleName": "aaronpetcoff/templates/blog/post.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Previous");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 4
            },
            "end": {
              "line": 15,
              "column": 4
            }
          },
          "moduleName": "aaronpetcoff/templates/blog/post.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["block","link-to",["blog.post",["get","model.slugs.prev",["loc",[null,[14,29],[14,45]]]]],["class","post-nav-previous"],0,null,["loc",[null,[14,6],[14,93]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 6
              },
              "end": {
                "line": 18,
                "column": 73
              }
            },
            "moduleName": "aaronpetcoff/templates/blog/post.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Next");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 4
            },
            "end": {
              "line": 19,
              "column": 4
            }
          },
          "moduleName": "aaronpetcoff/templates/blog/post.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["block","link-to",["blog.post",["get","model.slugs.next",["loc",[null,[18,29],[18,45]]]]],["class","post-nav-next"],0,null,["loc",[null,[18,6],[18,85]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/blog/post.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2,"class","post-info");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" |\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","post-tags");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","post-nav");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [7]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(element1,0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [2]),1,1);
        morphs[3] = dom.createUnsafeMorphAt(element0,5,5);
        morphs[4] = dom.createMorphAt(element2,1,1);
        morphs[5] = dom.createMorphAt(element2,3,3);
        morphs[6] = dom.createMorphAt(element0,9,9);
        return morphs;
      },
      statements: [
        ["content","model.title",["loc",[null,[2,6],[2,21]]]],
        ["inline","moment-format",[["get","model.created",["loc",[null,[3,42],[3,55]]]],"YYYY.MM.DD"],[],["loc",[null,[3,26],[3,70]]]],
        ["block","each",[["get","model.tags",["loc",[null,[5,12],[5,22]]]]],[],0,null,["loc",[null,[5,4],[7,13]]]],
        ["content","model.body",["loc",[null,[10,2],[10,18]]]],
        ["block","if",[["get","model.slugs.prev",["loc",[null,[13,10],[13,26]]]]],[],1,null,["loc",[null,[13,4],[15,11]]]],
        ["block","if",[["get","model.slugs.next",["loc",[null,[17,10],[17,26]]]]],[],2,null,["loc",[null,[17,4],[19,11]]]],
        ["inline","disqus-comments",[],["identifier",["subexpr","@mut",[["get","model.title",["loc",[null,[22,31],[22,42]]]]],[],[]]],["loc",[null,[22,2],[22,44]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('aaronpetcoff/templates/blog/tags', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "empty-body"
            ]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 25
            }
          },
          "moduleName": "aaronpetcoff/templates/blog/tags.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/blog/tags.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","post-list",[],["data",["subexpr","@mut",[["get","model",["loc",[null,[1,18],[1,23]]]]],[],[]]],0,null,["loc",[null,[1,0],[1,39]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/blog', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/blog.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('aaronpetcoff/templates/components/not-found', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 20
            },
            "end": {
              "line": 5,
              "column": 44
            }
          },
          "moduleName": "aaronpetcoff/templates/components/not-found.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("home");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/components/not-found.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","fourohfour");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("I couldn't find that.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"src","/img/404.gif");
        dom.setAttribute(el2,"alt","404");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("This is not a good look.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Try going back ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and looking again.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Or write me at ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","mailto:hello[at]aaronpetcoff[dot]me");
        var el4 = dom.createTextNode("hello [at] aaronpetcoff [dot] me");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and let me know I broke something.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 7]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],[],0,null,["loc",[null,[5,20],[5,56]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/components/post-list', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 27
              },
              "end": {
                "line": 3,
                "column": 98
              }
            },
            "moduleName": "aaronpetcoff/templates/components/post-list.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","post.title",["loc",[null,[3,84],[3,98]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 8,
                  "column": 10
                },
                "end": {
                  "line": 8,
                  "column": 77
                }
              },
              "moduleName": "aaronpetcoff/templates/components/post-list.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["content","tag",["loc",[null,[8,70],[8,77]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 8
              },
              "end": {
                "line": 9,
                "column": 8
              }
            },
            "moduleName": "aaronpetcoff/templates/components/post-list.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["block","link-to",["blog.tags",["get","tag",["loc",[null,[8,33],[8,36]]]]],["class","post-tags-tag","title",["subexpr","@mut",[["get","tag",["loc",[null,[8,65],[8,68]]]]],[],[]]],0,null,["loc",[null,[8,10],[8,89]]]]
          ],
          locals: ["tag"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "aaronpetcoff/templates/components/post-list.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","post");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h2");
          dom.setAttribute(el2,"class","post-title");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","post-date");
          var el3 = dom.createTextNode("\n      Posted ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" |\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","post-tags");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[1] = dom.createMorphAt(element1,1,1);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
          return morphs;
        },
        statements: [
          ["block","link-to",["blog.post",["get","post.slugs.self",["loc",[null,[3,50],[3,65]]]]],["title",["subexpr","@mut",[["get","post.title",["loc",[null,[3,72],[3,82]]]]],[],[]]],0,null,["loc",[null,[3,27],[3,110]]]],
          ["inline","moment-from-now",[["get","post.created",["loc",[null,[5,31],[5,43]]]]],[],["loc",[null,[5,13],[5,45]]]],
          ["block","each",[["get","post.tags",["loc",[null,[7,16],[7,25]]]]],[],1,null,["loc",[null,[7,8],[9,17]]]]
        ],
        locals: ["post"],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/components/post-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","posts",["loc",[null,[1,8],[1,13]]]]],[],0,null,["loc",[null,[1,0],[13,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/four-oh-four', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": [
              "empty-body"
            ]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 14
            }
          },
          "moduleName": "aaronpetcoff/templates/four-oh-four.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type"
          ]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/four-oh-four.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["block","not-found",[],[],0,null,["loc",[null,[1,0],[1,28]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 266
            },
            "end": {
              "line": 9,
              "column": 308
            }
          },
          "moduleName": "aaronpetcoff/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("on my blog");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("main");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","home-image");
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"src","http://gravatar.com/avatar/e3ae39ab25e0e7d0308cc1a7ebb879ab?size=250");
        dom.setAttribute(el3,"alt","Aaron Petcoff");
        dom.setAttribute(el3,"width","250");
        dom.setAttribute(el3,"height","250");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2,"class","home-lede");
        var el3 = dom.createTextNode("\n  I'm an ambitious web developer who is excited about learning new technologies, working with new people, and making the web (and the world) a better place.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("You'll currently find me at ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","http://nymag.com");
        var el4 = dom.createElement("i");
        var el5 = dom.createTextNode("New York");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" magazine");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(", where I build beautifully designed experiences and thoughtfully engineered publishing systems while contributing to open source.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("I live in Brooklyn with my partner and two cats. In my free time I enjoy reading history, sci-fi, and poetry, running in Prospect Park, and listening to records. I believe social, economic, and global justice are important. I write occasionally about what I do ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 7]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["blog"],["title","Blog"],0,null,["loc",[null,[9,266],[9,320]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/templates/talks', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "aaronpetcoff/templates/talks.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","talk");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          dom.setAttribute(el2,"class","talk-title");
          var el3 = dom.createElement("a");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","talk-details");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(", ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1, 0]);
          var element2 = dom.childAt(element0, [3]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element1, 'href');
          morphs[1] = dom.createAttrMorph(element1, 'title');
          morphs[2] = dom.createMorphAt(element1,0,0);
          morphs[3] = dom.createMorphAt(element2,0,0);
          morphs[4] = dom.createMorphAt(element2,2,2);
          return morphs;
        },
        statements: [
          ["attribute","href",["concat",[["get","talk.url",["loc",[null,[4,38],[4,46]]]]]]],
          ["attribute","title",["concat",[["get","talk.title",["loc",[null,[4,59],[4,69]]]]]]],
          ["content","talk.title",["loc",[null,[4,73],[4,87]]]],
          ["content","talk.location",["loc",[null,[5,31],[5,48]]]],
          ["inline","moment-format",[["get","talk.date",["loc",[null,[5,66],[5,75]]]],"YYYY.MM.DD"],[],["loc",[null,[5,50],[5,90]]]]
        ],
        locals: ["talk"],
        templates: []
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "aaronpetcoff/templates/talks.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"class","talk-list");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","talks",["loc",[null,[2,8],[2,13]]]]],[],0,null,["loc",[null,[2,0],[7,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('aaronpetcoff/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/adapters/repository.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/repository.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/repository.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/components/not-found.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/not-found.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/not-found.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/components/post-list.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/post-list.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/post-list.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/controllers/talks.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/talks.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/talks.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/helpers/resolver', ['exports', 'ember/resolver', 'aaronpetcoff/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('aaronpetcoff/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/helpers/start-app', ['exports', 'ember', 'aaronpetcoff/app', 'aaronpetcoff/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('aaronpetcoff/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/integration/components/not-found-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('not-found', 'Integration | Component | not found', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'not-found', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'not-found', [], [], 0, null, ['loc', [null, [2, 4], [4, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('aaronpetcoff/tests/integration/components/not-found-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/not-found-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/not-found-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/integration/components/post-list-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('posts-list', 'Integration | Component | posts list', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'posts-list', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.2.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.2.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'posts-list', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('aaronpetcoff/tests/integration/components/post-list-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/post-list-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/post-list-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/models/post.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/post.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/post.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/models/repository.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/repository.js should pass jshint', function(assert) { 
    assert.ok(false, 'models/repository.js should pass jshint.\nmodels/repository.js: line 2, col 8, \'Ember\' is defined but never used.\n\n1 error'); 
  });

});
define('aaronpetcoff/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 8, col 7, Bad line breaking before \'?\'.\n\n1 error'); 
  });

});
define('aaronpetcoff/tests/routes/blog/error.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/blog');
  QUnit.test('routes/blog/error.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/blog/error.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/blog/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/blog');
  QUnit.test('routes/blog/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/blog/index.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/blog/post.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/blog');
  QUnit.test('routes/blog/post.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/blog/post.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/blog/tags.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/blog');
  QUnit.test('routes/blog/tags.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/blog/tags.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/blog.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/blog.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/blog.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/four-oh-four.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/four-oh-four.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/four-oh-four.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/routes/talks.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/talks.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/talks.js should pass jshint.\nroutes/talks.js: line 5, col 77, Missing semicolon.\n\n1 error'); 
  });

});
define('aaronpetcoff/tests/serializers/repository.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/repository.js should pass jshint', function(assert) { 
    assert.ok(false, 'serializers/repository.js should pass jshint.\nserializers/repository.js: line 3, col 8, \'moment\' is defined but never used.\n\n1 error'); 
  });

});
define('aaronpetcoff/tests/test-helper', ['aaronpetcoff/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('aaronpetcoff/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('aaronpetcoff/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/adapters/repository-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:repository', 'Unit | Adapter | repository', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('aaronpetcoff/tests/unit/adapters/repository-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/repository-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/adapters/repository-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/controllers/talks-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:talks', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('aaronpetcoff/tests/unit/controllers/talks-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/talks-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/talks-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/models/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('post', 'Unit | Model | post', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('aaronpetcoff/tests/unit/models/post-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/post-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/post-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/models/repository-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('repository', 'Unit | Model | repository', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('aaronpetcoff/tests/unit/models/repository-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/repository-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/repository-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/blog/error-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:blog/error', 'Unit | Route | blog/error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/blog/error-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/blog');
  QUnit.test('unit/routes/blog/error-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/blog/error-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/blog/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:blog/index', 'Unit | Route | blog/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/blog/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/blog');
  QUnit.test('unit/routes/blog/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/blog/index-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/blog/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:blog/post', 'Unit | Route | blog/post', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/blog/post-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/blog');
  QUnit.test('unit/routes/blog/post-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/blog/post-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/blog/tags-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:blog/tags', 'Unit | Route | blog/tags', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/blog/tags-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/blog');
  QUnit.test('unit/routes/blog/tags-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/blog/tags-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/blog-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:blog', 'Unit | Route | blog', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/blog-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/blog-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/blog-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/four-oh-four-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:four-oh-four', 'Unit | Route | four oh four', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/four-oh-four-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/four-oh-four-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/four-oh-four-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/routes/talks-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:talks', 'Unit | Route | talks', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('aaronpetcoff/tests/unit/routes/talks-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/talks-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/talks-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/tests/unit/serializers/repository-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('repository', 'Unit | Serializer | repository', {
    // Specify the other units that are required for this test.
    needs: ['serializer:repository']
  });

  // Replace this with your real tests.
  ember_qunit.test('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

});
define('aaronpetcoff/tests/unit/serializers/repository-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/repository-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/serializers/repository-test.js should pass jshint.'); 
  });

});
define('aaronpetcoff/utils/disqus-cache', ['exports', 'ember-disqus/utils/disqus-cache'], function (exports, disqus_cache) {

	'use strict';



	exports['default'] = disqus_cache['default'];

});
define('aaronpetcoff/utils/load-disqus-api', ['exports', 'ember-disqus/utils/load-filepicker-api'], function (exports, load_filepicker_api) {

	'use strict';



	exports['default'] = load_filepicker_api['default'];

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('aaronpetcoff/config/environment', ['ember'], function(Ember) {
  var prefix = 'aaronpetcoff';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("aaronpetcoff/tests/test-helper");
} else {
  require("aaronpetcoff/app")["default"].create({"name":"aaronpetcoff","version":"0.0.0+4d5d8bff"});
}

/* jshint ignore:end */
//# sourceMappingURL=aaronpetcoff.map