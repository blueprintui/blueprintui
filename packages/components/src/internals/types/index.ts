export type Directions = 'up' | 'down' | 'left' | 'right';

export type Permutations<T extends string, U extends string = T> = T extends any
  ? T | `${T} ${Permutations<Exclude<U, T>>}`
  : never;
