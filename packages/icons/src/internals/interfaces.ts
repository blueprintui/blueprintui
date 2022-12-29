export interface IconDefinition {
  name: string;
  viewBox?: number;
  type: {
    default: string;
    solid?: string;
  }
}

export type Shape = 'unknown' | '';
export type IconRegistry = { [Key in Shape as string]?: IconDefinition };

export declare type Directions = 'up' | 'down' | 'left' | 'right';
