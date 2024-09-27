/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let processObjects = (objArr, func) => {
      // error handling
      if(!Array.isArray(objArr)){
            throw TypeError("Please enter an array")
      }
      if(objArr.length === 0){
            throw RangeError("Please enter a non-empty array");
      }
      for(let obj of objArr){
            if(typeof obj !== "object" || obj === null){
                  throw TypeError("Please enter an array that only contains valid objects");
            }
            
            let objKeys = Object.keys(obj);
            if(objKeys.length === 0){
                  throw RangeError("Please do not put any empty objects in the array");
            }

            for(let key in obj){
                  if(key.trim().length === 0){
                        throw RangeError("Please ensure that the keys in your object are not empty strings");
                  }
                  if(typeof obj[key] !== "number" || obj[key] === Infinity || obj[key] === -Infinity || Number.isNaN(obj[key])){
                        throw TypeError("Please ensure that the values for each key in your object are of the type 'number'");
                  }
            }
      }
      if(typeof func !== "function"){
            throw TypeError("Please enter a function");
      }

      // logic
      let result_objArr = [];
      for(let obj of objArr){
            let result_obj = {};
            for(let key in obj){
                  let result_value = func(obj[key]);
                  result_obj[key] = result_value;
            }
            result_objArr.push(result_obj);
      }

      let combined_resultObjs = {};
      for(let obj of result_objArr){
            for(let key in obj){
                  if(!(key in combined_resultObjs)){
                        combined_resultObjs[key] = obj[key];
                  }
                  else{
                        combined_resultObjs[key] = combined_resultObjs[key] * obj[key];
                  }
            }
      }

      return combined_resultObjs;
};

export let similarKeysValues = (obj1, obj2) => {
      // error handling 
      if(Array.isArray(obj1) || Array.isArray(obj2)){
            throw TypeError("Please ensure that both inputs are objects");
      }
      if(typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null){
            throw TypeError("Please enter valid objects");
      }

      // logic
      let similarObj = {};
      for(let key in obj1){
            if(key.trim().length === 0){
                  throw RangeError("Please ensure that the keys in your object are not empty strings");
            }
            if(key in obj2){
                  if(typeof obj1[key] === "string"){
                        obj1[key] = obj1[key].trim();
                        if(obj1[key].length === 0){
                              throw RangeError("Please ensure that your object does not contain any empty strings")
                        }     
                  }
                  if(typeof obj2[key] === "string"){
                        obj2[key] = obj2[key].trim();
                        if(obj2[key].length === 0){
                              throw RangeError("Please ensure that your object does not contain any empty strings")
                        }
                  }
                  if(typeof obj1[key] === "object" && typeof obj2[key] === "object" && obj1[key] !== null && obj2[key] !== null){
                        let nestedObj = similarKeysValues(obj1[key], obj2[key]);
                              similarObj[key] = nestedObj;
                  }
                  else if(obj1[key] == obj2[key]){
                        similarObj[key] = obj1[key];
                  } 
            }
      }

      return similarObj;
};

export let flipKeysForStringsAndNumbers = (obj) => {
      // error handling
      if(Array.isArray(obj)){
            throw TypeError("Please enter an object");
      }
      if(typeof obj !== "object" || obj === null){
            throw TypeError("Please enter a valid object");
      }
      if(Object.keys(obj).length === 0){
            throw RangeError("Please enter an object with at least one key/value pair");
      }
      for(let key in obj){
            if(key.trim().length === 0){
                  throw RangeError("Please ensure that the keys of your objects are not empty strings");
            }
            if(typeof obj[key] === "string"){
                  obj[key] = obj[key].trim();
                  if(obj[key].length === 0){
                        throw RangeError("Please ensure that the your object does not contain any empty strings");
                  }
            }
            if(Array.isArray(obj[key])){
                  if(obj[key].length === 0){
                        throw RangeError("Please ensure that the array in your object is not empty");
                  }
                  for(let num of obj[key]){
                        if(typeof num === "number" && num !== Infinity && num !== -Infinity && !(Number.isNaN(num))){     
                        }
                        else if(typeof num === "string"){
                              num = num.trim();
                              if(num.length === 0){
                                    throw RangeError("Please ensure that the array in your object does not contain any empty strings");
                              }
                        }
                        else{
                              throw TypeError("Please ensure that the arrays in your object contains strings or valid numbers");
                        }
                  }
            }
            else if(typeof obj[key] === "object" && obj[key] !== null){
                  if(Object.keys(obj[key]).length === 0){
                        throw RangeError("Please ensure that your nested objects are not empty");
                  }
                  for(let keyy in obj[key]){
                        if(keyy.trim().length === 0){
                              throw RangeError("Please ensure that the keys of your nested objects are not empty strings");
                        }
                        if(typeof obj[key][keyy] === "number" && obj[key][keyy] !== Infinity && obj[key][keyy] !== -Infinity && !(Number.isNaN(obj[key][keyy]))){
                        }
                        else if(typeof obj[key][keyy] === "string"){
                              obj[key][keyy] = obj[key][keyy].trim();
                              if(obj[key][keyy].length === 0){
                                    throw RangeError("Please ensure that the values in your nested objects are not empty strings");
                              }
                        }
                        else{
                              throw TypeError("Please ensure that the keys of your nested objects only have strings or valid numbers as values");
                        }          
                  }
            }
      }

      // logic
      let flippedObj = {};
      for(let key in obj){
            if(typeof obj[key] === "string"){
                  obj[key] = obj[key].trim();
            }
            if(Array.isArray(obj[key])){
                  if(obj[key].length === 1){
                       flippedObj[obj[key][0].trim()] = key;
                  }
                  else{
                        for(let idx = 0; idx < obj[key].length; idx++){
                              let value = obj[key][idx];
                              if(typeof value === "string"){
                                    let trimmed_value = value.trim()
                                    flippedObj[trimmed_value] = `${key}_${idx}`;
                              }
                              else{
                                    flippedObj[value] = `${key}_${idx}`; 
                              } 
                        }
                  }
            }
            else if(typeof obj[key] === "object" && obj[key] !== null){
                  let nestedObj = flipKeysForStringsAndNumbers(obj[key])
                  flippedObj[key] = nestedObj;                                                
            }
            else{
                  flippedObj[obj[key]] = key;
            }
      }

      return flippedObj;
};
