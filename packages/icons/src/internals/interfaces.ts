export interface IconDefinition {
  name: string;
  viewBox?: string;
  type: {
    default: string;
    solid?: string;
  }
}

export type Shape = 'unknown' | '';
export type IconRegistry = { [Key in Shape as string]?: IconDefinition };

export declare type Directions = 'up' | 'down' | 'left' | 'right';
