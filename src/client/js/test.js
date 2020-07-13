// Jest Test from jest's website

import { checkURL } from './formHandler'

test('This function does not return anything it is expected to be undefined', () => {
  expect(checkURL()).toBeUndefined();
});


