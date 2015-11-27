'use strict';

import express from 'express';
import compress from 'compression';
import logger from 'morgan';
import path from 'path';
import api from './api';
import feed from './feed';

let app = express(),
  listener;

// start logging
app.use(logger('common'));

// gzip static assets
app.use(compress());

// start web server
listener = app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
app.use(express.static(`${__dirname}/dist`));

// prefix all routes with api & version
app.get('/api/v1/*', (req, res, next) => {
  res.header('Content-Type', 'application/vnd.api+json');
  next();
});

// temp redirect to non-fingerprinted dir
app.get('/jsgeo.pdf', (req, res) => {
  res.redirect(301, '/static/jsgeo.pdf');
});

app.use('/api/v1', api);
app.use('/feed', feed);

app.get('/', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.get('*', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});
