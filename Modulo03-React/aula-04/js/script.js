window.addEventListener('load', () => {
  const animal = new Animal('gato');
  animal.speak();
  const cat = new Cat('fufu', 'siames');
  cat.speak();
  const dog = new Dog('toto', 'york shire');
  dog.speak();
});

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} falando...`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) miando...`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) latindo...`);
  }
}
