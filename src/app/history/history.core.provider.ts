import { Provider } from '@angular/core';
import { History } from './api/history';
import { HistoryStorage } from './infrastructure/history-storage';
import { HistoryResource } from './infrastructure/history-resource';


export const HISTORY_CORE_PROVIDERS: Provider[] = [
  { provide: History, useClass: HistoryStorage },
  HistoryResource,
];
