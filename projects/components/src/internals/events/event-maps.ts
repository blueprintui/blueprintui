import { TouchCoordinate } from '../controllers/interaction-touch.controller.js';

/**
 * Event map interfaces for strongly typed custom events.
 * Each interface maps event names to their CustomEvent types with proper detail typing.
 */

// Controller Event Maps

export interface TypeClosableEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface InteractionExpandEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface InteractionTouchEventMap extends Record<string, Event> {
  'bp-touchstart': CustomEvent<{ x: number; y: number }>;
  'bp-touchmove': CustomEvent<TouchCoordinate>;
  'bp-touchend': CustomEvent<TouchCoordinate>;
}

export interface InteractionTextChangeEventMap extends Record<string, Event> {
  'bp-textchange': CustomEvent<void>;
}

export interface InteractionRangeSelectionEventMap extends Record<string, Event> {
  'range-change': CustomEvent<HTMLElement[]>;
  'range-input': CustomEvent<HTMLElement[]>;
}

export interface InteractionResponsiveEventMap extends Record<string, Event> {
  'resize-layout': CustomEvent<DOMRectReadOnly>;
}

export interface InteractionResizeContextEventMap extends Record<string, Event> {
  'resize-input': CustomEvent<number>;
}

export interface TypeFormControlEventMap {
  input: InputEvent;
  change: Event;
  reset: Event;
}

export interface TypeFormRadioEventMap extends TypeFormControlEventMap {
  _change: Event;
}

export interface TypeFormCheckboxEventMap {
  change: Event;
}

// Component Event Maps

export interface BpDialogEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface BpDropdownEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface BpPopoverEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface BpToastEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface BpDrawerEventMap extends Record<string, Event> {
  open: CustomEvent<void>;
  close: CustomEvent<void>;
}

export interface BpPaginationInputEventMap extends Record<string, Event> {
  input: Event;
  change: Event;
  size: CustomEvent<number>;
}

export interface BpRatingEventMap {
  input: InputEvent;
  change: InputEvent;
}

export type BpFileEventMap = TypeFormControlEventMap;
