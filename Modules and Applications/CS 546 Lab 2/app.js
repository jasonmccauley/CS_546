/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import * as arrayUtils from './arrayUtils.js'
import * as stringUtils from './stringUtils.js'
import * as objectUtils from './objectUtils.js'

// arrayAnalysis Tests
try {
    // should pass
    const arrayAnalysisOne = arrayUtils.arrayAnalysis([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20]);
    console.log('arrayAnalysis passed successfully');
 } catch (e) {
    console.error('arrayAnalysis failed test case');
 }
 try {
    // should fail
    const arrayAnalysisTwo = arrayUtils.arrayAnalysis(["guitar", 1, 3, "apple"]);
    console.error('arrayAnalysis did not error');
 } catch (e) {
    console.log('arrayAnalysis failed successfully');
 }

// mergeKeyValuePairs Tests
try {
    // should pass
    const mergeKeyValuePairsOne = arrayUtils.mergeKeyValuePairs(["foo", 10], ["name", "Alice"], ["foo", "bar"], ["foo", 10], ["class", "CS-546"], ["name", "Bob"]);
    console.log('mergeKeyValuePairs passed successfully');
 } catch (e) {
    console.error('mergeKeyValuePairs failed test case');
 }
 try {
    // should fail
    const mergeKeyValuePairsTwo = arrayUtils.mergeKeyValuePairs(["key1", "value1"], [], ["key2", "value2"]);
    console.error('mergeKeyValuePairs did not error');
 } catch (e) {
    console.log('mergeKeyValuePairs failed successfully');
 }

// deepArrayEquality Tests
try {
    // should pass
    const deepArrayEqualityOne = arrayUtils.deepArrayEquality([2, 3, {x: [10, 20], y: "test"}], [2, 3, {x: [10, 20], y: "test"}]);
    console.log('deepArrayEquality passed successfully');
 } catch (e) {
    console.error('deepArrayEquality failed test case');
 }
 try {
    // should fail
    const deepArrayEqualityTwo = arrayUtils.deepArrayEquality([1,2,"nope"]);
    console.error('deepArrayEquality did not error');
 } catch (e) {
    console.log('deepArrayEquality failed successfully');
 }

// replaceCharsAtIndexes Tests
try {
    // should pass
    const replaceCharsAtIndexesOne = stringUtils.replaceCharsAtIndexes("mississippi", [1, 4, 7]);
    console.log('replaceCharsAtIndexes passed successfully');
 } catch (e) {
    console.error('replaceCharsAtIndexes failed test case');
 }
 try {
    // should fail
    const replaceCharsAtIndexesTwo = stringUtils.replaceCharsAtIndexes("foobar", [0]);
    console.error('replaceCharsAtIndexes did not error');
 } catch (e) {
    console.log('replaceCharsAtIndexes failed successfully');
 }

 // anagrams Tests
 try {
    // should pass
    const anagramsOne = stringUtils.anagrams('Listen to the silent night', 'listen');
    console.log('anagrams passed successfully');
 } catch (e) {
    console.error('anagrams failed test case');
 }
 try {
    // should fail
    const anagramsTwo = stringUtils.anagrams(" ", "cat");
    console.error('anagrams did not error');
 } catch (e) {
    console.log('anagrams failed successfully');
 }

 // charSwap Tests
 try {
    // should pass
    const charSwapOne = stringUtils.charSwap("hello", "worldwide");
    console.log('charSwap passed successfully');
 } catch (e) {
    console.error('charSwap failed test case');
 }
 try {
    // should fail
    const charSwapTwo = stringUtils.charSwap("     ", "hello");
    console.error('charSwap did not error');
 } catch (e) {
    console.log('charSwap failed successfully');
 }

 // processObjects Tests
 try {
    // should pass
    const processObjectsOne = objectUtils.processObjects([{ x: 2, y: 3 }, { a: 70, x: 4, z: 5 }], x => x + 1);
    console.log('processObjects passed successfully');
 } catch (e) {
    console.error('processObjects failed test case');
 }
 try {
    // should fail
    const processObjectsTwo = objectUtils.processObjects({ x: 2, y: 3 }, x => x + 1);
    console.error('processObjects did not error');
 } catch (e) {
    console.log('processObjects failed successfully');
 }

 // similarKeysValues Tests
 try {
    // should pass
    const similarKeysValuesOne = objectUtils.similarKeysValues({ a: { x: 1, y: 2 }, b: 3 }, { a: { x: "1", y: 2 }, b: "3" });
    console.log('similarKeysValues passed successfully');
 } catch (e) {
    console.error('similarKeysValues failed test case');
 }
 try {
    // should fail
    const similarKeysValuesTwo = objectUtils.similarKeysValues({ " ": { x: 3, y: 2 }, b: 3 }, { a: { a: 3, y: 2 }, b: "3" });
    console.error('similarKeysValues did not error');
 } catch (e) {
    console.log('similarKeysValues failed successfully');
 }

 // flipKeysForStringsAndNumbers Tests
 try {
    // should pass
    const flipKeysForStringsAndNumbersOne = objectUtils.flipKeysForStringsAndNumbers({ a: "test", b: ["apple", "banana"], d: { y: 5, z: "ok" } });
    console.log('flipKeysForStringsAndNumbers passed successfully');
 } catch (e) {
    console.error('flipKeysForStringsAndNumbers failed test case');
 }
 try {
    // should fail
    const flipKeysForStringsAndNumbersTwo = objectUtils.flipKeysForStringsAndNumbers({ a: "   ", b: ["apple", "banana"], d: { y: 5, z: "ok" } });
    console.error('flipKeysForStringsAndNumbers did not error');
 } catch (e) {
    console.log('flipKeysForStringsAndNumbers failed successfully');
 }