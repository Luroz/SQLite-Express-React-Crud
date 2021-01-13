import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserInfo from "../src/views/UserInfo/UserInfo";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={UserInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
