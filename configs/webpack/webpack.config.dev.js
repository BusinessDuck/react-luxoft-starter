import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { DIST, resolvePath, SRC } from './paths';
import getInstanceParams from '../../tools/getInstanceParams';

const params = getInstanceParams(true);

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'global.__BASEPATH__': JSON.stringify(params.basePath),
  'global.__API__': JSON.stringify(params.apiUrl),
  __DEV__: true
};

export default {
  resolve: {
    extensions: [
      '*', '.json',
      '.js', '.jsx',
      '.scss', '.css'
    ],
    modules: [
      SRC,
      'node_modules'
    ]
  },
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: [
    // must be first entry to properly set public path
    `${SRC}/webpack-public-path`,
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    `${SRC}/app.jsx` // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: params.output ? resolvePath(params.output) : DIST,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: `${SRC}/template.ejs`,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        context: '/',
        postcss: () => [autoprefixer]
      }
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.eot$/, loader: 'file-loader?mimetype=application/vnd.ms-fontobject&name=[name].[hash:8].[ext]' },
      { test: /\.woff$/, loader: 'file-loader?mimetype=application/font-woff&name=[name].[hash:8].[ext]' },
      { test: /\.woff2$/, loader: 'file-loader?mimetype=application/font-woff2&name=[name].[hash:8].[ext]' },
      { test: /\.[ot]tf$/, loader: 'file-loader?mimetype=application/octet-stream&name=[name].[hash:8].[ext]' },
      { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'url-loader?limit=10000&name=[name].[hash:8].[ext]' },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /asComponent/,
            loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader'
          },
          {
            loader: 'url-loader?limit=10000&name=[name].[hash:8].[ext]'
          }
        ]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: [
          'style-loader', 'css-loader?sourceMap', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap'
        ]
      }
    ]
  }
};
