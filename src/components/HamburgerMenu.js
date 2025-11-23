import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import './HamburgerMenu.css'; // Import the CSS file

const HamburgerMenu = (props) => {

 const scrolldown = () => {
    //this scrolls the results into view, the first and subsequent result is shown
    document.querySelector("#before-before-link-summary-id").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    // The 'open' class is conditionally applied for styling
    <div className={`menu-container ${props.isOpen ? 'open' : ''}`}>
      <ul className="menu-list">
        
                 
                  <li>
                                   {props.signup.signup === false && ( <Link
                                      className="nounderline color-white-1 cursor-pointer"
                                      to="/signup"
                                      title=""
                                    >
                                      (enter)
                                    </Link>
        
                                    )}
                                  </li>
                  
                                  <li>
                                                  <Link
                                                    className="nounderline color-white-1- cursor-pointer"
                                                    to="/dashboard"
                                                    title="refresh"
                                                  >
                                                    urilinks (link to links tool)
                                                  </Link>
                                               </li>
                                  
                                  <li>
                                  <Link className="header__title- nounderline" to="/use">
                                    <span
                                      className="margin-right-1-ib- color-white-1- cursor-pointer"
                                      title="How to use this website"
                                    >
                                      (How to use)
                                    </span>
                                  </Link>
                                </li>
                  <li> 
                                  <Link
                                    className="header__title- nounderline"
                                    to="/termsandprivacy"
                                  >
                                    <span
                                      className="ib- color-white-1- cursor-pointer"
                                      title="terms, conditions and privacy policy"
                                    >
                                      (legal)
                                    </span>
                                  </Link>
                                </li>
         <li>{props.theplan.plan.replace(/"/g, "")!=="premium" && props.signup.signup === true && (
                        
                          <Link className="header__title" to="/teirspayment3">
                            <span
                              className="ib"
                              title="please select a plan, basic ($4.99/year), standard ($9.99/year) or premium ($14.99/year)"
                            >
                              (plans ($))
                            </span>
                          </Link>
                        
                      )}</li>
                  <li> {true && (
                        <span
                          id="scrolldownid"
                          className="header__title- padding-top-11- cursor-pointer color-white-1- cursor-pointer nounderline"
                          onClick={scrolldown}
                          title="if the search and results section is not in view, click this to scroll search and results section into view."
                        >
                          (go to search section)
                        </span>
                      )}</li>
        
                  <li></li>
                  <li>
                                  <Link className="header__title- nounderline" to="/ideas">
                                    <span
                                      className="ib- color-white-1- cursor-pointer"
                                      title="some ideas for hash tags"
                                    >
                                      (Link Ideas)
                                    </span>
                                  </Link>
                                </li>
                  
                  <li>{props.signup.signup === true ? (
                        <span className="hide-">
                          <a
                            className="header__title- nounderline pointereventsauto"
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
                      )}</li>
                  <li> {props.signup.signup === true ? (
                                  <span className="pointereventsauto hide-">
                                    <Link
                                      className="header__title- nounderline pointereventsauto"
                                      to="/bookmarksmanager"
                                    >
                                      <span
                                        className="ib- color-white-1- cursor-pointer pointereventsauto"
                                        title="bookmarks get renamed to links"
                                      >
                                        (Bookmarks File Uploader)
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
                                        (Bookmarks File Uploader)
                                      </span>
                                    </Link>
                                  </span>
                                )}</li>
                                 
                                <li>{props.signup.signup === true ? (
                        
                          <button
                            className="button-3 button--link ib cursor-pointer"
                            onClick={logoutit}
                          >
                            (exit)
                          </button>
                        
                      ) : (
                        ""
                      )}</li>
                      <li>
                        {props.signup.signup === true ? (
                        <div className="margin-top-1111a-">
                          <button
                            className="button-3 button--link ib text-size-3- color-white-1- cursor-pointer"
                            onClick={cancelsubscription}
                          >
                            (Delete Account)
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
  customerId: state.customerId
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
      .then(() => console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSdispatch then"))
      .catch((error) =>
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSS dispatch, error" + error)
      );
  },
  setLinks: (links) => dispatch(setLinks(links)),
  setHasrefreshed: (hasrefreshed) => dispatch(setHasrefreshed(hasrefreshed)),
  startAddPhotourl: (photourl) => dispatch(startAddPhotourl(photourl)),
  startAddEmail: (email) => dispatch(startAddEmail(email)),
  startDeleteAccount: (email) => dispatch(startDeleteAccount(email)),
  setTheplan: (theplan) => dispatch(setTheplan(theplan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);