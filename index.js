'use strict';

let schema = require('./lib/schema');

// Patterns
require('./lib/patterns/reference');
require('./lib/patterns/nothing');
require('./lib/patterns/anything');
require('./lib/patterns/object');
require('./lib/patterns/or');
require('./lib/patterns/equality');
require('./lib/patterns/regexp');
require('./lib/patterns/class');
require('./lib/patterns/schema');

// Extensions
require('./lib/extensions/Boolean');
require('./lib/extensions/Number');
require('./lib/extensions/String');
require('./lib/extensions/Object');
require('./lib/extensions/Array');
require('./lib/extensions/Function');
require('./lib/extensions/Schema');


var flatten = require('./lib/flatten');

/**
 * Return errors that are flatten to JSON Pointer references.
 *
 * @param(errs) errors from js-schema.
 */

var jpErrors = function (errs, options) {
    if (!errs) return errs;
    options = options || {};
    options.delimiter = options.delimiter || '/';
    return flatten(errs, options);
};

schema.Schema.prototype.publicFunctions = ['jpErrors'];
schema.Schema.prototype.jpErrors = function (instance, options) {
    return jpErrors(this.validate.errors(instance), options);
};

module.exports = {schema: schema};
