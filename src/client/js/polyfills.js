/*eslint-disable no-console, no-var, vars-on-top, func-names, prefer-destructuring */
/**
 * @module Polyfills
 * @desc Add support for older browsers.
 */
import '@babel/polyfill';
import 'classlist-polyfill';
import 'isomorphic-fetch';
import 'events-polyfill/src/constructors/Event';

require('es6-promise').polyfill();
