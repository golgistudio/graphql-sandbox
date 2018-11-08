const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  src: resolvePath('src'),
  appHtml: resolvePath('assets/index.html'),
  appIndexJs: resolvePath('src/client/js/index.jsx'),
  appScripts: resolvePath('src/client/js'),
  assets: resolvePath('assets'),
  config: resolvePath('config'),
  destination: resolvePath('dist'),
  dotenv: resolvePath('.env'),
  modernizr: resolvePath('src/client/js/vendor/modernizr-custom.js'),
  modernizrrc: resolvePath('config/modernizrrc.json'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  publicPath: resolvePath('/'),
  root: resolvePath(''),
  store: resolvePath('src/client/js/store/index'),
  test: resolvePath('test'),
};
