import { injectable } from 'inversify';
import * as Cookie from 'js-cookie';

import { ICookieProxy } from './interfaces';
import CookieProxy from './CookieProxy';

import { COOKIE_AUTH_TOKEN_KEY } from '../constants';

@injectable()
export default class DomCookieProxy extends CookieProxy implements ICookieProxy {
  public deleteAuthToken(): void {
    Cookie.remove(COOKIE_AUTH_TOKEN_KEY);
  }

  protected _setAuthToken(token: string): void {
    if (!token) return;

    Cookie.set(COOKIE_AUTH_TOKEN_KEY, token, { expires: 1 });
  }

  protected _readAuthToken(): string {
    return Cookie.get(COOKIE_AUTH_TOKEN_KEY);
  }
}
