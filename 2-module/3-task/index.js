let calculator = {

  read(a, b) {
    this.a = a;
    this.b = b;
  },

  sum(a, b) {
    return this.a + this.b;
  },

  mul(a, b) {
    return this.a * this.b;
  }

};

console.log(calculator.read(3, 5));
console.log(calculator.sum()); // 8
console.log(calculator.mul()); // 15

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
