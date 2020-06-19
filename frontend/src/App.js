import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { appContext, editContext, globalContext } from "./context/context";
import {
  appReducer,
  editReducer,
  globalReducer,
  initialState,
  appState,
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

import SignUp from "./pages/user/SignUp";
import RequestReset from "./pages/user/RequestReset";
import Account from "./pages/user/Account";
import SignIn from "./pages/user/SignIn";
import SignOut from "./pages/user/SignOut";
import ResetPassword from "./pages/user/ResetPassword";
import DisplayError from "./components/UI/ErrorMessage";

const App = () => {
  const [store, dispatch] = useReducer(globalReducer, initialState);
  const [appStore, appDispatch] = useReducer(appReducer, appState);
  const [editStore, editDispatch] = useReducer(editReducer, editState);

  return (
    <globalContext.Provider value={{ store, dispatch }}>
      <appContext.Provider value={{ appStore, appDispatch }}>
        <editContext.Provider value={{ editStore, editDispatch }}>
          <ThemeProvider theme={store.theme ? primaryTheme : secondaryTheme}>
            <GlobalStyle />

            <Router>
              <Layout>
                <Switch>
                  {/* <Route path="/application" component={DoorApplication} />
                  <Route path="/search" component={SearchResult} />
                  <Route path="/dealerFinder" component={DealerFinder} />
                  
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
    
                  <Route path="/user/account" component={Account} />
                  <Route path="/user/signIn" component={SignIn} />
                  <Route path="/user/signUp" component={SignUp} />
                  <Route path="/user/signOut" component={SignOut} />
                  <Route path="/user/requestReset" component={RequestReset} />
                  <Route path="/user/resetPassword" component={ResetPassword} /> 
                  <Route path="/push" component={Push} />
                  <Route path="/displayAll" component={DisplayAll} /> */}
                  <Route path="/" exact>
                    <DealerFinder />
                  </Route>
                </Switch>
              </Layout>
            </Router>
          </ThemeProvider>
        </editContext.Provider>
      </appContext.Provider>
    </globalContext.Provider>
  );
};

export default App;
