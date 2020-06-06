import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { appContext, editContext } from "./context/context";
import {
  appReducer,
  editReducer,
  initialState,
  editState,
} from "./context/reducer";

import { ThemeProvider } from "styled-components";
import { primaryTheme, secondaryTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";

import Layout from "./components/global/Layout";
import SearchResult from "./pages/SearchResult";
import DoorApplication from "./pages/DoorApplication";

import DisplayAll from "./pages/DisplayAll";
import Push from "./pages/Push";
import TemplateDoor from "./template/TemplateDoor";
import TemplateDoorEditable from "./template/TemplateDoorEditable";
import TemplateSidelite from "./template/TemplateSidelite";
import TemplateTransom from "./template/TemplateTransom";
import TemplateDividedLites from "./template/TemplateDividedLites";
import TemplateGlassFamily from "./template/TemplateGlassFamily";
import DealerFinder from "./pages/DealerFinder";

const App = () => {
  const [store, dispatch] = useReducer(appReducer, initialState);
  const [editStore, editDispatch] = useReducer(editReducer, editState);

  return (
    <appContext.Provider value={{ store, dispatch }}>
      <editContext.Provider value={{ editStore, editDispatch }}>
        <ThemeProvider theme={store.theme ? primaryTheme : secondaryTheme}>
          <GlobalStyle />
          <Router>
            <Layout>
              <Switch>
                <Route path="/application" component={DoorApplication} />
                <Route path="/search" component={SearchResult} />
                <Route path="/dealerFinder" component={DealerFinder} />
                <Route path="/push" component={Push} />
                <Route path="/product/door/:id" component={TemplateDoor} />
                <Route
                  path="/selected/Door/:id"
                  component={TemplateDoorEditable}
                />
                <Route
                  path="/product/sidelite/:id"
                  component={TemplateSidelite}
                />
                <Route
                  path="/product/transom/:id"
                  component={TemplateTransom}
                />
                <Route
                  path="/product/dividedlites/:id"
                  component={TemplateDividedLites}
                />
                <Route
                  path="/product/glassfamily/:id"
                  component={TemplateGlassFamily}
                />
                <Route path="/" exact>
                  <DisplayAll />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </ThemeProvider>
      </editContext.Provider>
    </appContext.Provider>
  );
};

export default App;
