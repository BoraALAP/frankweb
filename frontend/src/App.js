import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import appContext from "./context/context";
import appReducer, { initialState } from "./context/reducer";

import { ThemeProvider } from "styled-components";
import { primaryTheme, secondaryTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";

import Layout from "./components/global/Layout";
import DoorApplication from "./pages/DoorApplication";

import CamingOption from "./dbComponents/CamingOption";
import GlassAssociation from "./dbComponents/GlassAssociation";
import DividedLiteType from "./dbComponents/DividedLiteType";
import DoorCollections from "./dbComponents/DoorCollections";
import DoorLine from "./dbComponents/DoorLine";
import Doors from "./dbComponents/Doors";
import Finishes from "./dbComponents/Finishes";
import FrameProfile from "./dbComponents/FrameProfile";
import Glass from "./dbComponents/Glass";
import GlassFamily from "./dbComponents/GlassFamily";
import GlassFeature from "./dbComponents/GlassFeature";
import GrilleColor from "./dbComponents/GrilleColor";
import HandleSets from "./dbComponents/HandleSets";
import Sidelites from "./dbComponents/Sidelites";
import StyleLayoutPairs from "./dbComponents/StyleLayoutPairs";
import StyleShapes from "./dbComponents/StyleShapes";
import Transoms from "./dbComponents/Transoms";
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
                {/* <GlassAssociation /> */}
                {/* <FrameProfile /> */}
                {/* <GlassFeature /> */}
                {/* <GlassFamily /> */}
                {/* <CamingOption /> */}
                {/* <DividedLiteType /> */}
                {/* <GrilleColor /> */}
                {/* <StyleLayoutPairs /> */}
                {/* <Finishes /> */}
                {/* <HandleSets /> */}
                {/* <StyleShapes /> */}
                {/* <DoorCollections /> */}
                {/* <DoorLine /> */}
                {/* <Glass /> */}
                {/* <Transoms /> */}
                {/* <Sidelites /> */}
                <Doors />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </appContext.Provider>
  );
};

export default App;
