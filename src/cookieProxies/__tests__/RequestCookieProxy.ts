jest.unmock('inversify');
jest.unmock('../../constants');
jest.unmock('../../constants/internalConfig');
jest.unmock('../RequestCookieProxy');
jest.unmock('../CookieProxy');

import { COOKIE_AUTH_TOKEN_KEY } from '../../constants';
import RequestCookieProxy from '../RequestCookieProxy';

describe('RequestCookieProxy', () => {
  const context = {
    request: {
      req: {
        cookies: {
          [COOKIE_AUTH_TOKEN_KEY]: '1234',
        },
      },
      res: {
        cookie: jest.fn(),
      },
    },
  };

  it('reads the current auth token', () => {
    const cookieProxy = new RequestCookieProxy(<any>context);

    /* tslint:disable */
    const { authToken } = cookieProxy;
    /* tslint:enable */

    expect(context.request.req.cookies[COOKIE_AUTH_TOKEN_KEY])
      .toEqual('1234');
  });

  it('set the auth token', () => {
    const cookieProxy = new RequestCookieProxy(<any>context);

    cookieProxy.authToken = '1234';

    expect(context.request.res.cookie).toBeCalledWith(
      COOKIE_AUTH_TOKEN_KEY,
      '1234'
    );
  });

  it('removes the auth token', () => {
    const cookieProxy = new RequestCookieProxy(<any>context);

    cookieProxy.deleteAuthToken();

    expect(context.request.res.cookie).toBeCalledWith(
      COOKIE_AUTH_TOKEN_KEY,
      undefined
    );
  });
});

