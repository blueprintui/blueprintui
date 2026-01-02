declare global {
  interface CommandEvent extends Event {
    readonly command: string;
    readonly source: Element | null;
  }

  interface ToggleEvent extends Event {
    readonly newState: 'open' | 'closed';
    readonly oldState: 'open' | 'closed';
    readonly source: Element | null;
  }

  interface HTMLElement {
    showPopover(options?: { source?: HTMLElement }): void;
    hidePopover(): void;
    togglePopover(options?: { source?: HTMLElement }): void;
    popover: 'auto' | 'manual' | 'hint' | null;
  }
}

export {};
