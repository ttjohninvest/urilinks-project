import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import LinkDashboardPage from "../components/LinkDashboardPage";
import LinkSettingsPage from "../components/LinkSettingsPage";
import AddSettingsPage from "../components/AddSettingsPage";
//import AddLinkPage from "../components/AddLinkPage";
import AddLinkPage from "../components/AddlinkPage";

import EditLinkPage from "../components/EditLinkPage";
import Signup from "../components/Signup";
import TermsAndPrivacy from "../components/TermsAndPrivacy";
import Benefits from "../components/Benefits";
//import LinkSettingsPage from "../components/LinkSettingsPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import IdeasPage from "../components/IdeasPage";
import TeirsPayment3 from "../components/TeirsPayment3";
import BookmarksManager from "../components/BookmarksManager";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import FetchBookmarks from "../components/FetchBookmarks";
import AddLinkPageFileDate from "../components/AddLinkPageFileDate";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={LinkDashboardPage} componentProps={{ signup:"signup", theValue: true }} />
        <PrivateRoute path="/signup" component={Signup} componentProps={{ theValue2: true }} />
         <PrivateRoute path="/teirspayment3" component={TeirsPayment3} />
        <PrivateRoute path="/settings" component={AddSettingsPage} />
        <PrivateRoute path="/termsandprivacy" component={TermsAndPrivacy} />
        <PrivateRoute path="/benefits" component={Benefits} />
        {/* <PrivateRoute path="/settings" component={LinkSettingsPage} /> */}
        <PrivateRoute path="/create" component={AddLinkPage} />
        <PrivateRoute path="/createfiledate" component={AddLinkPageFileDate} />
        <PrivateRoute path="/edit/:id" component={EditLinkPage} />
        <PrivateRoute path="/ideas" component={IdeasPage} />
        <PrivateRoute path="/fetchbookmarks/:option" component={FetchBookmarks} />
        <PrivateRoute path="/bookmarksmanager" component={BookmarksManager} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;