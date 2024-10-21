import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 3', () => {
    const linkedList = generateLinkedList([1, 2, 3]);
    expect(linkedList).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    });
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 4, 5, 10]);
    expect(linkedList).toMatchSnapshot();
  });
});
