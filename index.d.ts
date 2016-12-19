// Type definitions for js-schema
// Project: https://github.com/molnarg/js-schema
// Definitions by: Marcin Porebski <https://github.com/marcinporebski>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


interface Validator {
    (obj: any): boolean; // test obj against the schema
    errors(obj: any): false | Object;
    jpErrors(obj: any): false | Object;
    toJSON(): Object;
    unwrap(): Object;
    schema:this
}


interface schema {
    (definitions: any): Validator; // test obj against the schema
    fromJSON(json: any): false | Validator
}

export var schema: schema;