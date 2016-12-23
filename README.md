__!!This module regroups [js-schema](https://www.npmjs.com/package/js-schema) and [js-schema-6901](https://github.com/richardschneider/js-schema-6901) together__


## Getting started

Install with `$ npm install sw-js-schema`.

## Usage

````
var schema = require('sw-js-schema');
var person = schema({
    name: String,
    dob: /\d{4}\-\d{2}\-\d{2}/,
    children: Array.of(schema.self)
});

var badboy = {
    name: 'me', 
    children: [
        {dob: '2000-01-01', children: []}, 
		{dob: '2000-1-01'}
]};

console.log(person.jpErrors(badboy));
````

produces

````
{ 
   '/dob': 'key is not present in the object',
   '/children/0/name': 'key is not present in the object',
   '/children/1/name': 'key is not present in the object',
   '/children/1/dob': '2000-1-01 is not matched with RegExp -> /\\d{4}\\-\\d{2}\\-\\d{2}/',
   '/children/1/children': 'key is not present in the object' }
}
````

