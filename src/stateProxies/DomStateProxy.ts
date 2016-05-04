import { injectable, inject } from 'inversify';

import { IStateProxy } from './interfaces';
import AStateConverter from './StateConverter';

import { INITIAL_STATE_KEY } from '../constants';
import { IRetaxConfigStore } from '../configStores';

import { RETAX_CONFIG_STORE } from '../inversify/identifiers';

@injectable()
export default class DomStateProxy extends AStateConverter implements IStateProxy {
  constructor(
    @inject(RETAX_CONFIG_STORE) private _retaxConfigStore: IRetaxConfigStore
  ) {
    super();
  }

  public read<S>(): S {
    const { nonImmutableKeys } = this._retaxConfigStore.config.store;

    const serverState = window[INITIAL_STATE_KEY];

    const immutableState = this.convertStateToImmutable<S>(serverState, nonImmutableKeys);

    return immutableState;
  }
}
