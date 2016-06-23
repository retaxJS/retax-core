import { KernelModule, interfaces } from 'inversify';

import { ICookieProxy, DomCookieProxy } from '../../cookieProxies';
import { IJSXBuilder, ClientBuilder } from '../../JSXBuilders';
import { IStateProxy, DomStateProxy } from '../../stateProxies';
import { IRetaxConfigStore, DomRetaxConfigStore } from '../../configStores';

import {
  RETAX_CONFIG_STORE,
  COOKIE_PROXY,
  JSX_BUILDER,
  STATE_PROXY,
} from '../identifiers';

export default new KernelModule((bind: interfaces.Bind) => {
  bind<IRetaxConfigStore>(RETAX_CONFIG_STORE).to(DomRetaxConfigStore).inSingletonScope();
  bind<ICookieProxy>(COOKIE_PROXY).to(DomCookieProxy).inSingletonScope();
  bind<IStateProxy>(STATE_PROXY).to(DomStateProxy).inSingletonScope();
  bind<IJSXBuilder>(JSX_BUILDER).to(ClientBuilder);
});
