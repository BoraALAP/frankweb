import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import appContext from "./context/context";
import appReducer, { initialState } from "./context/reducer";

import { ThemeProvider } from "styled-components";
import { primaryTheme, secondaryTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";

import Layout from "./components/global/Layout";
import SearchResult from "./pages/SearchResult";
import DoorApplication from "./pages/DoorApplication";

import DisplayAll from "./pages/DisplayAll";
import Push from "./pages/Push";
import TemplateDoor from "./template/TemplateDoor";
import TemplateSidelite from "./template/TemplateSidelite";
import TemplateTransom from "./template/TemplateTransom";
import TemplateGlass from "./template/TemplateGlass";

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
              <Route path="/search" component={SearchResult} />
              <Route path="/push" component={Push} />
              <Route path="/product/door/:id" component={TemplateDoor} />
              <Route
                path="/product/sidelite/:id"
                component={TemplateSidelite}
              />
              <Route path="/product/transom/:id" component={TemplateTransom} />
              <Route path="/product/glass/:id" component={TemplateGlass} />
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
