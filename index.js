'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action. Function to each value in the collection.
 * 
 * @param {Array or Object} The collection array over which to iterate.
 * @param {Function} The action Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identify: Returns the same value that is used as the argument.
 * 
 * @param {Function} Value: This method returns the first argument it receives.
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: Return the type of anything as a string
 * 
 * @param {function} Value: Returns a string value of the given operand
 */
function typeOf(value) {
    if(value === null) return 'null';
    if(value instanceof Date) return 'date';
    if(Array.isArray(value)) return 'array';
    return typeof value;
}
module.exports.typeOf = typeOf;

/**
 * first: Returns the first element of an array. 
 * Passing number will return the first number elements of the array.
 * 
 * @param {Array} Checks if array is an array and returns an array.
 * @param {Number} Identify if number is a number, if not return first element.
 * If it is a number, return first number items of the array.
 */
function first(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined || typeof n !== 'number' || n === 1) return array[0];
    return array.slice(0, n);
}
module.exports.first = first;

/**
 * last: Returns the last element of an array. 
 * Passing number will return the last number elements of the array.
 * 
 * @param {Array} Checks if array is an array and returns an array.
 * @param {number} Identify if number is a number, if not return last element.
 * If it is a number, return the last number items of the array.
 */
function last(array, n) {
    if (!Array.isArray(array) || n < 0) return [];
    if (n === undefined || typeof n !== 'number' || n === 1) 
        return array[array.length - 1];
    if (n > array.length) return array;
    return array.slice(array.length - n);
}
module.exports.last = last;

/**
 * indexOf: Returns the index at which value can be found in the array, 
 * or -1 if value is not present in the array. 
 * If you're working with a large array, and you know that the array is already 
 * sorted, 
 * pass true for isSorted to use a faster binary search ... 
 * or, pass a number as the third argument in order to look 
 * for the first matching value in the array after the given index.
 * 
 * @param {Array} Iterate over the array, if a value can be found return index, 
 * if not return -1. 
 * @param {Value} 
 */ 
function indexOf(array, value) {
    return array.indexOf(value);
}
module.exports.indexOf= indexOf;

/**
 * filter: Looks through each value in the list, 
 * returning an array of all the values that pass a truth test (boolean).
 * 
 * @param {Array} Iterate over the array
 * @param {Function} Takes an action and returns an array with the values are 
 * true.
 */
function filter(array, action) {
    var output = [];
    for (var i = 0; i < array.length; i++) {
        if (action(array[i], i, array)) output.push(array[i]);
    }
    return output;
}
module.exports.filter = filter;

/**
 * reject: Looks through each value in the last,
 * returning an array of all the values that do not pass true (boolean).
 * 
 * @param {Array} Iterate over the array
 * @param {Function} Takes an action and returns an array with the values that 
 * do not return true. 
 */
function reject(array, action) {
    var output = [];
    for (var i = 0; i < array.length; i++) {
        if (action(array[i], i, array) === false) output.push(array[i]);
    }
    return output;
}
module.exports.reject = reject;

/**
 * partition: Split array into two arrays: one whose elements 
 * all satisfy predicate and one whose elements all do not satisfy predicate.
 * 
 * @param {Array} Iterate over the array
 * @param {Function} Push values that are truthy in one subarray, and falsey in 
 * another subarray.
 */
function partition(array, action) {
    var output = [];
    output.push(filter(array, action));
    output.push(reject(array, action));
    return output;
}
module.exports.partition = partition;

/**
 * unique: Produces a duplicate-free version of the array, using === to test 
 * object equality.
 * 
 * @param {Array} Iterate over the array
 * @param {Function} Using indexOf, return an array with elements from original 
 * array, with duplicates removed
 */
function unique(array) {
    var output = array.filter(function(elements, index, collection) {
    return index === collection.indexOf(elements);
    });
    return output;
}
module.exports.unique = unique;

/**
 * map: Transforms an array by running element in collection thru iteratee. 
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * 
 * @param {Array} Iterate over the array
 * @param {Function} Transforms the array by implementing each to the array,and 
 * pushes the elements to the new transformed array.
 */
function map(array, transform) {
    const transformed = [];
    each(array, function(value, i, array) {
        transformed.push(transform(value, i, array));
    });
    return transformed;
}
module.exports.map = map;

/**
 * pluck: A convenient version of what is perhaps the most common use-case for 
 * map: extracting a list of property values.
 * 
 * @param {arrayOfObjects} Implement map to transform an array of objects.
 * @param {Property} Use function to extract the property values from the array
 */
function pluck(arrayOfObjects, key) {
     return map(arrayOfObjects, function(object) {
         return object[key];
     });
}
module.exports.pluck = pluck;

/**
 * contains: Returns true if the value is present in the list. Uses indexOf 
 * internally, if list is an Array. 
 * 
 * @param {Array} Loop through the array
 * @param {Value} If the arrary contains value, return true. Return false if 
 * no value given.
 */
function contains(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return true;
    }
    return false;
}
module.exports.contains = contains;

/**
 * every: Returns true if all of the values in the list pass the predicate
 * truth test. 
 * 
 * @param {Collection} Loop to see if collection is an array or an object or 
 * @param {Function} If items in the collection pass as true, return true
 * If items pass as false, return false.
 */
function every(collection, test) {
    if (!test) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === true) {
                return true;
            }
        }
        return false;
    }
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (test(collection[i], i, collection) === false) {
                return false;
            }
        }
    }
    else {
        for (var key in collection) {
            if (test(collection[key], key, collection) === false) {
                return false;
            }
        }
    }
    return true;
}
module.exports.every = every;

/**
 * some: Returns true if any of the values in the list pass the predicate truth 
 * test.
 * 
 * @param {Collection} Loop to check if collection is an array or object.
 * @param {Test} If items in the collection pass as false, return false
 * If items pass as true, return true. 
 */
function some(collection, test) {
    if (!test) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === true) {
                return true;
            }
        }
        return false;
    }
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (test(collection[i], i, collection) === true) {
                return true;
            }
        }
    }
    else {
        for (var key in collection) {
            if (test(collection[key], key, collection) === true) {
                return true;
            }
        }
    }
    return false;
}
module.exports.some = some;

/**
 * reduce:  
 * 
 * @param {Array} 
 * @param {Summarize}
 * @param {StartValue} Assign start value to let variable
 */
function reduce(array, summarize, startValue) {
    let 
        summary = startValue,
        i = 0;
        
    if (startValue === undefined) {
        summary = array[0];
        i = 1;
    }

    for (; i < array.length; i++) {
        summary = summarize(summary, array[i], i, array);
    }
    
    return summary;
}
module.exports.reduce = reduce;

/**
 * extend: Shallowly copy all of the properties in the source objects over to 
 * the destination object, and return the destination object.
 * 
 * @param {Object} Loops over properties in an object.
 * @param {Object} Copies all the properties in the source object with no 
 * duplicates.
 */
function extend(copyTo) {
    const copyFromObjects = Array.prototype.slice.call(arguments, 1);
    
    // 1. loop over array of copyFromObjects //
    // 2. each copyFrom is an object, so loop of the object, 
    // 3. use array syntax to add to the copyTo object, the key/value pairs 
     //from the copyFrom
    for(let i = 0; i < copyFromObjects.length; i++) {
        let copyFromObject = copyFromObjects[i];
        for(let key in copyFromObject) {
            copyTo[key] = copyFromObject[key];
        }
    }
    return copyTo;   
}
module.exports.extend = extend;