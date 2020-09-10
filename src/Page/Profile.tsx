import * as React from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import LabelTabs from '../components/LabelTabs/LabelTabs';
import Camera from '../components/Camera/Camera';
import withAuthRestAPI, { AuthRestAPI } from '../components/HOC/withAuthRestAPI';
import withData from '../components/HOC/withData';
import { AuthState } from '../redux/Auth/types';
import Posts from '../components/Posts/Posts'


interface ProfileI extends AuthRestAPI, AuthState {
    history: any
}


const Profile = (props: ProfileI) => {



    return (
        <>
            <Switch>
                <Route path="/camera" component={Camera} />
                <Route path="/" component={Posts} />
            </Switch>
            <LabelTabs />
        </>
    );
};

export default withRouter(
    withAuthRestAPI(
        withData(
            (Profile)
        )
    )
);