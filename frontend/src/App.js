import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import appContext from "./context/context";
import appReducer, { initialState } from "./context/reducer";

import { ThemeProvider } from "styled-components";
import { primaryTheme, secondaryTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";

import Layout from "./components/global/Layout";
import DoorApplication from "./pages/DoorApplication";

import DisplayAll from "./components/applicationComponents/DisplayAll";

const App = () => {
  const [store, dispatch] = useReducer(appReducer, initialState);

  return (
    <appContext.Provider value={{ store, dispatch }}>
      <ThemeProvider theme={store.theme ? primaryTheme : secondaryTheme}>
        <GlobalStyle />
        <Router>
          <Layout>
            <Switch>
              <Route path="/application" component={DoorApplication} />
              <Route path="/" exact>
                <DisplayAll />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </appContext.Provider>
  );
};

export default App;
