import * as React from 'react';
import { AuthRestI } from '../../service/AuthRestAPI';


const {
  Provider: AuthRestProvider,
  Consumer: AuthRestConsumer,
} = React.createContext<AuthRestI>(null);

export {
    AuthRestProvider,
    AuthRestConsumer,
};