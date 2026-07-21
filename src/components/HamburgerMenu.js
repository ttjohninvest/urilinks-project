import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import './HamburgerMenu.css'; // Import the CSS file
import { startDeleteAccount } from "../actions/email";
import { startLogout } from "../actions/auth";

const HamburgerMenu = (props) => {
  const scrolldown = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
    window.document.getElementById("termid").focus();
  };

  const scrolldown2 = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
    window.document.getElementById("addlinkid").focus();
  };

  const logoutit = () => {
    //sessionStorage.setItem('hasRefreshed', 'false');
    //const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    //props.setHasrefreshed({ hasrefreshed: false });
    //props.setTheplan({subscriptionId:"",plan:"free",customerId:""})
    props.startLogout();
  };

  const cancelsubscription = () => {
    //alert("cancelSubscription, plan:"+props.theplan.plan.replace(/"/g, ""))
    try {
      if (
        confirm("Press Cancel to cancel the deletion of your account.") == true
      ) {
        //console.log("plan="+props.theplan.plan.replace(/"/g, ""))
        //if(true) {
        if (!!props.theplan.plan && props.theplan.plan.replace(/"/g, "") === "free") {
          props.startDeleteAccount();
          logoutit();
        } else {
          //alert(props.theplan.customerId+", "+props.theplan.subscriptionId)
          const theemail = {
            email: props.email,
            customerId: props.theplan.customerId,
            subscriptionId: props.theplan.subscriptionId,
          };

          fetch("https://urilinks-project-vercel-stripe-canc.vercel.app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(theemail),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:");

              props.startDeleteAccount();
              logoutit();
            })
            .catch((error) => {
              console.log("cancel subscription error=" + error);
            });
        }
      } else {
        alert("Canceled the deletion of the account");
        console.log("Canceled the Deletion of the Account");
      }
    } catch (error) {
      alert("an error occurred: 10002222");
      console.log("an error occurred: 10002222, error=" + error);
    }
    //
  };

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  return (
    // The 'open' class is conditionally applied for styling
    <div className={`menu-container ${props.isOpen ? "open" : ""}`}>
      <ul className="menu-list">
        <li>
          {props.signup.signup === false && (
            <Link
              className="nounderline color-white-1 cursor-pointer font-weight-bold"
              to="/signup"
              title="The first 250 saved links are free. plan $4.99 stores up to 1500; plan $9.99 stores up to 2500;plan $14.99 stores up to 5000"
              style={{ textDecoration: 'none', color:'white' }}
            >
              signup/login
            </Link>
          )}
        </li>

        {/* <li>
                                                  <Link
                                                    className="nounderline color-white-1- cursor-pointer"
                                                    to="/dashboard"
                                                    title="refresh"
                                                  >
                                                    urilinks (link to links tool)
                                                  </Link>
                                               </li> */}
        {/* <li>
          <a href="https://colleges-index-2.netlify.app/" className="header__title- nounderline color-white-1 cursor-pointer font-weight-bold" target="_blank">colleges</a>
        </li>                                        */}

        <li>
          <Link className="nounderline" to="/use">
            <span
              className="margin-right-1-ib- color-white-1- cursor-pointer font-weight-bold"
              title="How to use this website"
            >
              usage
            </span>
          </Link>
        </li>
        <li>
          <Link className="header__title- nounderline" to="/termsandprivacy">
            <span
              className="ib- color-white-1- cursor-pointer font-weight-bold"
              title="terms, conditions and privacy policy"
            >
              legal
            </span>
          </Link>
        </li>
        <li>
          {props.theplan.plan.replace(/"/g, "") !== "premium" &&
            props.signup.signup === true && (
              <Link className="header__title" to="/teirspayment3">
                <span
                  className="ib-  font-weight-bold text-size-1"
                  title="please select a plan, basic ($4.99/year), standard ($9.99/year) or premium ($14.99/year)"
                >
                  plans
                </span>
              </Link>
            )}
        </li>
        {/* <li>
          <span
            id="scrolldownid"
            className="ib padding-tb font-weight-bold cursor-pointer color-white-1 nounderline"
            onClick={scrolldown}
            title="scrolls to search section"
          >
            search
          </span>
        </li> */}

        {/* <li>
          <span
            id="scrolldownid2"
            className="ib padding-tb font-weight-bold cursor-pointer color-white-1 nounderline"
            onClick={scrolldown2}
            title="scrolls to Add Link button"
          >
            add link
          </span>
        </li> */}

        <li></li>
        <li>
          <Link className="nounderline" to="/ideas">
            <span
              className="font-weight-bold cursor-pointer color-white-1 nounderline"
              title="some ideas for hash tags"
            >
              ideas
            </span>
          </Link>
        </li>

        {/* {isMobile() === false && (
          <li>
            {props.signup.signup === true ? (
              <span className="hide-">
                <a
                  className="header__title- nounderline pointereventsauto"
                  href="https://urilinks-project-urls-to-tabs-html.vercel.app"
                  target="_blank"
                >
                  <span
                    className="ib- color-white-1- cursor-pointer  font-weight-bold"
                    title="Retrieves a list of of urls from any given url. This list of urls may be converted into a bookmarks.html that gets written to the Downloads folder in this application for uploading into this application as bookmarks through the link bookmarks uploader."
                  >
                    (get page urls for bookmarks file)
                  </span>
                </a>
              </span>
            ) : (
              <span className="hide-">
                <a
                  className="header__title- nounderline pointereventsnone"
                  href="https://urilinks-project-urls-to-tabs-html.vercel.app"
                  target="_blank"
                >
                  <span
                    className="ib- color-white-1- cursor-pointer"
                    title="Retrieves a list of of urls from any given url. This list of urls may be converted into a bookmarks.html that gets written to the Downloads folder in this application for uploading into this application as bookmarks through the link bookmarks uploader."
                  >
                    (get page urls for bookmarks file)
                  </span>
                </a>
              </span>
            )}
          </li>
        )} */}
        {/* {isMobile() === false && (
          <li>
            {" "}
            {props.signup.signup === true ? (
              <span className="pointereventsauto hide-">
                <Link
                  className="header__title- nounderline pointereventsauto"
                  to="/bookmarksmanager"
                >
                  <span
                    className="ib- color-white-1- cursor-pointer pointereventsauto  font-weight-bold"
                    title="bookmarks get renamed to links"
                  >
                    upload
                  </span>
                </Link>
              </span>
            ) : (
              <span className="pointereventsnone margin-right-1 hide-">
                <Link
                  className="header__title- nounderline pointereventsnone"
                  to="/bookmarksmanager"
                >
                  <span
                    className="ib- color-white-1- cursor-pointer pointereventsnone"
                    title="tool to upload bookmarks.html from chrome, opera, firefox, or brave browser or the boomarks.html file generated through the use of the link get page urls for bookmarks file."
                  >
                    upload
                  </span>
                </Link>
              </span>
            )}
          </li>
        )} */}

        <li>
          {props.signup.signup === true ? (
            <button
              className="button-2w button--link ib color-white-1 cursor-pointer font-weight-bold"
              onClick={logoutit}
            >
              logout
            </button>
          ) : (
            ""
          )}
        </li>
        <li>
          {props.signup.signup === true ? (
            <div className="margin-top-1111a-">
              <button
                title="delete account"
                className="button-2w button--link ib text-size-3- color-white-1 cursor-pointer font-weight-bold"
                onClick={cancelsubscription}
              >
                delete
              </button>
            </div>
          ) : (
            ""
          )}
        </li>

        {/* <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li> */}
      </ul>
    </div>
  );
};

//export default HamburgerMenu;

const mapStateToProps = (state) => ({
  settings: state.settings,
  signup: state.signup,
  email: state.email,
  theplan: state.theplan,
  subscriptionId: state.subscriptionId,
  customerId: state.customerId,
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
      .then(() => console.log("startLogout"))
      .catch((error) => console.log("startLogout, error" + error));
  },
  setLinks: (links) => dispatch(setLinks(links)),
  setHasrefreshed: (hasrefreshed) => dispatch(setHasrefreshed(hasrefreshed)),
  startAddPhotourl: (photourl) => dispatch(startAddPhotourl(photourl)),
  startAddEmail: (email) => dispatch(startAddEmail(email)),
  startDeleteAccount: (email) => dispatch(startDeleteAccount(email)),
  setTheplan: (theplan) => dispatch(setTheplan(theplan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);
