jest.unmock('inversify');
jest.unmock('retax-utils');
jest.unmock('../InternalConfigStore');

import InternalConfigStore from '../InternalConfigStore';

describe('InternalConfigStore', () => {
  it('set the default config', () => {
    const store = new InternalConfigStore();

    expect(store.config).toEqual({
      COOKIE_AUTH_TOKEN_KEY: 'auth_token',
      INITIAL_STATE_KEY: '__INITIAL_STATE__',
    });
  });
});
