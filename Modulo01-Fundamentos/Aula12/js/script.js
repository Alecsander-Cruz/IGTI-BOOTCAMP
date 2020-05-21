window.addEventListener('load', () => {
  // doSpread();
  // doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Mrs'
  );

  const marriedPeople = [...marriedWomen, ...marriedMen, { msg: 'oi' }];

  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2));
  console.log(infiniteSum(1, 2, 100000));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

function doDestructuring() {
  const first = people.results[0];

  // const username = first.login.username;
  // const password = first.login.password;

  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}
