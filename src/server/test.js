import { makeResponse } from './index.js'


test('Should be defined', () => {
  expect(makeResponse("Lorem", {"lorem ipsum": "lorem ipsum", "lorem": "ipsum"})).toBeDefined();
});
