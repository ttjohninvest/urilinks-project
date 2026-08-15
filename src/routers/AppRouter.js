import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import LinkDashboardPage from "../components/LinkDashboardPage";
import LinkSettingsPage from "../components/LinkSettingsPage";
import LinkHashtagsPage from "../components/LinkHashtagsPage";
import AddSettingsPage from "../components/AddSettingsPage";
//import AddLinkPage from "../components/AddLinkPage";
import AddLinkPage from "../components/AddlinkPage";
import ShortCuts from "../components/ShortCuts"
import EditLinkPage from "../components/EditLinkPage";
import Signup from "../components/Signup";
//import TermsAndPrivacy from "../components/TermsAndPrivacy";
import TermsAndPrivacyPolicy from "../components/TermsAndPrivacyPolicy";
//
import Benefits from "../components/Benefits";
//import LinkSettingsPage from "../components/LinkSettingsPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import IdeasPage from "../components/IdeasPage";
//import TeirsPayment3 from "../components/TeirsPayment3";
import Simple from "../components/Simple";
//import SimpleTest from "../components/SimpleTest";
//import SimpleTest2 from "../components/SimpleTest2";

// import BasicPlan from "../components/BasicPlan";
// import StandardPlan from "../components/StandardPlan";
// import PremiumPlan from "../components/PremiumPlan";

import BookmarksManager from "../components/BookmarksManager";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import FetchBookmarks from "../components/FetchBookmarks";
import AddLinkPageFileDate from "../components/AddLinkPageFileDate";

export const history = createHistory();

const AppRouter = (props) => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute
          path="/"
          signup={props.signup}
          component={LoginPage}
          exact={true}
        />
        <PrivateRoute
          path="/dashboard"
          signup={props.signup}
          component={LinkDashboardPage}
          componentProps={{ theValue: true }}
        />
        <PrivateRoute
          path="/signup"
          signup={props.signup}
          component={Signup}
          componentProps={{ theValue2: true }}
        />
        <PrivateRoute
          path="/teirspayment3"
          //path="/simple"
          signup={props.signup}
          //component={TeirsPayment3}
          component={Simple}
        />

          {/* <PrivateRoute
          path="/basicplan"
          //path="/simple"
          signup={props.signup}
          //component={TeirsPayment3}
          component={BasicPlan}
        />

          <PrivateRoute
          path="/standardplan"
          //path="/simple"
          signup={props.signup}
          //component={TeirsPayment3}
          component={StandardPlan}
        />

          <PrivateRoute
          path="/premiumplan"
          //path="/simple"
          signup={props.signup}
          //component={TeirsPayment3}
          component={PremiumPlan}
        /> */}



        <PrivateRoute
          path="/settings"
          signup={props.signup}
          component={AddSettingsPage}
        />
        <PrivateRoute
          path="/termsandprivacy"
          signup={props.signup}
          //component={TermsAndPrivacy}
          component={TermsAndPrivacyPolicy}
        />

        <PrivateRoute 
        path="/use" 
        signup={props.signup} 
        x1="usage"
        component={Benefits} />

         <PrivateRoute 
        path="/shortcuts" 
        signup={props.signup} 
        x1="usage"
        component={ShortCuts} />


        {/* <PrivateRoute path="/settings" component={LinkSettingsPage} /> */}
        <PrivateRoute
          path="/create"
          signup={props.signup}
          x="1"
          component={AddLinkPage}
        />
        <PrivateRoute
          path="/createfiledate"
          signup={props.signup}
          component={AddLinkPageFileDate}
        />
        <PrivateRoute
          path="/edit/:id"
          signup={props.signup}
          component={EditLinkPage}
        />
        <PrivateRoute
          path="/ideas"
          signup={props.signup}
          component={IdeasPage}
        />
         <PrivateRoute
          path="/displayhashtags"
          signup={props.signup}
          component={LinkHashtagsPage}
        />
        <PrivateRoute
          path="/fetchbookmarks/:option"
          signup={props.signup}
          component={FetchBookmarks}
        />
        <PrivateRoute
          path="/bookmarksmanager"
          signup={props.signup}
          component={BookmarksManager}
        />
        <Route signup={props.signup} component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
