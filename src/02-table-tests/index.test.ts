// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: -1, b: 5, action: Action.Subtract, expected: -6 },
  { a: 11, b: 5, action: Action.Multiply, expected: 55 },
  { a: 555, b: 5, action: Action.Divide, expected: 111 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 5, b: 5, action: 'test', expected: null },
  { a: '7', b: 2, action: Action.Multiply, expected: null },
  { a: 7, b: '2', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should check the result of each action with a and b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
