import { Reducer } from 'redux';
import { UserState, UserStateAction } from './types';

const initialState: UserState = {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    friendCount: null,
    profilePic: null,
}

const reducer: Reducer<UserState> = (state: UserState = initialState, action) => {
    switch (action.type) {
        case UserStateAction.SET_ID:
        case UserStateAction.SET_USERNAME:
        case UserStateAction.SET_FIRST_NAME:
        case UserStateAction.SET_LAST_NAME:
        case UserStateAction.SET_EMAIL:
        case UserStateAction.SET_FRIEND_COUNT:
        case UserStateAction.SET_PROFILE_PIC:
            return {
                ...state,
                [action.payload]: action.payload
            }
        case UserStateAction.REGISTER_USER:
        case UserStateAction.LOGIN_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default reducer;