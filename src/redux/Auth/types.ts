export interface AuthState {
    readonly successResponse: boolean,
    readonly bearerToken: string,
    readonly error: boolean,
    readonly loading: boolean,
}

export const enum AuthStateAction {
    FETCH_REQUEST = '@@auth/fetchRequest',
    SET_BEARER_TOKEN = '@@auth/setBearerToken',
    REGISTRATION_USER = '@@auth/registrationUser'
}