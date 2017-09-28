// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from "proxy-middleware";
import config from '../configs/webpack/webpack.config.dev';
import url from "url";
import getParams from "./getInstanceParams";

const bundler = webpack(config);
const args = getParams(true);

// Run Browsersync and use middleware for Hot Module Replacement
const bsConfig = {
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'src',

    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: false,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
};

//Add proxy to api when it passed as argument proxyUrl
if(args.proxyUrl){
  const proxyOptions = url.parse(args.proxyUrl);
  proxyOptions.route = '/api';
  bsConfig.server.middleware.unshift(proxy(proxyOptions));
}

browserSync(bsConfig);
