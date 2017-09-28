/* eslint-disable no-console */

import { create } from 'browser-sync';
import UrlPattern from 'url-pattern';
import qs from 'qs';
import { difference } from 'lodash';

import { random } from '../src/utils/random';
import getInstanceParams from './getInstanceParams';

const params = getInstanceParams(true);
const bs = create();
const mocks = [];

const defaultHeaders = Object.freeze({
  'Content-Type': 'application/json; charset=utf-8'
});

function initMock(data) {
  const mockConfig = require(`../${data.path}`).default;

  const mock = {
    urlRegexp: new UrlPattern(params.apiBasePath + mockConfig.urlPattern),
    methods: mockConfig.methods,
    _path: data.path
  };

  if (mockConfig.params) {
    mock.allParams = {};
    mock.requiredParams = {};

    Object.keys(mockConfig.params).forEach(key => {
      if (mockConfig.params[key].required) {
        mock.requiredParams[key] = mockConfig.params[key].regex;
      }
    });

    Object.keys(mockConfig.params).forEach(key => {
      mock.allParams[key] = mockConfig.params[key].regex;
    });
  }

  return mock;
}

function updateMock(data) {
  let targetMockIndex = mocks.findIndex(function (mock) {
    return mock._path === data.path;
  });

  if (targetMockIndex !== -1) {
    delete require.cache[require.resolve(`../${data.path}`)];
    mocks[targetMockIndex] = initMock(data);
  }
}

bs.emitter.on('init', function () {
  console.log('init');
});

bs.emitter.on('file:changed', function (data) {
  switch (data.event) {
    case 'add':
      mocks.push(initMock(data));
      break;
    case 'change':
      updateMock(data);
      break;
  }
});

bs.init({
  server: true,
  ui: false,
  port: 3002,
  cors: true,
  debounce: 1500,
  open: false,
  files: './src/**/*.mock.js',
  watchOptions: {
    ignoreInitial: false
  },
  middleware: function (req, res, next) {
    console.log(`requested url: ${req.url}`);
    const url = req._parsedUrl;

    const mock = mocks.find(mock => {
      if (!mock.urlRegexp || !mock.urlRegexp.match(url.pathname)) {
        return false;
      }

      if (!mock.requiredParams) {
        return true;
      }

      const query = qs.parse(url.parse(req.url).query);
      const queryKeys = Object.keys(query);
      const requiredKeys = Object.keys(mock.requiredParams);
      const allParamsKeys = Object.keys(mock.allParams);

      // all required params received
      if (difference(requiredKeys, queryKeys).length > 0) {
        return false;
      }

      // test all params format
      const testFormat = key => mock.allParams[key].test(query[key]);
      return allParamsKeys
        .map(key => !query[key] || testFormat(key))
        .reduce((prev, current) => prev && current);
    });

    if (!mock) {
      res.writeHead(404, defaultHeaders);
      res.end("Mock not found");
      return;
    }

    console.log(`mock file: ${mock._path}`);

    const mockResponse = mock.methods[req.method];

    if (!mockResponse) {
      res.writeHead(405, defaultHeaders);
      res.end("Method is not allowed");
      return;
    }

    const headers = Object.assign({}, mockResponse.headers, defaultHeaders);
    res.writeHead(mockResponse.code, headers);

    setTimeout(function () {
      let params = mock.urlRegexp.match(url.pathname);
      let queryParams = url.query && qs.parse(url.query);

      res.end(JSON.stringify(
        typeof mockResponse.body === 'function'
          ? mockResponse.body({ params, queryParams })
          : mockResponse.body
      ));
    }, random(250, 600));

    next();
  }
});
