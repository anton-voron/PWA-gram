import { UserState } from "../redux/UserEntity/types";

export default class AuthResponse {
  private token: string;
  private issueDate: Date;
  private expirationDate: Date;
  private user: UserState;

  constructor(token?: string, issueDate?: Date, expirationDate?: Date, user?: UserState) {
    this.token = token;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.user = user;
  }

  getToken(): string {
    return this.token;
  }
  getIssueDate(): Date {
    return this.issueDate;
  }
  getExpirationDate(): Date {
    return this.expirationDate;
  }

  getUser(): UserState {
    return this.user;
  }

  setToken(token: string): void {
    this.token = token;
  }
  setIssueDate(issueDate: Date): void {
    this.issueDate = issueDate;
  }
  setExpirationDate(expirationDate: Date): void {
    this.expirationDate = expirationDate;
  }

  setUser(user: UserState): void {
    this.user = user;
  }
}
