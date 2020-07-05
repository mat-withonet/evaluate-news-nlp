// Got these tests from Jests getting started docs: https://jestjs.io/docs/en/getting-started.html


// In the console, run: npm run test1

import { checkURL } from './formHandler'

test('This function does not return anything it is expected to be undefined', () => {
  expect(checkURL()).toBeUndefined();
});


