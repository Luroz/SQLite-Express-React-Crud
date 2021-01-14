import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ToastsContainer, ToastsStore} from 'react-toasts'

import UserInfo from "../src/views/UserInfo/UserInfo";

function App() {

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={UserInfo} />
        </Switch>
      </Router>
      <ToastsContainer store={ToastsStore} delay={3000}/>
    </div>
    
  );
}

export default App;
