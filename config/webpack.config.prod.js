/* eslint-disable  func-names, no-param-reassign prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const getClientEnvironment = require('./env');
const paths = require('./paths');
const webpackConfig = require('./webpack.config.base');

const NPMPackage = require(paths.packageJson);

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

let GITHASH = '';
const definePlugin = webpackConfig.plugins.find((d) => d.constructor.name === 'DefinePlugin');
if (definePlugin) {
  GITHASH = definePlugin.definitions.GITHASH ? definePlugin.definitions.GITHASH.replace(/"/g, '') : '';
}

module.exports = merge.smart(webpackConfig, {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  entry: {
    'js/modernizr': paths.modernizr,
    'js/app': paths.appIndexJs,
  },
  output: {
    chunkFilename: 'js/[name].[git-hash].js',
    filename: '[name].[git-hash].js',
    path: paths.destination,
    publicPath,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: {
            // we want uglify-js to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
          },
          mangle: {
            safari10: true,
            keep_fnames: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { map: { inline: false } },
      }),
    ],
  },
  plugins: [
    new CleanPlugin(['dist'], { root: paths.root }),
    new CopyPlugin([
      { from: '../assets/manifest.json' },
      { from: '../src/.htaccess' },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/app.[git-hash].css',
      chunkFilename: 'styles/app.[git-hash].chunk.css',
    }),
    new HtmlPlugin({
      githash: GITHASH,
      inject: false,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: './index.ejs',
      title: NPMPackage.title,
    }),
    new InterpolateHtmlPlugin(env.raw),
    new LodashModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new OfflinePlugin({
      autoUpdate: true,
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
      },
      AppCache: {
        events: true,
      },
      caches: {
        main: [
          '**/*.js',
          '**/*.css',
          'index.html',
        ],
        additional: [
          'fonts/*.woff',
          'fonts/*.ttf',
          'fonts/*.svg',
        ],
        optional: [
          ':rest:',
        ],
      },
      cacheMaps: [
        {
          match: function () {
            return new URL('/', location);
          },
          requestTypes: ['navigate'],
        },
      ],
    }),
  ],
});
