// Testing

import { checkURL } from './formHandler'

test('the best drink for octopus flavor is undefined', () => {
  expect(checkURL()).toBeUndefined();
});