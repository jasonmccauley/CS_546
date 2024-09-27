/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let arrayAnalysis = (arr) => {
  // error handling
  if(!Array.isArray(arr)){
    throw TypeError("Please enter an array");
  }
  if(arr.length === 0){
    throw RangeError("Please enter a non-empty array");
  }
  for(let num of arr){
    if(typeof num !== "number" || num === Infinity || num === -Infinity || Number.isNaN(num)){
      throw TypeError("Please enter an array of numbers");
    }    
  }

  // logic
  let compareNumbers = (a, b) => { // I referred to the following Stack Overflow page to create this helper function for sorting an array of numbers: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers 
    return a - b;
  }

  arr = arr.sort(compareNumbers);
  let totalCount = arr.length;
  let totalSum = 0;
  let middleValue = 0;
  let lowest = Infinity;
  let highest = -Infinity;
  let frequenciesObj = {};
  let max_frequency_count = 0;
  let frequentValues = [];

  if(arr.length % 2 === 0){
    middleValue = (arr[(arr.length / 2) - 1] + arr[arr.length / 2]) / 2;
  }
  else{
    middleValue = arr[Math.floor(arr.length / 2)];
  }

  for(let num of arr){ // first pass to determine lowest and highest numbers, frequencies of each, total sum
    if(num < lowest){
      lowest = num;
    }
    else if(num > highest){
      highest = num;
    }

    if(!(num in frequenciesObj)){
      frequenciesObj[num] = 1;
    }
    else{
      frequenciesObj[num] += 1;
    }
    totalSum += num;
  }

  let average = totalSum / totalCount;
  let span = highest - lowest;

  for(let num in frequenciesObj){ // second pass to determine how many times most frequent number occurs
    if(frequenciesObj[num] > max_frequency_count){
      max_frequency_count = frequenciesObj[num];
    }
  }

  if(max_frequency_count === 1){
    frequentValues.push(null);
  }
  else{
    for(let num in frequenciesObj){ // third pass to determine which numbers appear that frequently
      if(max_frequency_count === frequenciesObj[num]){
        frequentValues.push(Number(num)); // num is each key of obj, which become string when obj is populated
      }
    }
  }

  if(frequentValues.length === 1){
    let frequentValue = frequentValues[0];
    return {average, middleValue, frequentValue, span, lowest, highest, totalCount, totalSum};
  }
  else{
    return {average, middleValue, frequentValues, span, lowest, highest, totalCount, totalSum};
  }
};

export let mergeKeyValuePairs = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // error handling
  let validate_arrays = (arr) => {
    if(!Array.isArray(arr)){
      throw TypeError("Pleasure ensure that all of your inputs are arrays")
    }
    if(arr.length !== 2){
      throw RangeError("Pleasure ensure that each array has exactly two elements");
    }
    for(let num of arr){
      if(typeof num === "number" && num !== Infinity && num !== -Infinity && !(Number.isNaN(num))){
      }
      else if(typeof num === "string"){
        num = num.trim();
        if(num.length === 0){
          throw RangeError("Pleasure ensure that there are no empty strings in your arrays");
        }
      }
      else{
        throw TypeError("Please ensure that the elements in each array are either a string or valid number");
      }
    }
  }
  arrays.forEach(arr => validate_arrays(arr));

  // logic
  let mergedObj = {};
  let merge_arrays = (arr) => {
    if(typeof arr[0] === "string"){
      arr[0] = arr[0].trim();
    }
    if(typeof arr[1] === "string"){
      arr[1] = arr[1].trim();
    }
    if(arr[0] in mergedObj){
      let vals = mergedObj[arr[0]].split(", ");
      if(vals.includes(String(arr[1]))){
      }
      else{
        mergedObj[arr[0]] = `${mergedObj[arr[0]]}, ${arr[1]}`;
      }
    }
    else{
      mergedObj[arr[0]] = String(arr[1]);
    }
  }
  arrays.forEach(arr => merge_arrays(arr));

  return mergedObj;
};

export let deepArrayEquality = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // error handling
  if(arrays.length === 0 || arrays.length === 1){
    throw RangeError("Please enter at least two arrays for comparison");
  }
  let validate_input_arrays = (arr) => {
    if(!Array.isArray(arr)){
      throw TypeError("Pleasure ensure that all of your inputs are arrays")
    }
    if(arr.length == 0){
      throw RangeError("Pleasure ensure that none of your input arrays are empty");
    }
    for(let num of arr){
      if(typeof num === "number" && num !== Infinity && num !== -Infinity && !(Number.isNaN(num))){
      }
      else if(typeof num === "string"){
      }
      else if(typeof num === "boolean"){
      }
      else if(typeof num === "undefined"){
      }
      else if(Array.isArray(num)){
      }
      else if(typeof num === "object"){
      }
      else{
        throw TypeError("Please ensure that the elements in each input array are either a primitive datatype, nested array, or object");
      }
    }
  }
  arrays.forEach(arr => validate_input_arrays(arr));  

  let validate_inner_arrays = (arr) => {
    for(let num of arr){
      if(typeof num === "number" && num !== Infinity && num !== -Infinity && !(Number.isNaN(num))){
      }
      else if(typeof num === "string"){
      }
      else if(typeof num === "boolean"){
      }
      else if(typeof num === "undefined"){
      }
      else if(Array.isArray(num)){
      }
      else if(typeof num === "object"){
      }
      else{
        throw TypeError("Please ensure that the elements in each inner array are either a primitive datatype, nested array, or object");
      }
    }
  }

  // logic
  let compare_objs = (obj1, obj2) =>{
    if(obj1 === null && obj2 === null){
      return true;
    }
    let obj1_keys = Object.keys(obj1);
    let obj2_keys = Object.keys(obj2);
    if (obj1_keys.length !== obj2_keys.length){
      return false;
    }
    for(let key in obj1){
      if(key.trim().length === 0){
        throw RangeError("Please ensure that the keys in your object are not empty string");
      }
      if(key in obj2){
            if(typeof obj1[key] === "string"){
              obj1[key] = obj1[key].trim();
            }
            if(typeof obj2[key] === "string"){
              obj2[key] = obj2[key].trim();
            }
            if(Array.isArray(obj1[key]) && Array.isArray(obj2[key])){
              validate_inner_arrays(obj1[key]);
              validate_inner_arrays(obj2[key]);
              if(!compare_arrays(obj1[key], obj2[key])){
                return false;
              }
            }
            else if(typeof obj1[key] === "object" && typeof obj2[key] === "object" && obj1){
              if(!compare_objs(obj1[key], obj2[key])){
                return false;
              }
            }
            else if(obj1[key] === obj2[key]){
            }
            else{
              return false;
            } 
      }
      else{
        return false;
      }
  }

  return true;
  }

  let base_array = arrays[0];
  let compare_arrays = (arr, base_array) => {
    if(base_array.length !== arr.length){
      return false;
    }
    for(let idx = 0; idx < base_array.length; idx++){
      if(typeof base_array[idx] === "string"){
        base_array[idx] = base_array[idx].trim();
      }
      if(typeof arr[idx] === "string"){
        arr[idx] = arr[idx].trim();
      }
      if(Array.isArray(base_array[idx]) && Array.isArray(arr[idx])){
        validate_inner_arrays(base_array[idx]);
        validate_inner_arrays(arr[idx]);
        if(!compare_arrays(arr[idx], base_array[idx])){
          return false;
        }
      }
      else if(typeof arr[idx] === "object" && typeof base_array[idx] === "object"){
        if(arr[idx] === null && base_array[idx] === null){
        }
        else{
          if(!compare_objs(arr[idx], base_array[idx])){
            return false;
          }
        }
      }
      else if(typeof arr[idx] === "undefined" && typeof base_array[idx] === "undefined"){
      }
      else if(arr[idx] === base_array[idx]){
      }
      else{
        return false;
      }
    }

    return true;
  }

  for(let idx = 1; idx < arrays.length; idx++){
    if(!compare_arrays(arrays[idx], base_array)){
      return false;
    }
  }

  return true;
};
