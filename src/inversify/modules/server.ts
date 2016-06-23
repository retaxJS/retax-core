import { interfaces, KernelModule } from 'inversify';

import { ICookieProxy, RequestCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ServerBuilder } from '../../JSXBuilders';
import { IStateProxy, RequestStateProxy } from '../../stateProxies';
import { IRetaxConfigStore, RequestRetaxConfigStore } from '../../configStores';

import {
  RETAX_CONFIG_STORE,
  COOKIE_PROXY,
  JSX_BUILDER,
  STATE_PROXY,
} from '../identifiers';

export default new KernelModule((bind: interfaces.Bind) => {
  bind<IRetaxConfigStore>(RETAX_CONFIG_STORE).to(RequestRetaxConfigStore).inSingletonScope();
  bind<ICookieProxy>(COOKIE_PROXY).to(RequestCookieProxy).inSingletonScope();
  bind<IStateProxy>(STATE_PROXY).to(RequestStateProxy).inSingletonScope();
  bind<IJSXBuilder>(JSX_BUILDER).to(ServerBuilder);
});
