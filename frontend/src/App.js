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

import Home from "./pages/Home";
import DisplayAll from "./pages/DisplayAll";
import DealerFinder from "./pages/DealerFinder";
import SearchResult from "./pages/SearchResult";
import DoorApplication from "./pages/DoorApplication";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

import SignUp from "./pages/user/SignUp";
import RequestReset from "./pages/user/RequestReset";
import Account from "./pages/user/Account";
import SignIn from "./pages/user/SignIn";
import SignOut from "./pages/user/SignOut";
import ResetPassword from "./pages/user/ResetPassword";

import Doors from "./pages/brochure/Doors";
import Patio from "./pages/brochure/Patio";
import Windows from "./pages/brochure/Windows";

import Frank from "./pages/sub/Frank";
import Imagine from "./pages/sub/Imagine";
import Learn from "./pages/sub/Learn";
import Make from "./pages/sub/Make";

// import Push from "./pages/Push";
import TemplateDoor from "./template/TemplateDoor";
import TemplateDoorEditable from "./template/TemplateDoorEditable";
import TemplateSidelite from "./template/TemplateSidelite";
import TemplateTransom from "./template/TemplateTransom";
import TemplateDividedLites from "./template/TemplateDividedLites";
import TemplateGlassFamily from "./template/TemplateGlassFamily";

import { primaryTheme, secondaryTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";

import Layout from "./components/global/Layout";
import Toastify from "./components/helper/Toastify";

const App = () => {
  const [store, dispatch] = useReducer(globalReducer, initialState);
  const [appStore, appDispatch] = useReducer(appReducer, appState);
  const [editStore, editDispatch] = useReducer(editReducer, editState);

  return (
    <globalContext.Provider value={{ store, dispatch }}>
      <appContext.Provider value={{ appStore, appDispatch }}>
        <editContext.Provider value={{ editStore, editDispatch }}>
          <ThemeProvider theme={store.theme ? primaryTheme : secondaryTheme}>
            <Router>
              <Layout>
                <Switch>
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

                  <Route path="/brochure/doors" component={Doors} />
                  <Route path="/brochure/windows" component={Windows} />
                  <Route path="/brochure/patio" component={Patio} />

                  <Route path="/sub/frank" component={Frank} />
                  <Route path="/sub/imagine" component={Imagine} />
                  <Route path="/sub/learn" component={Learn} />
                  <Route path="/sub/make" component={Make} />

                  {/* <Route path="/push" component={Push} /> */}
                  <Route path="/application" component={DoorApplication} />
                  <Route path="/contactus" component={ContactUs} />
                  <Route path="/search" component={SearchResult} />
                  <Route path="/dealerFinder" component={DealerFinder} />
                  <Route path="/displayAll" component={DisplayAll} />
                  <Route path="/" exact component={Home} />
                  <Route exact component={NotFound} />
                </Switch>
              </Layout>
            </Router>
            <Toastify />
            <GlobalStyle />
          </ThemeProvider>
        </editContext.Provider>
      </appContext.Provider>
    </globalContext.Provider>
  );
};

export default App;
