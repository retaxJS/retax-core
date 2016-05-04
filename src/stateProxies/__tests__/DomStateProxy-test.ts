jest.unmock('inversify');
jest.unmock('../../constants');
jest.unmock('../../constants/internalConfig');
jest.unmock('../DomStateProxy');

import { INITIAL_STATE_KEY } from '../../constants';
import DomStateProxy from '../DomStateProxy';

describe('DomStateProxy', () => {
  const retaxConfigStore = {
    config: {
       store: {
        nonImmutableKeys: ['routing'],
      },
    },
  };

  it('reads the initial state and convert it to an immutable object', () => {
    const proxy = new DomStateProxy(<any>retaxConfigStore);

    window[INITIAL_STATE_KEY] = {
      app: {
        here: true,
      },
    };

    proxy.read();

    expect(proxy.convertStateToImmutable)
      .toBeCalledWith({
        app: {
          here: true,
        },
      }, [
          'routing',
      ]);

  });
});
