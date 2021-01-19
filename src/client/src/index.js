import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import Bank from "./components/Bank";

import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/bank/:id" exact>
          <Bank />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
