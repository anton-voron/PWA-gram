import { AuthStateAction } from './types';
import AuthRestAPI from '../../service/AuthRestAPI';
import { Dispatch } from 'redux';
import AuthRequest from '../../utils/AuthRequest';
import { UserState } from '../UserEntity/types';
import { registerUser, loginUser } from '../UserEntity/actions';

export const fetchRequest = (responseStatus: boolean) => {
    return {
        type: AuthStateAction.FETCH_REQUEST,
        payload: responseStatus,
    }
}


export const setBearerToken = (token: string) => {
    return {
        type: AuthStateAction.SET_BEARER_TOKEN,
        payload: token,
    }
}

export const registration = (authRestAPI: AuthRestAPI) => (request: UserState) => (dispatch: Dispatch) => {
    authRestAPI.registration(request)
        .then(data => {
            dispatch(registerUser(data));
        })
        .catch((error) => { throw new Error(error); });
}

export const login = (authRestAPI: AuthRestAPI) => (request: AuthRequest) => (dispatch: Dispatch) => {
    authRestAPI.login(request)
        .then(data => {
            console.log(data);
            dispatch(setBearerToken(data.getToken()));
            dispatch(loginUser(data.getUser()))
        })
        .catch((error) => { throw new Error(error); });
}

