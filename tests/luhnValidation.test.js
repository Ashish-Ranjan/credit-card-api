const { luhnValidation } = require("../src/validation/luhnValidation");

test("Should return a true for 19 digit credit card number", () => {
  const result = luhnValidation("6304219447607087665");
  expect(result).toBe(true);
});

test("Should return a true for 16 digit credit card number", () => {
  const result = luhnValidation("8888888888888888");
  expect(result).toBe(true);
});

test("Should return a false for 19 digit invalid credit card number", () => {
  const result = luhnValidation("88888888888888898888");
  expect(result).toBe(false);
});

test("Should return a false for 16 digit invalid credit card number", () => {
  const result = luhnValidation("8888888888888889");
  expect(result).toBe(false);
});
