jest.unmock('inversify');
jest.unmock('../../constants');
jest.unmock('../../constants/internalConfig');
jest.unmock('../DomCookieProxy');
jest.unmock('../CookieProxy');

import { COOKIE_AUTH_TOKEN_KEY } from '../../constants';
import DomCookieProxy from '../DomCookieProxy';
import * as Cookie from 'js-cookie';

describe('DomCookieProxy', () => {
  it('reads the current auth token', () => {
    const cookieProxy = new DomCookieProxy();

    /* tslint:disable */
    const { authToken } = cookieProxy;
    /* tslint:enable */

    expect(Cookie.get).toBeCalledWith(
      COOKIE_AUTH_TOKEN_KEY
    );
  });

  it('set the auth token', () => {
    const cookieProxy = new DomCookieProxy();

    cookieProxy.authToken = '1234';

    expect(Cookie.set).toBeCalledWith(
      COOKIE_AUTH_TOKEN_KEY,
      '1234',
      { expires: 1 }
    );
  });

  it('removes the auth token', () => {
    const cookieProxy = new DomCookieProxy();

    cookieProxy.deleteAuthToken();

    expect(Cookie.remove).toBeCalledWith(
      COOKIE_AUTH_TOKEN_KEY
    );
  });
});

