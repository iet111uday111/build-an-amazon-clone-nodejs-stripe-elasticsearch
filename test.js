const async = require('async');

var async = require("async");

var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};

async.forEachOf(obj, (value, key, callback) => {
    fs.readFile(__dirname + value, "utf8", (err, data) => {
        if (err) return callback(err);
        try {
            configs[key] = JSON.parse(data);
        } catch (e) {
            return callback(e);
        }
        callback();
    });
}, err => {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
    doSomethingWith(configs);
});

/**
 * async
Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm install --save async, it can also be used directly in the browser.

Source:
index.js, line 40
See:
AsyncFunction
Collections
A collection of async functions for manipulating collections, such as arrays and objects.

Source:
index.js, line 50
Methods
concat(coll, iteratee, callback(err)opt)
import concat from 'async/concat';
Applies iteratee to each item in coll, concatenating the results. Returns the concatenated list. The iteratees are called in parallel, and the results are concatenated as they return. There is no guarantee that the results array will be returned in the original order of coll passed to the iteratee function.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
A function to apply to each item in coll, which should use an array as its result. Invoked with (item, callback).

callback(err)	function <optional>	
A callback which is called after all the iteratee functions have finished, or an error occurs. Results is an array containing the concatenated results of the iteratee function. Invoked with (err, results).

Example
async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
    // files is now a list of filenames that exist in the 3 directories
});
Source:
concat.js, line 4
concatLimit(coll, limit, iteratee, callbackopt)
import concatLimit from 'async/concatLimit';
The same as concat but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
A function to apply to each item in coll, which should use an array as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished, or an error occurs. Results is an array containing the concatenated results of the iteratee function. Invoked with (err, results).

Source:
concatLimit.js, line 8
See:
async.concat

concatSeries(coll, iteratee, callback(err)opt)
import concatSeries from 'async/concatSeries';
The same as concat but runs only a single async operation at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
A function to apply to each item in coll. The iteratee should complete with an array an array of results. Invoked with (item, callback).

callback(err)	function <optional>	
A callback which is called after all the iteratee functions have finished, or an error occurs. Results is an array containing the concatenated results of the iteratee function. Invoked with (err, results).

Source:
concatSeries.js, line 4
See:
async.concat

detect(coll, iteratee, callbackopt)
import detect from 'async/detect';
Returns the first value in coll that passes an async truth test. The iteratee is applied in parallel, meaning the first iteratee to return true will fire the detect callback with that result. That means the result might not be the first item in the original coll (in terms of order) that passes the test. If order within the original coll is important, then look at detectSeries.

Alias:
find
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
A truth test to apply to each item in coll. The iteratee must complete with a boolean value as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished. Result will be the first item in the array that passes the truth test (iteratee) or the value undefined if none passed. Invoked with (err, result).

Example
async.detect(['file1','file2','file3'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, result) {
    // result now equals the first file in the list that exists
});
Source:
detect.js, line 7
detectLimit(coll, limit, iteratee, callbackopt)
import detectLimit from 'async/detectLimit';
The same as detect but runs a maximum of limit async operations at a time.

Alias:
findLimit
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
A truth test to apply to each item in coll. The iteratee must complete with a boolean value as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished. Result will be the first item in the array that passes the truth test (iteratee) or the value undefined if none passed. Invoked with (err, result).

Source:
detectLimit.js, line 7
See:
async.detect

detectSeries(coll, iteratee, callbackopt)
import detectSeries from 'async/detectSeries';
The same as detect but runs only a single async operation at a time.

Alias:
findSeries
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
A truth test to apply to each item in coll. The iteratee must complete with a boolean value as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished. Result will be the first item in the array that passes the truth test (iteratee) or the value undefined if none passed. Invoked with (err, result).

Source:
detectSeries.js, line 4
See:
async.detect

each(coll, iteratee, callbackopt)
import each from 'async/each';
Applies the function iteratee to each item in coll, in parallel. The iteratee is called with an item from the list, and a callback for when it has finished. If the iteratee passes an error to its callback, the main callback (for the each function) is immediately called with the error.

Note, that since this function applies iteratee to each item in parallel, there is no guarantee that the iteratee functions will complete in order.

Alias:
forEach
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. Invoked with (item, callback). The array index is not passed to the iteratee. If you need the index, use eachOf.

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).

Example
// assuming openFiles is an array of file names and saveFile is a function
// to save the modified contents of that file:

async.each(openFiles, saveFile, function(err){
  // if any of the saves produced an error, err would equal that error
});

// assuming openFiles is an array of file names
async.each(openFiles, function(file, callback) {

    // Perform operation on file here.
    console.log('Processing file ' + file);

    if( file.length > 32 ) {
      console.log('This file name is too long');
      callback('File name too long');
    } else {
      // Do work to process file here
      console.log('File processed');
      callback();
    }
}, function(err) {
    // if any of the file processing produced an error, err would equal that error
    if( err ) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file failed to process');
    } else {
      console.log('All files have been processed successfully');
    }
});
Source:
each.js, line 5
eachLimit(coll, limit, iteratee, callbackopt)
import eachLimit from 'async/eachLimit';
The same as each but runs a maximum of limit async operations at a time.

Alias:
forEachLimit
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The array index is not passed to the iteratee. If you need the index, use eachOfLimit. Invoked with (item, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).

Source:
eachLimit.js, line 5
See:
async.each

eachOf(coll, iteratee, callbackopt)
import eachOf from 'async/eachOf';
Like each, except that it passes the key (or index) as the second argument to the iteratee.

Alias:
forEachOf
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
A function to apply to each item in coll. The key is the item's key, or index in the case of an array. Invoked with (item, key, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).

Example
var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};

async.forEachOf(obj, function (value, key, callback) {
    fs.readFile(__dirname + value, "utf8", function (err, data) {
        if (err) return callback(err);
        try {
            configs[key] = JSON.parse(data);
        } catch (e) {
            return callback(e);
        }
        callback();
    });
}, function (err) {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
    doSomethingWith(configs);
});
Source:
eachOf.js, line 37
See:
async.each

eachOfLimit(coll, limit, iteratee, callbackopt)
import eachOfLimit from 'async/eachOfLimit';
The same as eachOf but runs a maximum of limit async operations at a time.

Alias:
forEachOfLimit
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The key is the item's key, or index in the case of an array. Invoked with (item, key, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).

Source:
eachOfLimit.js, line 4
See:
async.eachOf

eachOfSeries(coll, iteratee, callbackopt)
import eachOfSeries from 'async/eachOfSeries';
The same as eachOf but runs only a single async operation at a time.

Alias:
forEachOfSeries
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. Invoked with (item, key, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).

Source:
eachOfSeries.js, line 4
See:
async.eachOf

eachSeries(coll, iteratee, callbackopt)
import eachSeries from 'async/eachSeries';
The same as each but runs only a single async operation at a time.

Alias:
forEachSeries
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The array index is not passed to the iteratee. If you need the index, use eachOfSeries. Invoked with (item, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).

Source:
eachSeries.js, line 4
See:
async.each

every(coll, iteratee, callbackopt)
import every from 'async/every';
Returns true if every element in coll satisfies an async test. If any iteratee call returns false, the main callback is immediately called.

Alias:
all
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async truth test to apply to each item in the collection in parallel. The iteratee must complete with a boolean result value. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Result will be either true or false depending on the values of the async tests. Invoked with (err, result).

Example
async.every(['file1','file2','file3'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, result) {
    // if result is true then every file exists
});
Source:
every.js, line 5
everyLimit(coll, limit, iteratee, callbackopt)
import everyLimit from 'async/everyLimit';
The same as every but runs a maximum of limit async operations at a time.

Alias:
allLimit
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async truth test to apply to each item in the collection in parallel. The iteratee must complete with a boolean result value. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Result will be either true or false depending on the values of the async tests. Invoked with (err, result).

Source:
everyLimit.js, line 5
See:
async.every

everySeries(coll, iteratee, callbackopt)
import everySeries from 'async/everySeries';
The same as every but runs only a single async operation at a time.

Alias:
allSeries
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async truth test to apply to each item in the collection in series. The iteratee must complete with a boolean result value. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Result will be either true or false depending on the values of the async tests. Invoked with (err, result).

Source:
everySeries.js, line 4
See:
async.every

filter(coll, iteratee, callbackopt)
import filter from 'async/filter';
Returns a new array of all the values in coll which pass an async truth test. This operation is performed in parallel, but the results array will be in the same order as the original.

Alias:
select
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	function	
A truth test to apply to each item in coll. The iteratee is passed a callback(err, truthValue), which must be called with a boolean argument once it has completed. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Invoked with (err, results).

Example
async.filter(['file1','file2','file3'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, results) {
    // results now equals an array of the existing files
});
Source:
filter.js, line 4
filterLimit(coll, limit, iteratee, callbackopt)
import filterLimit from 'async/filterLimit';
The same as filter but runs a maximum of limit async operations at a time.

Alias:
selectLimit
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	function	
A truth test to apply to each item in coll. The iteratee is passed a callback(err, truthValue), which must be called with a boolean argument once it has completed. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Invoked with (err, results).

Source:
filterLimit.js, line 4
See:
async.filter

filterSeries(coll, iteratee, callbackopt)
import filterSeries from 'async/filterSeries';
The same as filter but runs only a single async operation at a time.

Alias:
selectSeries
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	function	
A truth test to apply to each item in coll. The iteratee is passed a callback(err, truthValue), which must be called with a boolean argument once it has completed. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Invoked with (err, results)

Source:
filterSeries.js, line 4
See:
async.filter

groupBy(coll, iteratee, callbackopt)
import groupBy from 'async/groupBy';
Returns a new object, where each value corresponds to an array of items, from coll, that returned the corresponding key. That is, the keys of the object correspond to the values passed to the iteratee callback.

Note: Since this function applies the iteratee to each item in parallel, there is no guarantee that the iteratee functions will complete in order. However, the values for each key in the result will be in the same order as the original coll. For Objects, the values will roughly be in the order of the original Objects' keys (but this can vary across JavaScript engines).

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with a key to group the value under. Invoked with (value, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Result is an Object whoses properties are arrays of values which returned the corresponding key.

Example
async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
    db.findById(userId, function(err, user) {
        if (err) return callback(err);
        return callback(null, user.age);
    });
}, function(err, result) {
    // result is object containing the userIds grouped by age
    // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
});
Source:
groupBy.js, line 4
groupByLimit(coll, limit, iteratee, callbackopt)
import groupByLimit from 'async/groupByLimit';
The same as groupBy but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with a key to group the value under. Invoked with (value, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Result is an Object whoses properties are arrays of values which returned the corresponding key.

Source:
groupByLimit.js, line 4
See:
async.groupBy

groupBySeries(coll, limit, iteratee, callbackopt)
import groupBySeries from 'async/groupBySeries';
The same as groupBy but runs only a single async operation at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with a key to group the value under. Invoked with (value, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Result is an Object whoses properties are arrays of values which returned the corresponding key.

Source:
groupBySeries.js, line 4
See:
async.groupBy

map(coll, iteratee, callbackopt)
import map from 'async/map';
Produces a new collection of values by mapping each value in coll through the iteratee function. The iteratee is called with an item from coll and a callback for when it has finished processing. Each of these callback takes 2 arguments: an error, and the transformed item from coll. If iteratee passes an error to its callback, the main callback (for the map function) is immediately called with the error.

Note, that since this function applies the iteratee to each item in parallel, there is no guarantee that the iteratee functions will complete in order. However, the results array will be in the same order as the original coll.

If map is passed an Object, the results will be an Array. The results will roughly be in the order of the original Objects' keys (but this can vary across JavaScript engines).

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with the transformed item. Invoked with (item, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Results is an Array of the transformed items from the coll. Invoked with (err, results).

Example
async.map(['file1','file2','file3'], fs.stat, function(err, results) {
    // results is now an array of stats for each file
});
Source:
map.js, line 4
mapLimit(coll, limit, iteratee, callbackopt)
import mapLimit from 'async/mapLimit';
The same as map but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with the transformed item. Invoked with (item, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Results is an array of the transformed items from the coll. Invoked with (err, results).

Source:
mapLimit.js, line 4
See:
async.map

mapSeries(coll, iteratee, callbackopt)
import mapSeries from 'async/mapSeries';
The same as map but runs only a single async operation at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with the transformed item. Invoked with (item, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. Results is an array of the transformed items from the coll. Invoked with (err, results).

Source:
mapSeries.js, line 4
See:
async.map

mapValues(obj, iteratee, callbackopt)
import mapValues from 'async/mapValues';
A relative of map, designed for use with objects.

Produces a new Object by mapping each value of obj through the iteratee function. The iteratee is called each value and key from obj and a callback for when it has finished processing. Each of these callbacks takes two arguments: an error, and the transformed item from obj. If iteratee passes an error to its callback, the main callback (for the mapValues function) is immediately called with the error.

Note, the order of the keys in the result is not guaranteed. The keys will be roughly in the order they complete, (but this is very engine-specific)

Parameters:
Name	Type	Description
obj	Object	
A collection to iterate over.

iteratee	AsyncFunction	
A function to apply to each value and key in coll. The iteratee should complete with the transformed value as its result. Invoked with (value, key, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. result is a new object consisting of each key from obj, with each transformed value on the right-hand side. Invoked with (err, result).

Example
async.mapValues({
    f1: 'file1',
    f2: 'file2',
    f3: 'file3'
}, function (file, key, callback) {
  fs.stat(file, callback);
}, function(err, result) {
    // result is now a map of stats for each file, e.g.
    // {
    //     f1: [stats for file1],
    //     f2: [stats for file2],
    //     f3: [stats for file3]
    // }
});
Source:
mapValues.js, line 5
mapValuesLimit(obj, limit, iteratee, callbackopt)
import mapValuesLimit from 'async/mapValuesLimit';
The same as mapValues but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
obj	Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
A function to apply to each value and key in coll. The iteratee should complete with the transformed value as its result. Invoked with (value, key, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. result is a new object consisting of each key from obj, with each transformed value on the right-hand side. Invoked with (err, result).

Source:
mapValuesLimit.js, line 7
See:
async.mapValues

mapValuesSeries(obj, iteratee, callbackopt)
import mapValuesSeries from 'async/mapValuesSeries';
The same as mapValues but runs only a single async operation at a time.

Parameters:
Name	Type	Description
obj	Object	
A collection to iterate over.

iteratee	AsyncFunction	
A function to apply to each value and key in coll. The iteratee should complete with the transformed value as its result. Invoked with (value, key, callback).

callback	function <optional>	
A callback which is called when all iteratee functions have finished, or an error occurs. result is a new object consisting of each key from obj, with each transformed value on the right-hand side. Invoked with (err, result).

Source:
mapValuesSeries.js, line 4
See:
async.mapValues

reduce(coll, memo, iteratee, callbackopt)
import reduce from 'async/reduce';
Reduces coll into a single value using an async iteratee to return each successive step. memo is the initial state of the reduction. This function only operates in series.

For performance reasons, it may make sense to split a call to this function into a parallel map, and then use the normal Array.prototype.reduce on the results. This function is for situations where each step in the reduction needs to be async; if you can get the data before reducing it, then it's probably a good idea to do so.

Alias:
foldl
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

memo	*	
The initial state of the reduction.

iteratee	AsyncFunction	
A function applied to each item in the array to produce the next step in the reduction. The iteratee should complete with the next state of the reduction. If the iteratee complete with an error, the reduction is stopped and the main callback is immediately called with the error. Invoked with (memo, item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Result is the reduced value. Invoked with (err, result).

Example
async.reduce([1,2,3], 0, function(memo, item, callback) {
    // pointless async:
    process.nextTick(function() {
        callback(null, memo + item)
    });
}, function(err, result) {
    // result is now equal to the last value of memo, which is 6
});
Source:
reduce.js, line 6
reduceRight(array, memo, iteratee, callbackopt)
import reduceRight from 'async/reduceRight';
Same as reduce, only operates on array in reverse order.

Alias:
foldr
Parameters:
Name	Type	Description
array	Array	
A collection to iterate over.

memo	*	
The initial state of the reduction.

iteratee	AsyncFunction	
A function applied to each item in the array to produce the next step in the reduction. The iteratee should complete with the next state of the reduction. If the iteratee complete with an error, the reduction is stopped and the main callback is immediately called with the error. Invoked with (memo, item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Result is the reduced value. Invoked with (err, result).

Source:
reduceRight.js, line 4
See:
async.reduce

reject(coll, iteratee, callbackopt)
import reject from 'async/reject';
The opposite of filter. Removes values that pass an async truth test.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	function	
An async truth test to apply to each item in coll. The should complete with a boolean value as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Invoked with (err, results).

Example
async.reject(['file1','file2','file3'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, results) {
    // results now equals an array of missing files
    createFiles(results);
});
Source:
reject.js, line 4
See:
async.filter

rejectLimit(coll, limit, iteratee, callbackopt)
import rejectLimit from 'async/rejectLimit';
The same as reject but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	function	
An async truth test to apply to each item in coll. The should complete with a boolean value as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Invoked with (err, results).

Source:
rejectLimit.js, line 4
See:
async.reject

rejectSeries(coll, iteratee, callbackopt)
import rejectSeries from 'async/rejectSeries';
The same as reject but runs only a single async operation at a time.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	function	
An async truth test to apply to each item in coll. The should complete with a boolean value as its result. Invoked with (item, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Invoked with (err, results).

Source:
rejectSeries.js, line 4
See:
async.reject

some(coll, iteratee, callbackopt)
import some from 'async/some';
Returns true if at least one element in the coll satisfies an async test. If any iteratee call returns true, the main callback is immediately called.

Alias:
any
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async truth test to apply to each item in the collections in parallel. The iteratee should complete with a boolean result value. Invoked with (item, callback).

callback	function <optional>	
A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished. Result will be either true or false depending on the values of the async tests. Invoked with (err, result).

Example
async.some(['file1','file2','file3'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, result) {
    // if result is true then at least one of the files exists
});
Source:
some.js, line 5
someLimit(coll, limit, iteratee, callbackopt)
import someLimit from 'async/someLimit';
The same as some but runs a maximum of limit async operations at a time.

Alias:
anyLimit
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
An async truth test to apply to each item in the collections in parallel. The iteratee should complete with a boolean result value. Invoked with (item, callback).

callback	function <optional>	
A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished. Result will be either true or false depending on the values of the async tests. Invoked with (err, result).

Source:
someLimit.js, line 5
See:
async.some

someSeries(coll, iteratee, callbackopt)
import someSeries from 'async/someSeries';
The same as some but runs only a single async operation at a time.

Alias:
anySeries
Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async truth test to apply to each item in the collections in series. The iteratee should complete with a boolean result value. Invoked with (item, callback).

callback	function <optional>	
A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished. Result will be either true or false depending on the values of the async tests. Invoked with (err, result).

Source:
someSeries.js, line 4
See:
async.some

sortBy(coll, iteratee, callback)
import sortBy from 'async/sortBy';
Sorts a list by the results of running each coll value through an async iteratee.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

iteratee	AsyncFunction	
An async function to apply to each item in coll. The iteratee should complete with a value to use as the sort criteria as its result. Invoked with (item, callback).

callback	function	
A callback which is called after all the iteratee functions have finished, or an error occurs. Results is the items from the original coll sorted by the values returned by the iteratee calls. Invoked with (err, results).

Example
async.sortBy(['file1','file2','file3'], function(file, callback) {
    fs.stat(file, function(err, stats) {
        callback(err, stats.mtime);
    });
}, function(err, results) {
    // results is now the original array of files sorted by
    // modified date
});

// By modifying the callback parameter the
// sorting order can be influenced:

// ascending order
async.sortBy([1,9,3,5], function(x, callback) {
    callback(null, x);
}, function(err,result) {
    // result callback
});

// descending order
async.sortBy([1,9,3,5], function(x, callback) {
    callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
}, function(err,result) {
    // result callback
});
Source:
sortBy.js, line 7
transform(coll, accumulatoropt, iteratee, callbackopt)
import transform from 'async/transform';
A relative of reduce. Takes an Object or Array, and iterates over each element in series, each step potentially mutating an accumulator value. The type of the accumulator defaults to the type of collection passed in.

Parameters:
Name	Type	Description
coll	Array | Iterable | Object	
A collection to iterate over.

accumulator	* <optional>	
The initial state of the transform. If omitted, it will default to an empty Object or Array, depending on the type of coll

iteratee	AsyncFunction	
A function applied to each item in the collection that potentially modifies the accumulator. Invoked with (accumulator, item, key, callback).

callback	function <optional>	
A callback which is called after all the iteratee functions have finished. Result is the transformed accumulator. Invoked with (err, result).

Examples
async.transform([1,2,3], function(acc, item, index, callback) {
    // pointless async:
    process.nextTick(function() {
        acc.push(item * 2)
        callback(null)
    });
}, function(err, result) {
    // result is now equal to [2, 4, 6]
});
async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
    setImmediate(function () {
        obj[key] = val * 2;
        callback();
    })
}, function (err, result) {
    // result is equal to {a: 2, b: 4, c: 6}
})
Source:
transform.js, line 8
Control Flow
A collection of async functions for controlling the flow through a script.

Source:
index.js, line 56
Methods
applyEach(fns, …argsopt, callbackopt)
import applyEach from 'async/applyEach';
Applies the provided arguments to each function in the array, calling callback after all functions have completed. If you only provide the first argument, fns, then it will return a function which lets you pass in the arguments as if it were a single function call. If more arguments are provided, callback is required while args is still optional.

Parameters:
Name	Type	Description
fns	Array | Iterable | Object	
A collection of AsyncFunctions to all call with the same arguments

args	* <optional>	
any number of separate arguments to pass to the function.

callback	function <optional>	
the final argument should be the callback, called when all functions have completed processing.

Returns:
If only the first argument, fns, is provided, it will return a function which lets you pass in the arguments as if it were a single function call. The signature is (..args, callback). If invoked with any arguments, callback is required.
Type  function
Example
async.applyEach([enableSearch, updateSchema], 'bucket', callback);

// partial application example:
async.each(
    buckets,
    async.applyEach([enableSearch, updateSchema]),
    callback
);
Source:
applyEach.js, line 4
applyEachSeries(fns, …argsopt, callbackopt)
import applyEachSeries from 'async/applyEachSeries';
The same as applyEach but runs only a single async operation at a time.

Parameters:
Name	Type	Description
fns	Array | Iterable | Object	
A collection of AsyncFunctions to all call with the same arguments

args	* <optional>	
any number of separate arguments to pass to the function.

callback	function <optional>	
the final argument should be the callback, called when all functions have completed processing.

Returns:
If only the first argument is provided, it will return a function which lets you pass in the arguments as if it were a single function call.
Type  function
Source:
applyEachSeries.js, line 4
See:
async.applyEach

auto(tasks, concurrencyopt, callbackopt)
import auto from 'async/auto';
Determines the best order for running the AsyncFunctions in tasks, based on their requirements. Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied.

If any of the AsyncFunctions pass an error to their callback, the auto sequence will stop. Further tasks will not execute (so any other functions depending on it will not run), and the main callback is immediately called with the error.

AsyncFunctions also receive an object containing the results of functions which have completed so far as the first argument, if they have dependencies. If a task function has no dependencies, it will only be passed a callback.

Parameters:
Name	Type	Default	Description
tasks	Object		
An object. Each of its properties is either a function or an array of requirements, with the AsyncFunction itself the last item in the array. The object's key of a property serves as the name of the task defined by that property, i.e. can be used when specifying requirements for other tasks. The function receives one or two arguments:

a results object, containing the results of the previously executed functions, only passed if the task has any dependencies,
a callback(err, result) function, which must be called when finished, passing an error (which can be null) and the result of the function's execution.
concurrency	number <optional>	Infinity	
An optional integer for determining the maximum number of tasks that can be run in parallel. By default, as many as possible.

callback	function <optional>		
An optional callback which is called when all the tasks have been completed. It receives the err argument if any tasks pass an error to their callback. Results are always returned; however, if an error occurs, no further tasks will be performed, and the results object will only contain partial results. Invoked with (err, results).

Returns:
undefined

Example
async.auto({
    // this function will just be passed a callback
    readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
    showData: ['readData', function(results, cb) {
        // results.readData is the file's contents
        // ...
    }]
}, callback);

async.auto({
    get_data: function(callback) {
        console.log('in get_data');
        // async code to get some data
        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback) {
        console.log('in make_folder');
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        callback(null, 'folder');
    },
    write_file: ['get_data', 'make_folder', function(results, callback) {
        console.log('in write_file', JSON.stringify(results));
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        callback(null, 'filename');
    }],
    email_link: ['write_file', function(results, callback) {
        console.log('in email_link', JSON.stringify(results));
        // once the file is written let's email a link to it...
        // results.write_file contains the filename returned by write_file.
        callback(null, {'file':results.write_file, 'email':'user@example.com'});
    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});
Source:
auto.js, line 13
autoInject(tasks, callbackopt)
import autoInject from 'async/autoInject';
A dependency-injected version of the async.auto function. Dependent tasks are specified as parameters to the function, after the usual callback parameter, with the parameter names matching the names of the tasks it depends on. This can provide even more readable task graphs which can be easier to maintain.

If a final callback is specified, the task results are similarly injected, specified as named parameters after the initial error parameter.

The autoInject function is purely syntactic sugar and its semantics are otherwise equivalent to async.auto.

Parameters:
Name	Type	Description
tasks	Object	
An object, each of whose properties is an AsyncFunction of the form 'func([dependencies...], callback). The object's key of a property serves as the name of the task defined by that property, i.e. can be used when specifying requirements for other tasks.

The callback parameter is a callback(err, result) which must be called when finished, passing an error (which can be null) and the result of the function's execution. The remaining parameters name other tasks on which the task is dependent, and the results from those tasks are the arguments of those parameters.
callback	function <optional>	
An optional callback which is called when all the tasks have been completed. It receives the err argument if any tasks pass an error to their callback, and a results object with any completed task results, similar to auto.

Example
//  The example from `auto` can be rewritten as follows:
async.autoInject({
    get_data: function(callback) {
        // async code to get some data
        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback) {
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        callback(null, 'folder');
    },
    write_file: function(get_data, make_folder, callback) {
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        callback(null, 'filename');
    },
    email_link: function(write_file, callback) {
        // once the file is written let's email a link to it...
        // write_file contains the filename returned by write_file.
        callback(null, {'file':write_file, 'email':'user@example.com'});
    }
}, function(err, results) {
    console.log('err = ', err);
    console.log('email_link = ', results.email_link);
});

// If you are using a JS minifier that mangles parameter names, `autoInject`
// will not work with plain functions, since the parameter names will be
// collapsed to a single letter identifier.  To work around this, you can
// explicitly specify the names of the parameters your task function needs
// in an array, similar to Angular.js dependency injection.

// This still has an advantage over plain `auto`, since the results a task
// depends on are still spread into arguments.
async.autoInject({
    //...
    write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
        callback(null, 'filename');
    }],
    email_link: ['write_file', function(write_file, callback) {
        callback(null, {'file':write_file, 'email':'user@example.com'});
    }]
    //...
}, function(err, results) {
    console.log('err = ', err);
    console.log('email_link = ', results.email_link);
});
Source:
autoInject.js, line 24
See:
async.auto

cargo(worker, payloadopt)
import cargo from 'async/cargo';
Creates a cargo object with the specified payload. Tasks added to the cargo will be processed altogether (up to the payload limit). If the worker is in progress, the task is queued until it becomes available. Once the worker has completed some tasks, each callback of those tasks is called. Check out these animations for how cargo and queue work.

While queue passes only one task to one of a group of workers at a time, cargo passes an array of tasks to a single worker, repeating when the worker is finished.

Parameters:
Name	Type	Default	Description
worker	AsyncFunction		
An asynchronous function for processing an array of queued tasks. Invoked with (tasks, callback).

payload	number <optional>	Infinity	
An optional integer for determining how many tasks should be processed per round; if omitted, the default is unlimited.

Returns:
A cargo object to manage the tasks. Callbacks can attached as certain properties to listen for specific events during the lifecycle of the cargo and inner queue.

Type  CargoObject
Example
// create a cargo object with payload 2
var cargo = async.cargo(function(tasks, callback) {
    for (var i=0; i<tasks.length; i++) {
        console.log('hello ' + tasks[i].name);
    }
    callback();
}, 2);

// add some items
cargo.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
cargo.push({name: 'bar'}, function(err) {
    console.log('finished processing bar');
});
cargo.push({name: 'baz'}, function(err) {
    console.log('finished processing baz');
});
Source:
cargo.js, line 33
See:
async.queue

compose(…functions)
import compose from 'async/compose';
Creates a function which is a composition of the passed asynchronous functions. Each function consumes the return value of the function that follows. Composing functions f(), g(), and h() would produce the result of f(g(h())), only this version uses callbacks to obtain the return values.

Each function is executed with the this binding of the composed function.

Parameters:
Name	Type	Description
functions	AsyncFunction	
the asynchronous functions to compose

Returns:
an asynchronous function that is the composed asynchronous functions

Type  function
Example
function add1(n, callback) {
    setTimeout(function () {
        callback(null, n + 1);
    }, 10);
}

function mul3(n, callback) {
    setTimeout(function () {
        callback(null, n * 3);
    }, 10);
}

var add1mul3 = async.compose(mul3, add1);
add1mul3(4, function (err, result) {
    // result now equals 15
});
Source:
compose.js, line 4
doDuring(fn, test, callbackopt)
import doDuring from 'async/doDuring';
The post-check version of during. To reflect the difference in the order of operations, the arguments test and fn are switched.

Also a version of doWhilst with asynchronous test function.

Parameters:
Name	Type	Description
fn	AsyncFunction	
An async function which is called each time test passes. Invoked with (callback).

test	AsyncFunction	
asynchronous truth test to perform before each execution of fn. Invoked with (...args, callback), where ...args are the non-error args from the previous callback of fn.

callback	function <optional>	
A callback which is called after the test function has failed and repeated execution of fn has stopped. callback will be passed an error if one occurred, otherwise null.

Source:
doDuring.js, line 6
See:
async.during

doUntil(iteratee, test, callbackopt)
import doUntil from 'async/doUntil';
Like 'doWhilst', except the test is inverted. Note the argument ordering differs from until.

Parameters:
Name	Type	Description
iteratee	AsyncFunction	
An async function which is called each time test fails. Invoked with (callback).

test	function	
synchronous truth test to perform after each execution of iteratee. Invoked with any non-error callback results of iteratee.

callback	function <optional>	
A callback which is called after the test function has passed and repeated execution of iteratee has stopped. callback will be passed an error and any arguments passed to the final iteratee's callback. Invoked with (err, [results]);

Source:
doUntil.js, line 3
See:
async.doWhilst

doWhilst(iteratee, test, callbackopt)
import doWhilst from 'async/doWhilst';
The post-check version of whilst. To reflect the difference in the order of operations, the arguments test and iteratee are switched.

doWhilst is to whilst as do while is to while in plain JavaScript.

Parameters:
Name	Type	Description
iteratee	AsyncFunction	
A function which is called each time test passes. Invoked with (callback).

test	function	
synchronous truth test to perform after each execution of iteratee. Invoked with any non-error callback results of iteratee.

callback	function <optional>	
A callback which is called after the test function has failed and repeated execution of iteratee has stopped. callback will be passed an error and any arguments passed to the final iteratee's callback. Invoked with (err, [results]);

Source:
doWhilst.js, line 7
See:
async.whilst

during(test, fn, callbackopt)
import during from 'async/during';
Like whilst, except the test is an asynchronous function that is passed a callback in the form of function (err, truth). If error is passed to test or fn, the main callback is immediately called with the value of the error.

Parameters:
Name	Type	Description
test	AsyncFunction	
asynchronous truth test to perform before each execution of fn. Invoked with (callback).

fn	AsyncFunction	
An async function which is called each time test passes. Invoked with (callback).

callback	function <optional>	
A callback which is called after the test function has failed and repeated execution of fn has stopped. callback will be passed an error, if one occurred, otherwise null.

Example
var count = 0;

async.during(
    function (callback) {
        return callback(null, count < 5);
    },
    function (callback) {
        count++;
        setTimeout(callback, 1000);
    },
    function (err) {
        // 5 seconds have passed
    }
);
Source:
during.js, line 5
See:
async.whilst

forever(fn, errbackopt)
import forever from 'async/forever';
Calls the asynchronous function fn with a callback parameter that allows it to call itself again, in series, indefinitely. If an error is passed to the callback then errback is called with the error, and execution stops, otherwise it will never be called.

Parameters:
Name	Type	Description
fn	AsyncFunction	
an async function to call repeatedly. Invoked with (next).

errback	function <optional>	
when fn passes an error to it's callback, this function will be called, and execution stops. Invoked with (err).

Example
async.forever(
    function(next) {
        // next is suitable for passing to things that need a callback(err [, whatever]);
        // it will result in this function being called again.
    },
    function(err) {
        // if next is called with a value in its first parameter, it will appear
        // in here as 'err', and execution will stop.
    }
);
Source:
forever.js, line 7
parallel(tasks, callbackopt)
import parallel from 'async/parallel';
Run the tasks collection of functions in parallel, without waiting until the previous function has completed. If any of the functions pass an error to its callback, the main callback is immediately called with the value of the error. Once the tasks have completed, the results are passed to the final callback as an array.

Note: parallel is about kicking-off I/O tasks in parallel, not about parallel execution of code. If your tasks do not use any timers or perform any I/O, they will actually be executed in series. Any synchronous setup sections for each task will happen one after the other. JavaScript remains single-threaded.

Hint: Use reflect to continue the execution of other tasks when a task fails.

It is also possible to use an object instead of an array. Each property will be run as a function and the results will be passed to the final callback as an object instead of an array. This can be a more readable way of handling results from async.parallel.

Parameters:
Name	Type	Description
tasks	Array | Iterable | Object	
A collection of async functions to run. Each async function can complete with any number of optional result values.

callback	function <optional>	
An optional callback to run once all the functions have completed successfully. This function gets a results array (or object) containing all the result arguments passed to the task callbacks. Invoked with (err, results).

Example
async.parallel([
    function(callback) {
        setTimeout(function() {
            callback(null, 'one');
        }, 200);
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results) {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});

// an example using an object instead of an array
async.parallel({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback) {
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equals to: {one: 1, two: 2}
});
Source:
parallel.js, line 4
parallelLimit(tasks, limit, callbackopt)
import parallelLimit from 'async/parallelLimit';
The same as parallel but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
tasks	Array | Iterable | Object	
A collection of async functions to run. Each async function can complete with any number of optional result values.

limit	number	
The maximum number of async operations at a time.

callback	function <optional>	
An optional callback to run once all the functions have completed successfully. This function gets a results array (or object) containing all the result arguments passed to the task callbacks. Invoked with (err, results).

Source:
parallelLimit.js, line 4
See:
async.parallel

priorityQueue(worker, concurrency)
import priorityQueue from 'async/priorityQueue';
The same as async.queue only tasks are assigned a priority and completed in ascending priority order.

Parameters:
Name	Type	Description
worker	AsyncFunction	
An async function for processing a queued task. If you want to handle errors from an individual task, pass a callback to q.push(). Invoked with (task, callback).

concurrency	number	
An integer for determining how many worker functions should be run in parallel. If omitted, the concurrency defaults to 1. If the concurrency is 0, an error is thrown.

Returns:
A priorityQueue object to manage the tasks. There are two differences between queue and priorityQueue objects:

push(task, priority, [callback]) - priority should be a number. If an array of tasks is given, all tasks will be assigned the same priority.
The unshift method was removed.
Type  QueueObject
Source:
priorityQueue.js, line 8
See:
async.queue

queue(worker, concurrencyopt)
import queue from 'async/queue';
Creates a queue object with the specified concurrency. Tasks added to the queue are processed in parallel (up to the concurrency limit). If all workers are in progress, the task is queued until one becomes available. Once a worker completes a task, that task's callback is called.

Parameters:
Name	Type	Default	Description
worker	AsyncFunction		
An async function for processing a queued task. If you want to handle errors from an individual task, pass a callback to q.push(). Invoked with (task, callback).

concurrency	number <optional>	1	
An integer for determining how many worker functions should be run in parallel. If omitted, the concurrency defaults to 1. If the concurrency is 0, an error is thrown.

Returns:
A queue object to manage the tasks. Callbacks can attached as certain properties to listen for specific events during the lifecycle of the queue.

Type  QueueObject
Example
// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
};

// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});

// add some items to the queue (batch-wise)
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
    console.log('finished processing item');
});

// add some items to the front of the queue
q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});
Source:
queue.js, line 58
race(tasks, callback)
import race from 'async/race';
Runs the tasks array of functions in parallel, without waiting until the previous function has completed. Once any of the tasks complete or pass an error to its callback, the main callback is immediately called. It's equivalent to Promise.race().

Parameters:
Name	Type	Description
tasks	Array	
An array containing async functions to run. Each function can complete with an optional result value.

callback	function	
A callback to run once any of the functions have completed. This function gets an error or result from the first function that completed. Invoked with (err, result).

Returns:
undefined

Example
async.race([
    function(callback) {
        setTimeout(function() {
            callback(null, 'one');
        }, 200);
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
],
// main callback
function(err, result) {
    // the result will be equal to 'two' as it finishes earlier
});
Source:
race.js, line 6
retry(optsopt, task, callbackopt)
import retry from 'async/retry';
Attempts to get a successful response from task no more than times times before returning an error. If the task is successful, the callback will be passed the result of the successful task. If all attempts fail, the callback will be passed the error and result (if any) of the final attempt.

Parameters:
Name	Type	Default	Description
opts	Object | number <optional>	{times: 5, interval: 0}| 5	
Can be either an object with times and interval or a number.

times - The number of attempts to make before giving up. The default is 5.
interval - The time to wait between retries, in milliseconds. The default is 0. The interval may also be specified as a function of the retry count (see example).
errorFilter - An optional synchronous function that is invoked on erroneous result. If it returns true the retry attempts will continue; if the function returns false the retry flow is aborted with the current attempt's error and result being returned to the final callback. Invoked with (err).
If opts is a number, the number specifies the number of times to retry, with the default interval of 0.
task	AsyncFunction		
An async function to retry. Invoked with (callback).

callback	function <optional>		
An optional callback which is called when the task has succeeded, or after the final failed attempt. It receives the err and result arguments of the last attempt at completing the task. Invoked with (err, results).

Example
// The `retry` function can be used as a stand-alone control flow by passing
// a callback, as shown below:

// try calling apiMethod 3 times
async.retry(3, apiMethod, function(err, result) {
    // do something with the result
});

// try calling apiMethod 3 times, waiting 200 ms between each retry
async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
    // do something with the result
});

// try calling apiMethod 10 times with exponential backoff
// (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
async.retry({
  times: 10,
  interval: function(retryCount) {
    return 50 * Math.pow(2, retryCount);
  }
}, apiMethod, function(err, result) {
    // do something with the result
});

// try calling apiMethod the default 5 times no delay between each retry
async.retry(apiMethod, function(err, result) {
    // do something with the result
});

// try calling apiMethod only when error condition satisfies, all other
// errors will abort the retry control flow and return to final callback
async.retry({
  errorFilter: function(err) {
    return err.message === 'Temporary error'; // only retry on a specific error
  }
}, apiMethod, function(err, result) {
    // do something with the result
});

// to retry individual methods that are not as reliable within other
// control flow functions, use the `retryable` wrapper:
async.auto({
    users: api.getUsers.bind(api),
    payments: async.retryable(3, api.getPayments.bind(api))
}, function(err, results) {
    // do something with the results
});
Source:
retry.js, line 5
See:
async.retryable

retryable(optsopt, task)
import retryable from 'async/retryable';
A close relative of retry. This method wraps a task and makes it retryable, rather than immediately calling it with retries.

Parameters:
Name	Type	Default	Description
opts	Object | number <optional>	{times: 5, interval: 0}| 5	
optional options, exactly the same as from retry

task	AsyncFunction		
the asynchronous function to wrap. This function will be passed any arguments passed to the returned wrapper. Invoked with (...args, callback).

Returns:
The wrapped function, which when invoked, will retry on an error, based on the parameters specified in opts. This function will accept the same parameters as task.

Type  AsyncFunction
Example
async.auto({
    dep1: async.retryable(3, getFromFlakyService),
    process: ["dep1", async.retryable(3, function (results, cb) {
        maybeProcessData(results.dep1, cb);
    })]
}, callback);
Source:
retryable.js, line 5
See:
async.retry

seq(…functions)
import seq from 'async/seq';
Version of the compose function that is more natural to read. Each function consumes the return value of the previous function. It is the equivalent of compose with the arguments reversed.

Each function is executed with the this binding of the composed function.

Parameters:
Name	Type	Description
functions	AsyncFunction	
the asynchronous functions to compose

Returns:
a function that composes the functions in order

Type  function
Example
// Requires lodash (or underscore), express3 and dresende's orm2.
// Part of an app, that fetches cats of the logged user.
// This example uses `seq` function to avoid overnesting and error
// handling clutter.
app.get('/cats', function(request, response) {
    var User = request.models.User;
    async.seq(
        _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
        function(user, fn) {
            user.getCats(fn);      // 'getCats' has signature (callback(err, data))
        }
    )(req.session.user_id, function (err, cats) {
        if (err) {
            console.error(err);
            response.json({ status: 'error', message: err.message });
        } else {
            response.json({ status: 'ok', message: 'Cats found', data: cats });
        }
    });
});
Source:
seq.js, line 7
See:
async.compose

series(tasks, callbackopt)
import series from 'async/series';
Run the functions in the tasks collection in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run, and callback is immediately called with the value of the error. Otherwise, callback receives an array of results when tasks have completed.

It is also possible to use an object instead of an array. Each property will be run as a function, and the results will be passed to the final callback as an object instead of an array. This can be a more readable way of handling results from async.series.

Note that while many implementations preserve the order of object properties, the ECMAScript Language Specification explicitly states that

The mechanics and order of enumerating the properties is not specified.

So if you rely on the order in which your series of functions are executed, and want this to work on all platforms, consider using an array.

Parameters:
Name	Type	Description
tasks	Array | Iterable | Object	
A collection containing async functions to run in series. Each function can complete with any number of optional result values.

callback	function <optional>	
An optional callback to run once all the functions have completed. This function gets a results array (or object) containing all the result arguments passed to the task callbacks. Invoked with (err, result).

Example
async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});

async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
Source:
series.js, line 4
times(n, iteratee, callback)
import times from 'async/times';
Calls the iteratee function n times, and accumulates results in the same manner you would use with map.

Parameters:
Name	Type	Description
n	number	
The number of times to run the function.

iteratee	AsyncFunction	
The async function to call n times. Invoked with the iteration index and a callback: (n, next).

callback	function	
see map.

Example
// Pretend this is some complicated async factory
var createUser = function(id, callback) {
    callback(null, {
        id: 'user' + id
    });
};

// generate 5 users
async.times(5, function(n, next) {
    createUser(n, function(err, user) {
        next(err, user);
    });
}, function(err, users) {
    // we should now have 5 users
});
Source:
times.js, line 4
See:
async.map

timesLimit(count, limit, iteratee, callback)
import timesLimit from 'async/timesLimit';
The same as times but runs a maximum of limit async operations at a time.

Parameters:
Name	Type	Description
count	number	
The number of times to run the function.

limit	number	
The maximum number of async operations at a time.

iteratee	AsyncFunction	
The async function to call n times. Invoked with the iteration index and a callback: (n, next).

callback	function	
see async.map.

Source:
timesLimit.js, line 5
See:
async.times

timesSeries(n, iteratee, callback)
import timesSeries from 'async/timesSeries';
The same as times but runs only a single async operation at a time.

Parameters:
Name	Type	Description
n	number	
The number of times to run the function.

iteratee	AsyncFunction	
The async function to call n times. Invoked with the iteration index and a callback: (n, next).

callback	function	
see map.

Source:
timesSeries.js, line 4
See:
async.times

tryEach(tasks, callbackopt)
import tryEach from 'async/tryEach';
It runs each task in series but stops whenever any of the functions were successful. If one of the tasks were successful, the callback will be passed the result of the successful task. If all tasks fail, the callback will be passed the error and result (if any) of the final attempt.

Parameters:
Name	Type	Description
tasks	Array | Iterable | Object	
A collection containing functions to run, each function is passed a callback(err, result) it must call on completion with an error err (which can be null) and an optional result value.

callback	function <optional>	
An optional callback which is called when one of the tasks has succeeded, or all have failed. It receives the err and result arguments of the last attempt at completing the task. Invoked with (err, results).

Example
async.tryEach([
    function getDataFromFirstWebsite(callback) {
        // Try getting the data from the first website
        callback(err, data);
    },
    function getDataFromSecondWebsite(callback) {
        // First website failed,
        // Try getting the data from the backup website
        callback(err, data);
    }
],
// optional callback
function(err, results) {
    Now do something with the data.
});
Source:
tryEach.js, line 6
until(test, iteratee, callbackopt)
import until from 'async/until';
Repeatedly call iteratee until test returns true. Calls callback when stopped, or an error occurs. callback will be passed an error and any arguments passed to the final iteratee's callback.

The inverse of whilst.

Parameters:
Name	Type	Description
test	function	
synchronous truth test to perform before each execution of iteratee. Invoked with ().

iteratee	AsyncFunction	
An async function which is called each time test fails. Invoked with (callback).

callback	function <optional>	
A callback which is called after the test function has passed and repeated execution of iteratee has stopped. callback will be passed an error and any arguments passed to the final iteratee's callback. Invoked with (err, [results]);

Source:
until.js, line 3
See:
async.whilst

waterfall(tasks, callbackopt)
import waterfall from 'async/waterfall';
Runs the tasks array of functions in series, each passing their results to the next in the array. However, if any of the tasks pass an error to their own callback, the next function is not executed, and the main callback is immediately called with the error.

Parameters:
Name	Type	Description
tasks	Array	
An array of async functions to run. Each function should complete with any number of result values. The result values will be passed as arguments, in order, to the next task.

callback	function <optional>	
An optional callback to run once all the functions have completed. This will be passed the results of the last task's callback. Invoked with (err, [results]).

Returns:
undefined

Example
async.waterfall([
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});

// Or, with named functions:
async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    // result now equals 'done'
});
function myFirstFunction(callback) {
    callback(null, 'one', 'two');
}
function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
}
function myLastFunction(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
}
Source:
waterfall.js, line 9
whilst(test, iteratee, callbackopt)
import whilst from 'async/whilst';
Repeatedly call iteratee, while test returns true. Calls callback when stopped, or an error occurs.

Parameters:
Name	Type	Description
test	function	
synchronous truth test to perform before each execution of iteratee. Invoked with ().

iteratee	AsyncFunction	
An async function which is called each time test passes. Invoked with (callback).

callback	function <optional>	
A callback which is called after the test function has failed and repeated execution of iteratee has stopped. callback will be passed an error and any arguments passed to the final iteratee's callback. Invoked with (err, [results]);

Returns:
undefined

Example
var count = 0;
async.whilst(
    function() { return count < 5; },
    function(callback) {
        count++;
        setTimeout(function() {
            callback(null, count);
        }, 1000);
    },
    function (err, n) {
        // 5 seconds have passed, n = 5
    }
);
Source:
whilst.js, line 7
Type Definitions
CargoObject
import cargo from 'async/cargo';
A cargo of tasks for the worker function to complete. Cargo inherits all of the same methods and event callbacks as queue.

Type:
Object
Properties:
Name	Type	Description
length	function	
A function returning the number of items waiting to be processed. Invoke like cargo.length().

payload	number	
An integer for determining how many tasks should be process per round. This property can be changed after a cargo is created to alter the payload on-the-fly.

push	function	
Adds task to the queue. The callback is called once the worker has finished processing the task. Instead of a single task, an array of tasks can be submitted. The respective callback is used for every task in the list. Invoke like cargo.push(task, [callback]).

saturated	function	
A callback that is called when the queue.length() hits the concurrency and further tasks will be queued.

empty	function	
A callback that is called when the last item from the queue is given to a worker.

drain	function	
A callback that is called when the last item from the queue has returned from the worker.

idle	function	
a function returning false if there are items waiting or being processed, or true if not. Invoke like cargo.idle().

pause	function	
a function that pauses the processing of tasks until resume() is called. Invoke like cargo.pause().

resume	function	
a function that resumes the processing of queued tasks when the queue is paused. Invoke like cargo.resume().

kill	function	
a function that removes the drain callback and empties remaining tasks from the queue forcing it to go idle. Invoke like cargo.kill().

Source:
cargo.js, line 3
QueueObject
import queue from 'async/queue';
A queue of tasks for the worker function to complete.

Type:
Object
Properties:
Name	Type	Description
length	function	
a function returning the number of items waiting to be processed. Invoke with queue.length().

started	boolean	
a boolean indicating whether or not any items have been pushed and processed by the queue.

running	function	
a function returning the number of items currently being processed. Invoke with queue.running().

workersList	function	
a function returning the array of items currently being processed. Invoke with queue.workersList().

idle	function	
a function returning false if there are items waiting or being processed, or true if not. Invoke with queue.idle().

concurrency	number	
an integer for determining how many worker functions should be run in parallel. This property can be changed after a queue is created to alter the concurrency on-the-fly.

push	function	
add a new task to the queue. Calls callback once the worker has finished processing the task. Instead of a single task, a tasks array can be submitted. The respective callback is used for every task in the list. Invoke with queue.push(task, [callback]),

unshift	function	
add a new task to the front of the queue. Invoke with queue.unshift(task, [callback]).

remove	function	
remove items from the queue that match a test function. The test function will be passed an object with a data property, and a priority property, if this is a priorityQueue object. Invoked with queue.remove(testFn), where testFn is of the form function ({data, priority}) {} and returns a Boolean.

saturated	function	
a callback that is called when the number of running workers hits the concurrency limit, and further tasks will be queued.

unsaturated	function	
a callback that is called when the number of running workers is less than the concurrency & buffer limits, and further tasks will not be queued.

buffer	number	
A minimum threshold buffer in order to say that the queue is unsaturated.

empty	function	
a callback that is called when the last item from the queue is given to a worker.

drain	function	
a callback that is called when the last item from the queue has returned from the worker.

error	function	
a callback that is called when a task errors. Has the signature function(error, task).

paused	boolean	
a boolean for determining whether the queue is in a paused state.

pause	function	
a function that pauses the processing of tasks until resume() is called. Invoke with queue.pause().

resume	function	
a function that resumes the processing of queued tasks when the queue is paused. Invoke with queue.resume().

kill	function	
a function that removes the drain callback and empties remaining tasks from the queue forcing it to go idle. No more tasks should be pushed to the queue after calling this function. Invoke with queue.kill().

Source:
queue.js, line 4
Utils
A collection of async utility functions.

Source:
index.js, line 61
Methods
apply(fn)
import apply from 'async/apply';
Creates a continuation function with some arguments already applied.

Useful as a shorthand when combined with other control flow functions. Any arguments passed to the returned function are added to the arguments originally passed to apply.

Parameters:
Name	Type	Description
fn	function	
The function you want to eventually apply all arguments to. Invokes with (arguments...).

arguments...	*	
Any number of arguments to automatically apply when the continuation is called.

Returns:
the partially-applied function

Type  function
Example
// using apply
async.parallel([
    async.apply(fs.writeFile, 'testfile1', 'test1'),
    async.apply(fs.writeFile, 'testfile2', 'test2')
]);


// the same process without using apply
async.parallel([
    function(callback) {
        fs.writeFile('testfile1', 'test1', callback);
    },
    function(callback) {
        fs.writeFile('testfile2', 'test2', callback);
    }
]);

// It's possible to pass any number of additional arguments when calling the
// continuation:

node> var fn = async.apply(sys.puts, 'one');
node> fn('two', 'three');
one
two
three
Source:
apply.js, line 3
asyncify(func)
import asyncify from 'async/asyncify';
Take a sync function and make it async, passing its return value to a callback. This is useful for plugging sync functions into a waterfall, series, or other async functions. Any arguments passed to the generated function will be passed to the wrapped function (except for the final callback argument). Errors thrown will be passed to the callback.

If the function passed to asyncify returns a Promise, that promises's resolved/rejected state will be used to call the callback, rather than simply the synchronous return value.

This also means you can asyncify ES2017 async functions.

Alias:
wrapSync
Parameters:
Name	Type	Description
func	function	
The synchronous function, or Promise-returning function to convert to an AsyncFunction.

Returns:
An asynchronous wrapper of the func. To be invoked with (args..., callback).

Type  AsyncFunction
Example
// passing a regular synchronous function
async.waterfall([
    async.apply(fs.readFile, filename, "utf8"),
    async.asyncify(JSON.parse),
    function (data, next) {
        // data is the result of parsing the text.
        // If there was a parsing error, it would have been caught.
    }
], callback);

// passing a function returning a promise
async.waterfall([
    async.apply(fs.readFile, filename, "utf8"),
    async.asyncify(function (contents) {
        return db.model.create(contents);
    }),
    function (model, next) {
        // `model` is the instantiated model object.
        // If there was an error, this function would be skipped.
    }
], callback);

// es2017 example, though `asyncify` is not needed if your JS environment
// supports async functions out of the box
var q = async.queue(async.asyncify(async function(file) {
    var intermediateStep = await processFile(file);
    return await somePromise(intermediateStep)
}));

q.push(files);
Source:
asyncify.js, line 5
constant()
import constant from 'async/constant';
Returns a function that when called, calls-back with the values provided. Useful as the first function in a waterfall, or for plugging values in to auto.

Parameters:
Name	Type	Description
arguments...	*	
Any number of arguments to automatically invoke callback with.

Returns:
Returns a function that when invoked, automatically invokes the callback with the previous given arguments.

Type  AsyncFunction
Example
async.waterfall([
    async.constant(42),
    function (value, next) {
        // value === 42
    },
    //...
], callback);

async.waterfall([
    async.constant(filename, "utf8"),
    fs.readFile,
    function (fileData, next) {
        //...
    }
    //...
], callback);

async.auto({
    hostname: async.constant("https://server.net/"),
    port: findFreePort,
    launchServer: ["hostname", "port", function (options, cb) {
        startServer(options, cb);
    }],
    //...
}, callback);
Source:
constant.js, line 3
dir(function)
import dir from 'async/dir';
Logs the result of an async function to the console using console.dir to display the properties of the resulting object. Only works in Node.js or in browsers that support console.dir and console.error (such as FF and Chrome). If multiple arguments are returned from the async function, console.dir is called on each argument in order.

Parameters:
Name	Type	Description
function	AsyncFunction	
The function you want to eventually apply all arguments to.

arguments...	*	
Any number of arguments to apply to the function.

Example
// in a module
var hello = function(name, callback) {
    setTimeout(function() {
        callback(null, {hello: name});
    }, 1000);
};

// in the node repl
node> async.dir(hello, 'world');
{hello: 'world'}
Source:
dir.js, line 3
ensureAsync(fn)
import ensureAsync from 'async/ensureAsync';
Wrap an async function and ensure it calls its callback on a later tick of the event loop. If the function already calls its callback on a next tick, no extra deferral is added. This is useful for preventing stack overflows (RangeError: Maximum call stack size exceeded) and generally keeping Zalgo contained. ES2017 async functions are returned as-is -- they are immune to Zalgo's corrupting influences, as they always resolve on a later tick.

Parameters:
Name	Type	Description
fn	AsyncFunction	
an async function, one that expects a node-style callback as its last argument.

Returns:
Returns a wrapped function with the exact same call signature as the function passed in.

Type  AsyncFunction
Example
function sometimesAsync(arg, callback) {
    if (cache[arg]) {
        return callback(null, cache[arg]); // this would be synchronous!!
    } else {
        doSomeIO(arg, callback); // this IO would be asynchronous
    }
}

// this has a risk of stack overflows if many results are cached in a row
async.mapSeries(args, sometimesAsync, done);

// this will defer sometimesAsync's callback if necessary,
// preventing stack overflows
async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
Source:
ensureAsync.js, line 5
log(function)
import log from 'async/log';
Logs the result of an async function to the console. Only works in Node.js or in browsers that support console.log and console.error (such as FF and Chrome). If multiple arguments are returned from the async function, console.log is called on each argument in order.

Parameters:
Name	Type	Description
function	AsyncFunction	
The function you want to eventually apply all arguments to.

arguments...	*	
Any number of arguments to apply to the function.

Example
// in a module
var hello = function(name, callback) {
    setTimeout(function() {
        callback(null, 'hello ' + name);
    }, 1000);
};

// in the node repl
node> async.log(hello, 'world');
'hello world'
Source:
log.js, line 3
memoize(fn, hasher)
import memoize from 'async/memoize';
Caches the results of an async function. When creating a hash to store function results against, the callback is omitted from the hash and an optional hash function can be used.

If no hash function is specified, the first argument is used as a hash key, which may work reasonably if it is a string or a data type that converts to a distinct string. Note that objects and arrays will not behave reasonably. Neither will cases where the other arguments are significant. In such cases, specify your own hash function.

The cache of results is exposed as the memo property of the function returned by memoize.

Parameters:
Name	Type	Description
fn	AsyncFunction	
The async function to proxy and cache results from.

hasher	function	
An optional function for generating a custom hash for storing results. It has all the arguments applied to it apart from the callback, and must be synchronous.

Returns:
a memoized version of fn

Type  AsyncFunction
Example
var slow_fn = function(name, callback) {
    // do something
    callback(null, result);
};
var fn = async.memoize(slow_fn);

// fn can now be used as if it were slow_fn
fn('some name', function() {
    // callback
});
Source:
memoize.js, line 12
nextTick(callback)
import nextTick from 'async/nextTick';
Calls callback on a later loop around the event loop. In Node.js this just calls process.nextTick. In the browser it will use setImmediate if available, otherwise setTimeout(callback, 0), which means other higher priority events may precede the execution of callback.

This is used internally for browser-compatibility purposes.

Parameters:
Name	Type	Description
callback	function	
The function to call on a later loop around the event loop. Invoked with (args...).

args...	*	
any number of additional arguments to pass to the callback on the next tick.

Example
var call_order = [];
async.nextTick(function() {
    call_order.push('two');
    // call_order now equals ['one','two']
});
call_order.push('one');

async.setImmediate(function (a, b, c) {
    // a, b, and c equal 1, 2, and 3
}, 1, 2, 3);
Source:
nextTick.js, line 5
See:
async.setImmediate

reflect(fn)
import reflect from 'async/reflect';
Wraps the async function in another function that always completes with a result object, even when it errors.

The result object has either the property error or value.

Parameters:
Name	Type	Description
fn	AsyncFunction	
The async function you want to wrap

Returns:
A function that always passes null to it's callback as the error. The second argument to the callback will be an object with either an error or a value property.
Type  function
Example
async.parallel([
    async.reflect(function(callback) {
        // do some stuff ...
        callback(null, 'one');
    }),
    async.reflect(function(callback) {
        // do some more stuff but error ...
        callback('bad stuff happened');
    }),
    async.reflect(function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    })
],
// optional callback
function(err, results) {
    // values
    // results[0].value = 'one'
    // results[1].error = 'bad stuff happened'
    // results[2].value = 'two'
});
Source:
reflect.js, line 5
reflectAll(tasks)
import reflectAll from 'async/reflectAll';
A helper function that wraps an array or an object of functions with reflect.

Parameters:
Name	Type	Description
tasks	Array | Object | Iterable	
The collection of async functions to wrap in async.reflect.

Returns:
Returns an array of async functions, each wrapped in async.reflect

Type  Array
Example
let tasks = [
    function(callback) {
        setTimeout(function() {
            callback(null, 'one');
        }, 200);
    },
    function(callback) {
        // do some more stuff but error ...
        callback(new Error('bad stuff happened'));
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
];

async.parallel(async.reflectAll(tasks),
// optional callback
function(err, results) {
    // values
    // results[0].value = 'one'
    // results[1].error = Error('bad stuff happened')
    // results[2].value = 'two'
});

// an example using an object instead of an array
let tasks = {
    one: function(callback) {
        setTimeout(function() {
            callback(null, 'one');
        }, 200);
    },
    two: function(callback) {
        callback('two');
    },
    three: function(callback) {
        setTimeout(function() {
            callback(null, 'three');
        }, 100);
    }
};

async.parallel(async.reflectAll(tasks),
// optional callback
function(err, results) {
    // values
    // results.one.value = 'one'
    // results.two.error = 'two'
    // results.three.value = 'three'
});
Source:
reflectAll.js, line 6
See:
async.reflect

setImmediate(callback)
import setImmediate from 'async/setImmediate';
Calls callback on a later loop around the event loop. In Node.js this just calls setImmediate. In the browser it will use setImmediate if available, otherwise setTimeout(callback, 0), which means other higher priority events may precede the execution of callback.

This is used internally for browser-compatibility purposes.

Parameters:
Name	Type	Description
callback	function	
The function to call on a later loop around the event loop. Invoked with (args...).

args...	*	
any number of additional arguments to pass to the callback on the next tick.

Example
var call_order = [];
async.nextTick(function() {
    call_order.push('two');
    // call_order now equals ['one','two']
});
call_order.push('one');

async.setImmediate(function (a, b, c) {
    // a, b, and c equal 1, 2, and 3
}, 1, 2, 3);
Source:
setImmediate.js, line 3
See:
async.nextTick

timeout(asyncFn, milliseconds, infoopt)
import timeout from 'async/timeout';
Sets a time limit on an asynchronous function. If the function does not call its callback within the specified milliseconds, it will be called with a timeout error. The code property for the error object will be 'ETIMEDOUT'.

Parameters:
Name	Type	Description
asyncFn	AsyncFunction	
The async function to limit in time.

milliseconds	number	
The specified time limit.

info	* <optional>	
Any variable you want attached (string, object, etc) to timeout Error for more information..

Returns:
Returns a wrapped function that can be used with any of the control flow functions. Invoke this function with the same parameters as you would asyncFunc.

Type  AsyncFunction
Example
function myFunction(foo, callback) {
    doAsyncTask(foo, function(err, data) {
        // handle errors
        if (err) return callback(err);

        // do some stuff ...

        // return processed data
        return callback(null, data);
    });
}

var wrapped = async.timeout(myFunction, 1000);

// call `wrapped` as you would `myFunction`
wrapped({ bar: 'bar' }, function(err, data) {
    // if `myFunction` takes < 1000 ms to execute, `err`
    // and `data` will have their expected values

    // else `err` will be an Error with the code 'ETIMEDOUT'
});
Source:
timeout.js, line 4
unmemoize(fn)
import unmemoize from 'async/unmemoize';
Undoes a memoized function, reverting it to the original, unmemoized form. Handy for testing.

Parameters:
Name	Type	Description
fn	AsyncFunction	
the memoized function

Returns:
a function that calls the original unmemoized function

Type  AsyncFunction
Source:
unmemoize.js, line 1
See:
async.memoize


 */