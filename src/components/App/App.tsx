import * as React from "react";
import "./App.scss";
import Registration from '../Froms/Registration/Registration';
import SignIn from '../Froms/SignIn/SignIn';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from "../../Page/Profile";

interface AppI {

}


const App = (props: AppI) => {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/registration" component={Registration} />
          <Route path="/" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
