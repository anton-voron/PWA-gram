import * as React from 'react';

import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';


export default class ErrorBoundry extends React.PureComponent {

    state = {
        hasError: false
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // debugger;
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        return this.props.children;
    };
}