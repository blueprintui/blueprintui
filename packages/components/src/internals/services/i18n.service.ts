import { GlobalStateService } from './global.service.js';

export interface I18nStrings {
  custom?: any;
  actions: {
    sort: string;
    none: string;
    ascending: string;
    descending: string;
    expand: string;
    close: string;
    resize: string;
    filter: string;
    loading: string;
    show: string;
    hide: string;
    previous: string;
    next: string;
    first: string;
    last: string;
    today: string;
    browse: string;
    removeFile: string;
    files: string;
    resizeColumn: string;
    closeDetails: string;
    noData: string;
    action: string;
    dropTarget: string;
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
    pageSize: string;
  };
}

export const i18nRegistry: I18nStrings = {
  actions: {
    sort: 'sort',
    none: 'none',
    ascending: 'ascending',
    descending: 'descending',
    expand: 'expand',
    close: 'close',
    resize: 'resize',
    filter: 'filter',
    loading: 'loading',
    show: 'show',
    hide: 'hide',
    previous: 'previous',
    next: 'next',
    first: 'first',
    last: 'last',
    today: 'today',
    browse: 'browse',
    removeFile: 'remove file',
    files: 'files',
    resizeColumn: 'resize column',
    closeDetails: 'close details',
    noData: 'no results found',
    action: 'action',
    dropTarget: 'drop item',
    firstPage: 'go to first page',
    previousPage: 'go to previous page',
    nextPage: 'go to next page',
    lastPage: 'go to last page',
    pageSize: 'items per page'
  }
};

type PartialRecursive<T> = T extends object ? { [K in keyof T]?: PartialRecursive<T[K]> } : T;

export class I18nService {
  static get keys(): Readonly<I18nStrings> {
    if (Object.keys(GlobalStateService.state.i18nRegistry).length === 0) {
      GlobalStateService.dispatch('i18nRegistry', { i18nRegistry });
    }

    return { ...i18nRegistry, ...GlobalStateService.state.i18nRegistry } as I18nStrings;
  }

  static set keys(i18nRegistry: PartialRecursive<I18nStrings>) {
    GlobalStateService.dispatch('i18nRegistry', { i18nRegistry });
  }
}
