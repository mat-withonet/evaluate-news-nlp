// Got these tests from Jests getting started docs: https://jestjs.io/docs/en/getting-started.html


const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
