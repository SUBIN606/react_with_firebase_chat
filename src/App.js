import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { auth } from "./services/firebase";

import "./styles.css";

// import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const initialState = {
  authenticated: false,
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_USER":
      return { ...state, authenticated: action.result };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { authenticated } = state;
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "GET_USER",
          result: true,
        });
      } else {
        dispatch({
          type: "GET_USER",
          result: false,
        });
      }
    });
  }, []);
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        />
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
        />
        <PublicRoute
          path={["/", "/login"]}
          authenticated={authenticated}
          component={Login}
        />
      </Switch>
    </Router>
  );
}

export default App;
