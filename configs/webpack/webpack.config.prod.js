import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { DIST, resolvePath, SRC } from './paths';
import getInstanceParams from '../../tools/getInstanceParams';

const params = getInstanceParams();

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'global.__BASEPATH__': JSON.stringify(params.basePath),
  'global.__API__': JSON.stringify(params.apiUrl),
  __DEV__: false
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
  entry: [
    'babel-polyfill',
    `${SRC}/app.jsx`
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: params.output ? resolvePath(params.output) : DIST,
    publicPath: './',
    filename: '[name].[chunkhash:8].js'
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash:8].css'),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: `${SRC}/template.ejs`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      trackJSToken: ''
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        context: '/',
        postcss: () => [autoprefixer]
      }
    }),

    // Place app config in separate file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'config',
      filename: 'config.js',
      minChunks: Infinity
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
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap'
        )
      }
    ]
  }
};
