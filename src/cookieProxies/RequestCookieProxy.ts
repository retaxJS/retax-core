import { injectable, inject } from 'inversify';

import { ICookieProxy } from './interfaces';
import CookieProxy from './CookieProxy';

import { COOKIE_AUTH_TOKEN_KEY } from '../constants';
import { IContext } from '../context';

import { CONTEXT } from '../inversify/identifiers';

@injectable()
export default class RequestCookieProxy extends CookieProxy implements ICookieProxy {

  constructor(
    @inject(CONTEXT) private _context: IContext
  ) {
    super();
  }

  public deleteAuthToken(): void {
    this._context.request.res.cookie(COOKIE_AUTH_TOKEN_KEY, undefined);
  }

  protected _setAuthToken(token: string): void {
    if (!token) return;

    this._context.request.res.cookie(COOKIE_AUTH_TOKEN_KEY, token);
  }

  protected _readAuthToken(): string {
    return this._context.request.req.cookies[COOKIE_AUTH_TOKEN_KEY];
  }
}
