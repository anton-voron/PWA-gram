import AuthResponse from "../utils/AuthResponse";
import AuthRequest from '../utils/AuthRequest';
import { UserState } from "../redux/UserEntity/types";
import BaseRestAPI, { BaseRestI } from "./BaseRestAPI";

export interface AuthRestI extends BaseRestI {
  readonly _registrationUrl: string;
  readonly _loginUrl: string;
  postResource(url: string, data: AuthRequest): Promise<any>;
  login(request: AuthRequest): Promise<AuthResponse>;
  registration(request: UserState): Promise<UserState>;
}

export default class AuthRestAPI extends BaseRestAPI implements AuthRestI {
  readonly _registrationUrl: string = `${this._baseUrl}/registration`;
  readonly _loginUrl: string = `${this._baseUrl}/login`;

  public async postResource(url: string, request: AuthRequest | UserState): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Connection': 'keep-alive'
      }
    })

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${url}` + `, recived ${response.status}}`
      );
    } else {
      return response.json();
    }
  };

  public async login(request: AuthRequest): Promise<AuthResponse> {
    const data = await this.postResource(this._loginUrl, request);
    console.log(data);

    return new AuthResponse(data.token, data.issueDate, data.expirationDate, data.user);
  }

  public async registration(request: UserState): Promise<UserState> {
    return await this.postResource(this._registrationUrl, request);
  }
}
