import { Reducer } from 'redux';
import { AuthState, AuthStateAction } from './types';

const initialState: AuthState = {
    successResponse: true,
    bearerToken: null,
    error: false,
    loading: false,
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthStateAction.FETCH_REQUEST:
            return {
                ...state,
                successResponse: action.payload
            }
        case AuthStateAction.SET_BEARER_TOKEN:
            return {
                ...state,
                bearerToken: action.payload
            }
        default: {
            return state;
        }
    }
}

export default reducer;