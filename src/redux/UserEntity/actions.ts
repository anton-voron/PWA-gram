import { UserState, UserStateAction } from "./types";

export const registerUser = (user: UserState) => {
    return {
        type: UserStateAction.REGISTER_USER,
        payload: user
    }
}


export const loginUser = (user: UserState) => {
    return {
        type: UserStateAction.LOGIN_USER,
        payload: user
    }
}