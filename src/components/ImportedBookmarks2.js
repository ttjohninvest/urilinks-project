import React, { useState, useEffect } from "react";
//import { history } from "../routers/AppRouter";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import printerImage from "../assets/images/printer_image.png";
import StorageSizes from "./StorageSizes";

const ImportedBookmarks2 = (props) => {
  const goToHomePage = () => {
    props.history.push("/"); // Navigates back one step in the history
  };

  //   useEffect(()=>{

  //   },[])

  const openPaymentPage = () => {
    // props.history.push("/");
    // //window.location.reload();
    // window.location.href="https://urilinks.com?signup=signup"

    props.setThePayPage(true);
  };

  const closeThisPage = () => {
    // props.history.push("/");
    // //window.location.reload();
    // window.location.href="https://urilinks.com?signup=signup"

    props.closeThisPage(true);
  };

  const printIt = () => {
    const oldTitle = document.title;
    document.title = "urilinks bookmarks that were not added";
    window.print();
    document.title = oldTitle;
  };

  return (
    <div className="container2 positionit">
      <div className="flexcol">
        {/* <div className="flexrowtfw">
          {true && (
            <div>
              <div className="rectangle-1">
                <div className="margin-top-2">
                  <button
                    className="button-style-1- button-2w"
                    onClick={openPaymentPage}
                  >
                    go to payment page
                  </button>
                </div>
              </div>
              <div className="margin-top-2">
                <button
                  className="button-style-1- button-2w"
                  onClick={closeThisPage}
                >
                  Close and Return
                </button>
              </div>
            </div>
          )} 

          {true && (
            <div className="rectangle-2 margin-top-1111b">
              {true && (
                <div
                  onClick={printIt}
                  className="margin-top-1111b cursor-pointer"
                  title="You may print this list to the printer."
                >
                  <img
                    src={printerImage}
                    width="32"
                    height="32"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              )}
              {true && (
                <div className="margin-top-1111b">
                  These are the bookmarks that were not added:
                </div>
              )}
              <ul className="scrollable-ul">
                {props.result2.map((r, i) => (
                  <li>
                    {r.description},{" "}
                    <span
                      className="font-weight-1"
                      title="You may use this hashtag in hashtag search to find it."
                    >
                      {r.note}:{r.longname}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}

        <div className="flexrowtfw">
          {true && (
            <div>
              <div className="rectangle-1">
                <div>
                  <div>
                    You are currently on plan
                    {props.theplan === undefined ||
                    (props.theplan === null &&
                      props.links.length <= StorageSizes.free) ? (
                      <span> free</span>
                    ) : !!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "free" &&
                      props.links.length <= StorageSizes.free ? (
                      <span> free</span>
                    ) : !!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "basic" &&
                      props.links.length <= StorageSizes.basic ? (
                      <span> basic</span>
                    ) : !!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "standard" &&
                      props.links.length <= StorageSizes.standard ? (
                      <span> standard</span>
                    ) : !!props.theplan.plan &&
                      props.theplan.plan.replace(/"/g, "") === "premium" &&
                      props.links.length <= StorageSizes.premium ? (
                      <span> premium, which is the highest plan</span>
                    ) : (
                      ""
                    )}
                  </div>
                  {props.links !== undefined && props.links !== null && (
                    <div>You have stored {props.links.length} links.</div>
                  )}
                </div>
                {props.theplan === undefined ||
                  props.theplan === null ||
                  (!!props.theplan.plan &&
                    props.theplan.plan.replace(/"/g, "") !== "premium" && (
                      <div className="margin-top-2">
                        <button
                          className="button-style-1- button-2w"
                          onClick={openPaymentPage}
                        >
                          go to plans page
                        </button>
                      </div>
                    ))}
              </div>
              <div className="margin-top-2">
                <button
                  className="button-style-1- button-2w"
                  onClick={closeThisPage}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {true && (
            <div className="rectangle-2 margin-top-1111b">
              {true && (
                <div
                  onClick={printIt}
                  className="margin-top-1111b cursor-pointer"
                  title="You may print this list to the printer."
                >
                  <img
                    src={printerImage}
                    width="32"
                    height="32"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              )}
              {true && (
                <div className="margin-top-1111b">
                  These are the bookmarks that were not added:
                </div>
              )}
              <ul className="scrollable-ul">
                {props.result.map((r, i) => (
                  <li>
                    {r.description},{" "}
                    <span
                      className="font-weight-1"
                      title="You may use this hashtag in hashtag search to find it."
                    >
                      {r.note}:{r.longname}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theplan: state.theplan,
  links: state.links,
});

//export default withRouter(connect(mapStateToProps, undefined)(ImportedBookmarks2));
export default withRouter(
  connect(mapStateToProps, undefined)(ImportedBookmarks2),
);
//export default connect(mapStateToProps, undefined)(ImportedBookmarks2);
