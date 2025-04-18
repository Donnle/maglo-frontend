export const generateInputs = (args: Record<string, any>) => {
  return Object.keys(args)
    .map((key) => `[${key}]="${key}"`)
    .join(' ');
};
