export const cellTypes = ['snake', 'apple', '.'] as const;

export type CellType = typeof cellTypes[number];
