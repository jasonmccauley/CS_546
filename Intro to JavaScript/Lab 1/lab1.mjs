export const questionOne = (arr) => {
  let sumOfPrimes = 0;
  let sumOfComposites = 0;

  for (let num of arr){
    let numOfFactors = 0;

    for (let factor = 1; factor <= Math.abs(num); factor++){  
      if (num % factor == 0){
        numOfFactors++;
      }
    }

    if (num == 1 || numOfFactors > 2){
      sumOfComposites += num;
    }
    else{
      sumOfPrimes += num;
    }
  }

  return [sumOfPrimes, sumOfComposites, (sumOfPrimes + sumOfComposites) % 2 == 0];
};

export const questionTwo = (index, multiplier) => {
  const Fibonacci = (index) => {
    let fib = 0;
    if (index <= 0){
      fib = 0;
    }
    else if (index == 1){
      fib = 1;
    }
    else{
      fib = Fibonacci(index - 1) + Fibonacci(index - 2);
    }

    return fib;
  }

  let value = Fibonacci(index);
  let multipliedValue = multiplier * value;
  let result = {};
  result[value] = multipliedValue;

  return result;
};

export const questionThree = (str) => {
  str = str.trim();
  let specialCharsRegex = /[1234567890`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi // I referred to noinput's answer on the following Stack Overflow page to help format regex of special characters to be removed: https://stackoverflow.com/questions/4374822/remove-all-special-characters-with-regexp
  str = str.replace(specialCharsRegex, "");
  console.log(str);
  
  let wordCount = 0;
  let start = true;
  for (let char of str){
    if (char != " " && start == true){
      wordCount++;
      start = false;
    }
    else if (char == " "){
      start = true;
    } 
  }
  
  return wordCount;
};

export const questionFour = (arr) => {
  let sum = 0;
  let mean = 0;

  for (let num of arr){
    sum += Math.pow(num, 3);
  }

  mean = sum / arr.length

  return Math.round(mean);
};

export const studentInfo = {
  firstName: 'Jason',
  lastName: 'McCauley',
  studentId: '20006660'
};
