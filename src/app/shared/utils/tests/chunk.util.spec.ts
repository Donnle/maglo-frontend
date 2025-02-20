import { chunkArray } from '../chunk.util';

describe('Function chunkArray', () => {
  it('should split the array with multiple values', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result: number[][] = chunkArray<number>(array, 3);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]);
  });

  it('should split the array with NOT multiple values', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    const result: number[][] = chunkArray<number>(array, 3);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8]
    ]);
  });

  it('should return empty array when array argument is empty', () => {
    const array: number[] = [];
    const result: number[][] = chunkArray<number>(array, 3);

    expect(result).toEqual([]);
  });
});
