import { interfaces, KernelModule } from 'inversify';

import { RetaxProvider, ILifecycleService, ILifecycleServiceConstructor } from '../../components';
import { IReactRouterFacade, ReactRouterFacade } from '../../reactRouter';
import { IReduxFacade, ReduxFacade } from '../../redux';
import { IRetaxMediator, RetaxMediator } from '../../mediator';
import { IContext } from '../../context';

import {
  MEDIATOR,
  COMPONENTS,
  REACT_ROUTER_FACADE,
  REDUX_FACADE,
  CONTEXT,
  LIFECYCLE_ACTIONS_CREATOR,
} from '../identifiers';

export default new KernelModule((bind: interfaces.Bind) => {
  bind<IRetaxMediator>(MEDIATOR).to(RetaxMediator).inSingletonScope();
  bind<IReactRouterFacade>(REACT_ROUTER_FACADE).to(ReactRouterFacade).inSingletonScope();
  bind<IReduxFacade>(REDUX_FACADE).to(ReduxFacade).inSingletonScope();

  bind<typeof RetaxProvider>(COMPONENTS.RETAX_PROVIDER_COMPONENT).toConstructor(RetaxProvider);
});


export function contextModuleFactory(context: IContext): interfaces.KernelModule {
  return new KernelModule((bind: interfaces.Bind) => {
    bind<IContext>(CONTEXT).toConstantValue(context);
  });
}

export function lifecycleModuleFactory(LifecycleActionsCreator: ILifecycleServiceConstructor): interfaces.KernelModule {
  return new KernelModule((bind: interfaces.Bind) => {
    if (LifecycleActionsCreator) {
      bind<ILifecycleService>(LIFECYCLE_ACTIONS_CREATOR).to(LifecycleActionsCreator);
    } else {
      bind<ILifecycleService>(LIFECYCLE_ACTIONS_CREATOR).toConstantValue(undefined);
    }
  });
}
