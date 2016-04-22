import { Store } from 'redux';

import { IAsyncInitializable } from '../../mediator';

export interface IMatchArgs extends ReactRouter.MatchArgs {};

export interface IMatchResult {
  redirectLocation: HistoryModule.Location;
  renderProps: ReactRouter.IRouterContextProps;
}

export interface IResolveRouteConfig extends ReactRouter.MatchArgs {
  store: Store<any>;
}

export interface IReactRouterFacade extends IAsyncInitializable<void, ReactRouter.IRouterContextProps> {
  renderProps: ReactRouter.IRouterContextProps;

  resolveRoute(): Promise<ReactRouter.IRouterContextProps>;
}
