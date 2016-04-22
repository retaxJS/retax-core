import {
  IActionsCreatorService,
  IActionsCreatorServiceConstructor,
} from './ActionsCreator';

import {
  IUserService,
} from '../../Service';

import { IAction } from 'retax-utils';

/**
 * A service used for lifecycle managment
 */
export interface ILifecycleService extends IActionsCreatorService {
  willResolveRoute?(hasToken: boolean): IAction<any, any>;
  didResolveRoute?(renderProps: ReactRouter.IRouterContextProps): IAction<any, any>;
  historyDidChanged?(location: HistoryModule.Location, renderProps: ReactRouter.IRouterContextProps): IAction<any, any>;
}

/**
 * A service constructor used for lifecycle managment
 */
export interface ILifecycleServiceConstructor extends IActionsCreatorServiceConstructor {
  new(apis?: IUserService[], actionsCreators?: IUserService[]): ILifecycleService;
}
