import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import FBShareButton from "./FBShareButton";
import LinkedInShareButton from "./LinkedInShareButton";

const LinkListItem = ({
  id,
  description,
  Url,
  note,
  amount,
  createdAt,
  faviconURL,
}) => {
  console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP faviconURL=" + faviconURL);
  const myRef = useRef(null);

  const [s, setS] = useState(1);
  const [data, setData] = useState([]);

  const storeScrollPosition = () => {
    window.localStorage.setItem("scrollPosition", window.scrollY);
    // window.localStorage.setItem("scrollY",window.scrollY)
    //you need to call dispatch(setSetit(false)) here////
  };

  const sortit1 = (event) => {
    console.log(
      "Button was clicked, event.currentTarget.data.length=" +
        event.currentTarget.data.length
    );
    let url;
    let data1=[]
    let ndata=[]
    for (let i = 0; i < event.currentTarget.data.length; i++) {
      url = new URL(event.currentTarget.data[i]);
      let name = URL.parse(url.hostname).host.split('.').last(2).join('.')
      // console.log("url.protocol="+url.protocol); // "https:"
      // console.log("url.hostname="+url.hostname); // "www.example.com"
      // console.log("url.port="+url.port); // "8080"
      // console.log("url.pathname="+url.pathname); // "/path/to/page"
      // console.log("url.search="+url.search); // "?query=string"
      // console.log("url.hash="+url.hash); // "#fragment"
      // console.log("-----------------------------------------------------------------------------");
      ndata = {
        hostname:url.hostname,
        name:name,
        pathname:url.pathname,
        url:url
      }
      data1.push(ndata)
      

    }
    //data1 is ready here
    console.log("data1="+JSON.stringify(data1))
    console.log()
    console.log("data1 sorted by name and extension in hostname="+JSON.stringify(data1.sort((a, b) => a.name.value - b.name.value)));
  };

  const getUrlsList = (url2, id) => {
    if (s === 1) {
      setS(0);
      const ul = document.getElementById("uldata" + id);

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
          setData(data);
          if (data.length === 0) {
            let li = document.createElement("li");
            li.className = "lsn";
            li.innerHTML = `Results: 0`;

            ul.appendChild(li);

            //  let r = document.getElementById("resultsId")
            // r.innerHTML = `Results: ${data.length} url(s)`;
          } else {
            let span = document.createElement("span");
            span.innerHTML = "sort";
            span.className = "cursor-pointer";
            span.data = data;

            span.addEventListener("click", sortit1);
            ul.appendChild(span);

            let li0 = document.createElement("li");
            li0.className = "lsn";
            li0.innerHTML = `Results: ${data.length} url(s)`;

            ul.appendChild(li0);

            //   let r = document.getElementById("resultsId")
            // r.innerHTML = `Results: ${data.length} url(s)`;

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
      setS(1);
      const ul = document.getElementById("uldata" + id);
      ul.innerHTML = "";
    }
  };

  return (
    <div className="margin-bottom-1">
      <div className="card-background-color">
        <div className="list-item__flex">
          <div className="">
            <div className="flexrow2 margin-5">
              <div>
                <img
                  className="borderradius50 margin-top-1111"
                  width="16"
                  height="16"
                  src={faviconURL}
                />
              </div>
              <div className="padding-left-11 padding-bottom-11 borderRadius4">
                <div className="flexcol3">
                  <div className="flexrow2wpt2-">
                    <div>
                      <a
                        ref={myRef}
                        className="ib nounderline text-size-5 text-color-db margin-bottom-114"
                        href={Url}
                        target="_self"
                        title={"click to open the webpage: " + Url}
                        onClick={storeScrollPosition}
                      >
                        To page: {description}
                      </a>
                    </div>
                  </div>

                  <div>
                    <span
                      className="ib margin-left-114"
                      title="click the following link to see an index of clickable urls on the page."
                    >
                      PAGE URLS SOURCE:
                      <br />
                      <span
                        onClick={() => getUrlsList(Url, id)}
                        className="ib cursor-pointer margin-left-114"
                        title="click to see the clickable available webpage urls."
                      >
                        To list: {Url}
                      </span>
                    </span>
                  </div>
                </div>

                <ol id={"uldata" + id} start="0"></ol>
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="">
              <Link className="nounderline  text-size-1" to={`/edit/${id}`}>
                <div>
                  <span className="padding-right-11 inline-block-margin-left-1 padding-bottom-11">
                    edit or remove
                  </span>
                </div>
              </Link>
            </h3>
          </div>
        </div>

        <div className="list-item__sub-title- padding-left-1 text-size-2">
          Entered: {moment(createdAt).format("MMMM Do, YYYY, h:mm:ss a")}
        </div>
      </div>
      <div className="list-item__data-  text-size-1 font-weight-1 card-background-color padding-bottom-2 padding-left-2  text-color-db text-size-2">
        {note}
      </div>
      <div className="flexrow2w">
        <FBShareButton url={Url} />
        <LinkedInShareButton url={Url} />
      </div>
    </div>
  );
};

export default LinkListItem;
