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
import SearchResult from "./pages/SearchResult";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Enterence from "./pages/Enterence";

import DoorApplication from "./pages/builders/DoorApplication";
import PatioApplication from "./pages/builders/PatioApplication";
import WindowApplication from "./pages/builders/WindowApplication";

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

import DealerLogin from "./pages/dealer/DealerLogin";
import DealerDashboard from "./pages/dealer/DealerDashboard";
import DealerFinder from "./pages/dealer/DealerFinder";

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

  const InnerRoute = ({ component, path, title }) => {
    return (
      <Layout>
        <Route path={path && path} exact component={component} />
      </Layout>
    );
  };

  return (
    <globalContext.Provider value={{ store, dispatch }}>
      <appContext.Provider value={{ appStore, appDispatch }}>
        <editContext.Provider value={{ editStore, editDispatch }}>
          <ThemeProvider theme={store.theme ? primaryTheme : secondaryTheme}>
            <Router>
              <Route
                exact
                render={({ location }) => (
                  <Switch location={location} key={location.key}>
                    <InnerRoute
                      path="/product/door/:id"
                      component={TemplateDoor}
                      title={`Door`}
                    />
                    <Route
                      path="/selected/Door/:id"
                      exact
                      render={(props) => (
                        <Layout>
                          <TemplateDoorEditable {...props} />
                        </Layout>
                      )}
                      
                    />
                    <InnerRoute
                      path="/product/sidelite/:id"
                      component={TemplateSidelite}
                    />
                    <InnerRoute
                      path="/product/transom/:id"
                      component={TemplateTransom}
                    />
                    <InnerRoute
                      path="/product/dividedlites/:id"
                      component={TemplateDividedLites}
                    />
                    <InnerRoute
                      path="/product/glassfamily/:id"
                      component={TemplateGlassFamily}
                    />
                    {/* <InnerRoute path="/push" component={Push} title="Sign In"/> */}
                    <InnerRoute
                      path="/user/account"
                      component={Account}
                      title="Account"
                    />
                    <InnerRoute
                      path="/user/signIn"
                      component={SignIn}
                      title="Sign In"
                    />
                    <InnerRoute
                      path="/user/signUp"
                      component={SignUp}
                      title="Sign Up"
                    />
                    <InnerRoute
                      path="/user/signOut"
                      component={SignOut}
                      title="Sign Out"
                    />
                    <InnerRoute
                      path="/user/requestReset"
                      component={RequestReset}
                      title="Request Reset"
                    />
                    <InnerRoute
                      path="/user/resetPassword"
                      component={ResetPassword}
                      title="Reset Password"
                    />

                    <InnerRoute
                      path="/brochure/doors"
                      component={Doors}
                      title="Doors"
                    />
                    <InnerRoute
                      path="/brochure/windows"
                      component={Windows}
                      title="Windows"
                    />
                    <InnerRoute
                      path="/brochure/patio"
                      component={Patio}
                      title="Patio"
                    />

                    <InnerRoute
                      path="/sub/frank"
                      component={Frank}
                      title="Frank"
                    />
                    <InnerRoute
                      path="/sub/imagine"
                      component={Imagine}
                      title="Imagine"
                    />
                    <InnerRoute
                      path="/sub/learn"
                      component={Learn}
                      title="Learn"
                    />
                    <InnerRoute
                      path="/sub/make"
                      component={Make}
                      title="Make"
                    />

                    <InnerRoute
                      path="/builder/doorapplication"
                      component={DoorApplication}
                      title="Door Application"
                    />
                    <InnerRoute
                      path="/builder/windowapplication"
                      component={WindowApplication}
                      title="Window Application"
                    />
                    <InnerRoute
                      path="/builder/patioapplication"
                      component={PatioApplication}
                      title="Patio Application"
                    />

                    <InnerRoute
                      path="/contactUs"
                      component={ContactUs}
                      title="Contact Us"
                    />
                    <InnerRoute
                      path="/search"
                      component={SearchResult}
                      title="Search Result"
                    />
                    <InnerRoute
                      path="/dealerFinder"
                      component={DealerFinder}
                      title="Dealer Finder"
                    />
                    <InnerRoute
                      path="/dealerLogin"
                      component={DealerLogin}
                      title="Dealer Login"
                    />
                    <InnerRoute
                      path="/dealerDashboard"
                      component={DealerDashboard}
                      title="Dealer Dashboard"
                    />
                    <InnerRoute
                      path="/displayAll"
                      component={DisplayAll}
                      exact
                      title="Display All"
                    />
                    <InnerRoute
                      path="/home"
                      exact
                      component={Home}
                      title="Home"
                    />
                    <Route
                      path="/"
                      exact
                      component={Enterence}
                      title="Enterence"
                    />
                    <InnerRoute exact component={NotFound} title="Not Found" />
                  </Switch>
                )}
              />
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
