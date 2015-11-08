/* jshint node: true */
'use strict';

import express from 'express';
import path from 'path';
import compress from 'compression';
import logger from 'morgan';
import server from './lib/server';
import Promise from 'bluebird';
import Feed from 'feed';
import _ from 'lodash';
import api from './api';

let app = express(),
  listener;

// start logging
app.use(logger('common'));

// gzip static assets
app.use(compress());

// start web server
listener = app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
app.use(express.static(`${__dirname}/dist/`));

// prefix all routes with api & version
app.get('/api/v1/*', (req, res, next) => {
  res.header('Content-Type', 'application/vnd.api+json');
  next();
});
app.use('/api/v1', api);

app.get('/', function(req, res) {
  res.sendFile('dist/index.html', {root: __dirname});
});

app.get('*', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});
