import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 8;
  const b = 9;
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a, b, action: Action.Add });
    expect(sum).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const difference = simpleCalculator({ a, b, action: Action.Subtract });
    expect(difference).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const product = simpleCalculator({ a, b, action: Action.Multiply });
    expect(product).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const quotient = simpleCalculator({ a, b, action: Action.Divide });
    expect(quotient).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const degree = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(degree).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: 'invalidAction' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: String(a),
      b: [b],
      action: Action.Add,
    });
    expect(result).toBe(null);
  });
});
