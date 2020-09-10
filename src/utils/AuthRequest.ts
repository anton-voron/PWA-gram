export default class AuthRequest {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  getUsername(): string {
    return this.username;
  }

  getPawwsord(): string {
    return this.password;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  setPawwsord(password: string): void {
    this.password = password;
  }
}
