---
title: 'Deploying Ember to Github Pages'
tags:
  - javascript
  - git
  - ops
  - ember
---

Deploying a project to Github pages with Ember is surprisingly easy.

In your `environment.js` set `ENV.baseURL` to the domain or (if you're not using a custom domain) repository name.

```javascript
if (environment === 'production') {
  ENV.baseURL = '/pizza-insiders-project/';
}
```

This will take care of properly linking to application and vendor scripts,styles, and other resources. For any remaining broken paths in your application, you can import your configuration settings from `your-project-name/config/environment` and set variables accordingly.

```javascript
import Ember from 'ember';
import ENV from 'your-project-name/config/environment';
// ENV contains all your applications configuration settings

export default Ember.Route.extend({
  model() {
    let prefix;

    // check the `environment` property in your configuration
    if (ENV.environment === 'development') {
      prefix = 'local/prefix';
    }

    if (ENV.environment === 'production') {
      prefix = 'remote/prefix';
    }

    return Ember.$.getJSON(`${prefix}/path/to/data`);
  }
});
```

Once you're confident your resources are linked properly according to their environment, you can checkout a Github Pages branch: `$ git checkout -b gh-pages`. Open your `.gitignore` and unignore the `dist/` folder. Finally, rebuild your application for production by running `$ ember build --env=production`.

When your app is finished building, stage all your new production files by running `$ git add --all` and committing them `$ git commit -am "init production commit"`.

We're going to only push our `dist/` file to Github Pages. For that, we'll make a subtree of our project and run `$ git subtree push --prefix dist origin gh-pages`.  You'll re-deploy every time pushing only this subtree.

If you look at your repository after pushing, you'll see only files for production were pushed.

![Ember Project on Github Pages](http://aaronpetcoff.me/img/subtree.png)

That's it. Point your browser at `username.github.io/project-name` and you'll (hopefully) see your app open right up.