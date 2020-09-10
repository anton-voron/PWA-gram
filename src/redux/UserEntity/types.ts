export interface UserState {
    readonly id?: number,
    readonly username: string | null,
    readonly firstName: string | null,
    readonly lastName: string | null,
    readonly email: string | null,
    readonly password?: string,
    readonly friendCount?: number,
    readonly profilePic?: ImageData | null,
}

export const enum UserStateAction {
    REGISTER_USER = '@@user/registerUser',
    LOGIN_USER = '@@user/registerUser',
    SET_ID = '@@user/setId',
    SET_USERNAME = '@@user/setUsername',
    SET_FIRST_NAME = '@@user/setFirstName',
    SET_LAST_NAME = '@@user/setLastName',
    SET_EMAIL = '@@user/setEmail',
    SET_FRIEND_COUNT = '@@user/setFriendCount',
    SET_PROFILE_PIC = '@@user/setProfilePic',
}