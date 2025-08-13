import React, { useRef, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import FBShareButton from "./FBShareButton"
import LinkedInShareButton from "./LinkedInShareButton"

const LinkListItem = ({ id, description, Url, note, amount, createdAt, faviconURL }) => {
  console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP faviconURL="+faviconURL)
  const myRef = useRef(null);

  const [s,setS] = useState(1)

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollPosition",window.scrollY)
    // window.localStorage.setItem("scrollY",window.scrollY)
    //you need to call dispatch(setSetit(false)) here//
  }

  const getUrlsList = (url2,id) => {
    
    if(s===1) {
      setS(0)
      const ul = document.getElementById("uldata"+id);

        fetch("https://urilinks-project-links-to-tabs-expr.vercel.app", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url2 }),
        })
          // .then(response => response.json())
          // .then(data => console.log(data))
          // .catch(error => console.error('Error:', error));
          .then((response) => {
            //console.log("response")
            return response.json();
          })
          .then((data) => {
            //console.log('data='+JSON.stringify(data))
            // data.map(function (url) {
            //   let li = document.createElement("li");
            //   let name = document.createElement("h2");

            //   name.innerHTML = `${url}`;

            //   li.appendChild(name);

            //   ul.appendChild(li);
            // });
            if(data.length===0) {
 
              let li = document.createElement("li");
             
            
              li.innerHTML = `Results: 0`;

            

              ul.appendChild(li);
           
            }
else {
  let li0 = document.createElement("li");
   li0.innerHTML = `Results: ${data.length} url(s)`;
   ul.appendChild(li0);
 data.map((url) => {
  
              let li = document.createElement("li");
              let a = document.createElement("a");
              a.href = url;
              a.target = "_blank";
              a.innerHTML = `${url}`;

              li.appendChild(a);

              ul.appendChild(li);
            });
}
           
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    } else {
      setS(0)
      const ul = document.getElementById("uldata"+id);
      ul.innerHTML=''
    }
       
      
  }
 

  return (
    <div className="margin-bottom-1">
      <div className="card-background-color">
        <div className="list-item__flex">
          <div className="">
          <div className="flexrow2 margin-5"><div><img className="borderradius50 margin-top-1111" width="16" height="16" src={faviconURL} /></div>
            <div className="padding-left-11 padding-bottom-11 borderRadius4">
              <a
                ref={myRef}
                className="nounderline text-size-5 text-color-db"
                href={Url}
                target="_self"
                title={Url}
                onClick={storeScrollPosition}
              >
                {description}
              </a>
              <span onClick={()=>getUrlsList(Url,id)} className="curson-pointer" title="click to see the available urls on the page.">{Url}</span>
             
              <ul id={'uldata'+id}></ul>
            </div>
            </div>
          </div>
          <div className="border-orange-">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${id}`}>
                <div>
                  <span  className="padding-right-11 inline-block-margin-left-1 padding-bottom-11" >edit or remove</span>
                </div>
              </Link>
            </h3>
          </div>
        </div>

        <div className="list-item__sub-title- padding-left-1 text-size-2">
          Entered: {moment(createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
        </div>
      </div>
      <div className="list-item__data-  text-size-1 font-weight-1 card-background-color padding-bottom-2 padding-left-2  text-color-db text-size-2">{note}</div>
     <div className="flexrow2w">
      <FBShareButton url={Url} />
      <LinkedInShareButton url={Url} /></div>
    </div>
  );
};

export default LinkListItem;


