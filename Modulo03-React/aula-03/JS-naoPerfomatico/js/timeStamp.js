function leftPad(value, count = 2, char = '0') {
  const string = value.toString();
  let newValue = string;

  if (string.length < count) {
    for (let i = 0; i < count - string.length; i++) {
      newValue = char + newValue;
    }
  }
  return newValue;
}

function getNewTimeStamp() {
  const now = new Date();
  let result = '';

  result += leftPad(now.getDate());
  result += '/';
  result += leftPad(now.getMonth() + 1);
  result += '/';
  result += now.getFullYear();
  result += ' ';
  result += leftPad(now.getHours());
  result += ':';
  result += leftPad(now.getMinutes());
  result += ':';
  result += leftPad(now.getSeconds());
  result += '.';
  result += leftPad(now.getMilliseconds(), 3);
  console.log(now.getMilliseconds());

  return result;
}
