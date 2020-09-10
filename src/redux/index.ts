import { combineReducers } from 'redux';
import userReducer from './UserEntity/reducer';
import applicationReducer from './Auth/reducer';
import { UserState } from './UserEntity/types';
import { AuthState } from './Auth/types';

export function createReducer() {
  return combineReducers({
    auth: applicationReducer,
    user: userReducer
  });
}

export interface AppState {
  auth: AuthState
  user: UserState,
}