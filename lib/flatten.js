var isBuffer = require('is-buffer');

flatten.flatten = flatten;
flatten.unflatten = unflatten;

function flatten(target, opts) {
    opts = opts || {};

    var delimiter = opts.delimiter || '.',
        maxDepth = opts.maxDepth;

    function flattenKeyname(prev, key) {
        return prev ? prev + delimiter + key : key;
    };

    var keyname = opts.keyname || flattenKeyname,
        output = {};

    function step(object, prev, currentDepth) {
        currentDepth = currentDepth ? currentDepth : 1;
        Object.keys(object).forEach(function (key) {
            var value = object[key],
                isarray = opts.safe && Array.isArray(value),
                type = Object.prototype.toString.call(value),
                isbuffer = isBuffer(value),
                isobject = (
                    type === "[object Object]" ||
                    type === "[object Array]"
                ),
                newKey = keyname(prev, key);
            if (!isarray && !isbuffer && isobject && Object.keys(value).length && (!opts.maxDepth || currentDepth < maxDepth)) {
                return step(value, newKey, currentDepth + 1);
            }
            output[newKey] = value;
        });
    };

    step(target);

    return output;
};

function unflatten(target, opts) {
    opts = opts || {}

    var delimiter = opts.delimiter || '.',
        overwrite = opts.overwrite || false,
        result = {},
        isbuffer = isBuffer(target);

    if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]')
        return target;

    function unflattenKeyname(key) {
        return key.split(delimiter);
    };

    var keynames = opts.keynames || unflattenKeyname;

    function getkey(key) {
        var parsedKey = Number(key);
        return (isNaN(parsedKey) || key.indexOf('.') !== -1) ? key : parsedKey;
    };

    Object.keys(target).forEach(function (key) {
        var split = keynames(key),
            key1 = getkey(split.shift()),
            key2 = getkey(split[0]),
            recipient = result;

        while (key2 !== undefined) {
            var type = Object.prototype.toString.call(recipient[key1]),
                isobject = (
                    type === "[object Object]" ||
                    type === "[object Array]"
                );

            // do not write over falsey, non-undefined values if overwrite is false
            if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined')
                return;

            if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null))
                recipient[key1] = typeof key2 === 'number' && !opts.object ? [] : {};

            recipient = recipient[key1];

            if (split.length > 0)
                key1 = getkey(split.shift()), key2 = getkey(split[0]);
        }

        // unflatten again for 'messy objects'
        recipient[key1] = unflatten(target[key], opts);
    });

    return result;
};


module.exports = flatten;