/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let replaceCharsAtIndexes = (str, idxArr) => {
      // error handling
      if(typeof str !== "string"){
            throw TypeError("Please enter a string");
      }
      if(!Array.isArray(idxArr)){
            throw TypeError("Please enter an array");
      }
      if(idxArr.length === 0){
            return str;
      }
      str = str.trim();
      if(str.length === 0){
            throw RangeError("Please enter a non-empty string");
      }
      for(let idx of idxArr){
            if(idx < 1 || idx > (str.length - 2)){
                  throw RangeError("Please enter indices that are valid within the given string") 
            }
            if(typeof idx !== "number" || idx === Infinity || idx === -Infinity || Number.isNaN(idx)){
                  throw TypeError("Please only enter numbers in your array")
            }
      }

      // logic
      for(let idx of idxArr){
            let toggle = false
            let first = true;
            let base_string = str.slice(0, idx);
            let curr = str[idx]
            let prev = str[idx - 1]
            let next = str[idx + 1]

            for(let char = idx; char < str.length; char++){
                  if(str[char] === curr){
                        if(first === true){
                              base_string += str[char];
                              first = false;
                        }
                        else{
                              if(toggle === false){
                                    base_string += prev;
                                    toggle = true;
                              }
                              else if(toggle === true){
                                    base_string += next;
                                    toggle = false;;
                              }
                        }
                  }
                  else{
                        base_string += str[char];
                  }           
            }
            str = base_string;
      }

      return str;
};

export let anagrams = (str, target) => {
      // error handling
      if(typeof str !== "string"){
            throw TypeError("Please enter a string for your sentence");
      }
      if(typeof target !== "string"){
            throw TypeError("Please enter a string for your target word");
      }
      str = str.trim();
      target = target.trim();
      if(str.length === 0){
            throw RangeError("Please enter a non-empty string for your sentence");
      }
      if(target.length === 0){
            throw RangeError("Please enter a non-empty string for target word");
      }

      // logic
      let anagrams_list = [];
  
      let lowercase_target = target.toLowerCase();
      let lowercase_targetArr = lowercase_target.split("");
      let lowercase_sorted_targetArr = lowercase_targetArr.sort();
      let lowercase_sorted_target = lowercase_sorted_targetArr.join("")

      let strArr = str.split(" ");
      for(let word of strArr){
            let lowercase_word = word.toLowerCase();
            let lowercase_wordArr = lowercase_word.split("");
            let lowercase_sorted_wordArr = lowercase_wordArr.sort();
            let lowercase_sorted_word = lowercase_sorted_wordArr.join("")

            if(lowercase_sorted_word === lowercase_sorted_target){
                  anagrams_list.push(word);
            }
      }

      return anagrams_list;
}

export let charSwap = (str1, str2) => {
      //error handling
      if(typeof str1 !== "string" || typeof str2 !== "string"){
            throw TypeError("Please only enter strings for both inputs");
      }      
      str1 = str1.trim();
      str2 = str2.trim();
      if(str1.length === 0 || str2.length === 0){
            throw RangeError("Please enter a non-empty string for both inputs")
      }
      if(str1.length < 2 || str2.length < 2){
            throw RangeError("Please ensure that both strings have at least two characters")
      }
      
      // logic
      let performSwap = (str1, str2, n) => {
            let str1_swapped = "";
            let str2_swapped = "";

            let str1_start = str1.slice(0, n);
            let str1_end = str1.slice(n, str1.length);
            let str2_start = str2.slice(0, str2.length - n);
            let str2_end = str2.slice(str2.length - n, str2.length);

            str1_swapped += str2_end += str1_end;
            str2_swapped += str2_start += str1_start; 
            return str1_swapped + " " + str2_swapped;
      }

      if(str1.length === str2.length){
            let n = 2;
            return performSwap(str1, str2, n);
      }
      else{
            let n = (Math.abs(str1.length - str2.length)) / 2; 
            n = Math.floor(n);
            return performSwap(str1, str2, n);
      }
};
