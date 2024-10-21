import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 1, b: 2, action: 'invalid_action', expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: 2n, action: Action.Add, expected: null },
  { a: [1], b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should return correct result for valid arguments, null for invalid',
    ({ a, b, action, expected: expectedResult }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expectedResult);
    },
  );
});
