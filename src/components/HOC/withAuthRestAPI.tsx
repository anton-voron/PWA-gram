import * as React from 'react';
import {AuthRestConsumer} from '../Context/AuthContext';
import { AuthRestI } from '../../service/AuthRestAPI';

const withAuthRestAPI  = (Wrapped: any) => {
    return (props: any) => {
        return <AuthRestConsumer>
            {
                (authRestAPI) => <Wrapped {...props} authRestAPI={authRestAPI}/>
            }
        </AuthRestConsumer>
    }
}

export interface AuthRestAPI extends AuthRestI{}

export default withAuthRestAPI;