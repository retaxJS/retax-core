import { Request, Response } from 'express';

import { IRetaxConfig } from '../../configStores';

export interface IAssets {
  javascript: Object;
  styles?: Object;
}

export interface IRequestContext {
  req: Request;
  res: Response;
}

export interface IContext {
  history: HistoryModule.History;
  retaxConfig: IRetaxConfig;
  request?: IRequestContext;
}
