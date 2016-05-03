import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder } from './interfaces';

import { IInversifyKernelFacade } from '../inversifyKernelFacade';
import { RetaxProvider } from '../components';
import { IRetaxConfigStore } from '../configStores';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade } from '../reactRouter';

import {
  RETAX_PROVIDER_COMPONENT,
  RETAX_CONFIG_STORE,
  REDUX_FACADE,
  REACT_ROUTER_FACADE,
} from '../inversify';

@injectable()
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    @inject(RETAX_CONFIG_STORE) private _retaxConfigStore: IRetaxConfigStore,
    @inject(RETAX_PROVIDER_COMPONENT) private RetaxProviderComponent: typeof RetaxProvider,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade
  ) {}

  public build(kernel: IInversifyKernelFacade): JSX.Element {
    const { RetaxProviderComponent } = this;
    const { react: { appendChild } } = this._retaxConfigStore.config;
    const { store } = this._reduxFacade;
    const { renderProps } = this._routerFacade;

    return (
      <RetaxProviderComponent kernel={kernel}>
        <Provider store={store} key="provider">
          <div className="flex layout vertical">
            <RouterContext {...renderProps} />
            {appendChild && React.Children.only(appendChild)}
          </div>
        </Provider>
      </RetaxProviderComponent>
    );
  }
}
