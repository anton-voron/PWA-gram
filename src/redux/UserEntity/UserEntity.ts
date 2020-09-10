export default class UserEntity {
  private id: number | null;

  private username: string | null;

  private firstName: string | null;

  private lastName: string | null;

  private email: string | null;

  private friendCount: number | null;

  private profilePic: ImageData | null;

  constructor(
    id?: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    friendCount?: number,
    profilePic?: ImageData | null
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.friendCount = friendCount;
    this.profilePic = profilePic;
  }

  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getFriendCount(): number {
    return this.friendCount;
  }

  public getProfilePic(): ImageData {
    return this.profilePic;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setFriendCount(friendCount: number): void {
    this.friendCount = friendCount;
  }

  public setProfilePic(profilePic: ImageData): void {
    this.profilePic = profilePic;
  }
}
