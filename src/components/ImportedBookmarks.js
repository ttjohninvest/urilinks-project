import React, {useState, useEffect} from "react";
//import { history } from "../routers/AppRouter";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import printerImage from "../assets/images/printer_image.png";
 
const ImportedBookmarks = (props) => {
  const [max, setMax] = useState(0)
  const goToHomePage = () => {
    props.history.push("/"); // Navigates back one step in the history
  };


  const getPlanMax=()=>{
    let max=250
    //props.settings.plan
    if(props.theplan.plan.replace(/"/g, "")==="free") {
     max=250
    } else if(props.theplan.plan.replace(/"/g, "")==="basic") {
max=1500
    } else if(props.theplan.plan.replace(/"/g, "")==="standard") {
max=2500
    } else { //premium
max=5000
    }
    return max
  }

  useEffect(()=>{
    setMax(getPlanMax())
  },[])

  const returnAndRefresh = () => {
    props.history.push("/");
    //window.location.reload();
    window.location.href="https://urilinks.com?signup=signup"
  };

  const printIt=()=>{
    const oldTitle = document.title
    document.title = "urilinks new links";
    window.print()
    document.title=oldTitle




  }
          

  return (
    <div className="container2 positionit">
      <div className="flexcol">
        {props.rl === 0 ? (
          <div className="margin-top-1111c">
            Bookmarks were not uploaded because they may have been already
            uploaded.
          </div>
        ) : props.max === props.rl ? (
          <div className="margin-top-1111b font-weight-bold">
            Successfully imported all unique bookmarks.{" "}
            {`${props.rl} of ${props.max}`}
          </div>
        ) : (
          <div>
            Imported {`${props.rl} of ${props.max}`}` bookmarks. The limit is
            {max} bookmarks
          </div>
        )}

        {/* {props.max===props.rl?<div>Successfully imported all of the bookmarks. {`${props.rl} of ${props.max}`}</div>
: <div>Imported {`${props.rl} of ${props.max}`}` bookmarks. The limit is 500 bookmarks</div>} */}
        <div className="flexrowtfw">
         

          <div className="rectangle-1">
            <div className="margin-top-2">
              <button
                className="button-style-1- button-2"
                onClick={returnAndRefresh}
              >
                Return and Refresh
              </button>
            </div>

            <div className="margin-top-2">
              <button className="button-style-1- button-2" onClick={goToHomePage}>
                Return
              </button>
            </div>
          </div>
           <div className="rectangle-2 margin-top-1111b">
            {(props.rl>0) &&<div onClick={printIt} className="margin-top-1111b cursor-pointer" title="You may print this list to the printer."><img src={printerImage} width="32" height="32" style={{borderRadius:'50%'}}/></div>}
            {(props.rl>0) &&<div className="margin-top-1111b">These are the bookmarks that were added:</div>}
            <ul className="scrollable-ul">
           
              {props.result.map((r, i) => (
                <li>{r.description}, <span className="font-weight-1" title="You may use this hashtag in hashtag search to find it.">{r.note}:{r.longname}</span></li>
              ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theplan: state.theplan,
});

export default withRouter(connect(mapStateToProps, undefined)(ImportedBookmarks));
