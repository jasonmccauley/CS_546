/*
UUsing JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element (this will be the Fibonacci index) 
Calculate the Fibonacci value for the given index
Determine whether or not the number is a prime number
Add a list item to the #fibonacciResults list of numbers you have checked. This list item should have a class of is-prime if it is a prime number, or not-prime it is not.
If the user does not have a value for the input when they submit, you should not continue checking and instead should inform them of an error somehow.


*/
$("#fibonacci_form").submit((event) => {
    event.preventDefault();
    const input = $("#fibonacci_index_input").val().trim();
    $("#error").hide();
    if(input === "" || isNaN(input)){
        $("#error").html("Please enter a number");
        $("#error").show();
        return;
    }
    const parsedInput = parseFloat(input);
    if(!Number.isInteger(parsedInput)){
        $("#error").html("Please enter a whole number or a decimal equivalent");
        $("#error").show();
        return;
    }

    const fibonacciValue = calculateFibonacci(parsedInput);
    const prime = isPrime(fibonacciValue);
    const li = $(`<li class="${prime ? 'is-prime':'not-prime'}">The Fibonacci of ${input} is ${fibonacciValue}.</li>`);
    $("#fibonacciResults").append(li);
    $("#fibonacci_index_input").val("");
});

const calculateFibonacci = (index) => {
  if (index <= 0){
    return 0;
  }
  else if (index === 1) {
      return 1;
  }
  
  let a = 0;
  let b = 1;
  let fib = 0;
  for (let i = 2; i <= index; i++) {
      fib = a + b;
      a = b;
      b = fib;
  }

  return fib;
}

const isPrime = (fibonacciValue) => {
    if(fibonacciValue <= 1) return false;
    for(let i = 2; i <= 0.5*(fibonacciValue); i++){
        if(fibonacciValue % i === 0) return false;
    }
    return true;
}
