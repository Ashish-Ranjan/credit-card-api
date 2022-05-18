const fixDoubleDigit = (number) => {
  return number > 9 ? number - 9 : number;
};

const luhnValidation = (cardNumber) => {
  const digits = cardNumber.trim().split("").map(Number);
  const sum = digits
    .map((digit, index) =>
      index % 2 === digits.length % 2 ? fixDoubleDigit(digit * 2) : digit
    )
    .reduce((tempSum, digit) => (tempSum += digit), 0);
  return sum % 10 === 0;
};

module.exports = { luhnValidation };
