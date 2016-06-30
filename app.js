'use strict';

import express from 'express';
import fastboot from 'fastboot-express-middleware';
import compress from 'compression';
import logger from 'morgan';
import path from 'path';
import api from './api';
import feed from './feed';

const port = process.env.PORT || 3000;

let app = express();

// start logging
app.use(logger('common'));

// gzip static assets
app.use(compress());

app.use(express.static(`${__dirname}/dist`));

if (process.env.NODE_ENV !== 'production') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

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

app.get('/*', fastboot(__dirname + '/dist'));
app.listen(port, function () {
  console.log('Fastboot app listening on ' + port);
});
