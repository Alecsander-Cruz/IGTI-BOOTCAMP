async function sum(array) {
  let sum = array.reduce((accumulator, current) => accumulator + current, 0);
  return sum;
}

async function average(array) {
  let sum = array.reduce((accumulator, current) => accumulator + current, 0);
  let average = sum / array.length;
  return average;
}

module.exports = { sum, average };
