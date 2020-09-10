import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Action } from 'redux';

import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Loading from '../Loading/Loading';
import { login, registration, fetchRequest } from '../../redux/Auth/actions';
import { AppState } from '../../redux';
import AuthRequest from '../../utils/AuthRequest';
import { AuthState } from '../../redux/Auth/types'
import withAuthRestAPI, { AuthRestAPI } from "./withAuthRestAPI";
import { UserState } from '../../redux/UserEntity/types';



const withData = (Wrapped: any) => {

    const mapStateToProps = (state: AppState) => {
        return {
            ...state.auth
        }
    };

    const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
        return bindActionCreators({
            login: (request: AuthRequest) => login(ownProps.authRestAPI)(request),
            registration: (request: UserState) => registration(ownProps.authRestAPI)(request)
        }, dispatch)
    }

    return connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<AuthState> {
        render() {
            if (this.props.error) {
                return <ErrorIndicator />
            }
            if (this.props.error) {
                return <Loading />
            }

            return <Wrapped {...this.props} />
        }
    })


}

export default withData;