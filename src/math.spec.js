import { isEven } from './math';

describe('isEven', () => {
  it('should return true if the number is even', () => {
    const res = isEven(2);
    expect(res).toEqual(true);
  });
  it('should return false if the number is odd', () => {
    const res = isEven(1);
    expect(res).toEqual(false);
  });
});
