// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: -1, action: Action.Add });
    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 6, action: Action.Subtract });
    expect(result).toBe(4);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 55, b: 2, action: Action.Multiply });
    expect(result).toBe(110);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 55, b: 5, action: Action.Divide });
    expect(result).toBe(11);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 8,
      action: Action.Exponentiate,
    });
    expect(result).toBe(256);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 44, b: 5, action: 'test' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result_1 = simpleCalculator({
      a: '7',
      b: 2,
      action: Action.Multiply,
    });
    const result_2 = simpleCalculator({
      a: 7,
      b: '2',
      action: Action.Multiply,
    });
    expect(result_1).toBeNull();
    expect(result_2).toBeNull();
  });
});
