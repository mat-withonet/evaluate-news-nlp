import { makeResponse } from './index.js'


test('This function has a return so it should be defined', () => {
  expect(makeResponse("blahblah", {"subjectivity": "blehblehbleh", "polarity": "blublu"})).toBeDefined();
});
