import { makeResponse } from './index.js'


test('This function has a return so it should be defined', () => {
  expect(makeResponse("Words", {"More words": "Even more words", "polarity": "Coulpe words"})).toBeDefined();
});
