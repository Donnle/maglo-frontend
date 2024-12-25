export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];

  for (let i: number = 0; i < array.length; i += chunkSize) {
    const asd: T[] = array.slice(i, i + chunkSize);
    result.push(asd);
  }

  return result;
}
