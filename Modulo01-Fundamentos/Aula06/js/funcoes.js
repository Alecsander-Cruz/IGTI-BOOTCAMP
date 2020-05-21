function sum(a, b) {
  return a + b;
}

function compareNumbers(a, b) {
  // return a > b ? 1 : a < b ? -1 : 0;
  return a - b;
}

function summation(from, upTo) {
  if (from > upTo) {
    console.log(
      'Não é possível fazer esse somatório, pois o número inicial é maior que o número final!'
    );
    return;
  } else {
    var sum = 0;
    for (var i = from; i <= upTo; i++) {
      sum += i;
    }
    return sum;
  }
}

console.log(sum(1, 5));
console.log(compareNumbers(1, 5));
console.log(compareNumbers(1, 1));
console.log(compareNumbers(1, 0));

console.log(summation(1, 10));
console.log(summation(9, 100));
console.log(summation(1, 1000));
console.log(summation(11, 1));
console.log(summation(-3, 5));
