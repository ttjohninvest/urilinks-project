

import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

import LinkListItem from "./LinkListItem"

const PAGE_SIZE = 20;

const params = new URLSearchParams(window.location.search);
const rt = params.get("x");

const InfiniteScrollNewSortByLikes = (props) => {
  const [links, setLinks] = useState([]);
  //const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Keeps track of where the previous Firebase query stopped.
  const cursorRef = useRef(null);

  // This element will be watched by IntersectionObserver.
  const loaderRef = useRef(null);

const sortByLikes = (items) => {
  return [...items].sort((a, b) => {
    const likesA = Number(a.likes) || 0;
    const likesB = Number(b.likes) || 0;

    return likesB - likesA;
  });
};

  const loadLinks = async (reset = false) => {
    if (loading) return;

    if (!reset && !hasMore) return;

    setLoading(true);

    try {
      //const search = props.searchText.trim().toLowerCase();
      //const search = "Da"; //.toLocaleLowerCase();
      //const search = "e"; //this worked
      const search = props.searchText.trim().toLowerCase();

      //       .startAt("res")
      // .endAt("res" + "\uf8ff")

      console.log("InfiniteScrollNewDescription, props.theSortBy="+props.theSortBy)

      let query
      
        query = firebase
        .database()
        .ref(props.databasePath)
        .orderByChild("description");
       
     

      // SEARCH
      //   if (search) {
      //     query = query.startAt(search).endAt(search + "\uf8ff");
      //   }

      /*
       * If this is another page,
       * begin where the previous page stopped.
       */
      if (!reset && cursorRef.current) {
        query = query.startAt(cursorRef.current.value, cursorRef.current.key);
      }

      /*
       * We request one extra item.
       *
       * The extra item helps determine whether
       * another page may exist.
       */
      //query = query.limitToFirst(PAGE_SIZE + 1);
      query = query.limitToFirst(
  PAGE_SIZE + (!reset && cursorRef.current ? 2 : 1)
);

      const snapshot = await query.once("value");

      //   let results = [];
      //   snapshot.forEach((child) => {
      //     const item = child.val();

      //     if (
      //       item.description &&
      //       //item.description.toLowerCase().includes(search)
      //       item.description.includes(search)
      //     ) {
      //       results.push({
      //         id: child.key,
      //         ...item,
      //       });
      //     }
      //   });

      let allFetched = [];

      snapshot.forEach((child) => {
        allFetched.push({
          id: child.key,
          ...child.val(),
        });
      });

      if (!reset && cursorRef.current) {
        allFetched = allFetched.filter(
          (item) => item.id !== cursorRef.current.key,
        );
      }

      const moreAvailable = allFetched.length > PAGE_SIZE;

      const fetchedPage = allFetched.slice(0, PAGE_SIZE);

      let matches
     

        // matches = fetchedPage.filter(
        // (item) => item.description && item.description.toLowerCase().includes(search))

        matches = fetchedPage.filter(
  (item) =>
    Number(item.likes) >= 1 &&
    item.description &&
    item.description.toLowerCase().includes(search)
);
        
        
        if (fetchedPage.length > 0) {
        const lastItem = fetchedPage[fetchedPage.length - 1];

        cursorRef.current = {
          key: lastItem.id,
          value: lastItem.description,
        };
      
      }
      

     

      console.log("InfiniteScrollDescription, matches=" + JSON.stringify(matches));

      //   if (!reset && cursorRef.current) {
      //     results = results.filter((item) => item.id !== cursorRef.current.key);
      //   }

      //const moreAvailable = results.length > PAGE_SIZE;

      /*
       * Only display PAGE_SIZE records.
       */

      if (reset) {
  setLinks(sortByLikes(matches));
} else {
  setLinks((previousLinks) => {
    const combined = [...previousLinks, ...matches];

    return sortByLikes(combined);
  });
}

//1
      // if (reset) {
      //   setLinks(matches);
      // } else {
      //   setLinks((previousLinks) => [...previousLinks, ...matches]);
      // }

      //2 replace //1 above with this code below if you want all the likes:1 to appear first and likes:0 to appear seconde in the results
      //and this snippet uses the sortByLikes function declared above
//       if (reset) {
//   setLinks(sortByLikes(matches));
// } else {
//   setLinks((previousLinks) => {
//     const combined = [...previousLinks, ...matches];

//     return sortByLikes(combined);
//   });
// }

    

      setHasMore(moreAvailable);

    } catch (error) {
      console.log("Firebase search error:", error);
    }

    setLoading(false);
  };

  /*
   * Run a new search whenever searchText changes.
   */
  useEffect(() => {
    cursorRef.current = null;
    setLinks([]);
    setHasMore(true);

    loadLinks(true);
  }, [props.searchText, props.uid]);

  /*
   * Infinite scroll.
   *
   * When loaderRef becomes visible,
   * load the next page.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && !loading && hasMore) {
          loadLinks(false);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loading, hasMore, props.searchText]);

  return (
    <div>


      <div>
        {/* {links.map((link) => (
          <div key={link.id}>
            <h3>{link.description}</h3>

            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </div>
        ))} */}



{links && links.length === 0
                ? null
                :  
                  links.map((link, index) => {

                    if (
                      rt === "readonly" &&
                      link.showpublic === 0
                      //|| link.archive === 1
                    )
                      return null; //<div key={link.id + "1"}></div>;
                    else
                      return (
                        <div
                          id={link.id}
                          key={link.id}
                          className="border-bottom-1t padding-left-1t- padding-top-1t padding-bottom-1t"
                        >
                          <LinkListItem
                            link={link}
                            rt={rt}
                            key={link.id}
                            {...link}
                            //linkStatuses = {props.linkStatuses} //{props.linkStatues && props.linkStatuses[link.id]?props.linkStatuses[link.id].result:null}
                            //linkStatus={props.linkStatus}
                            
                            index={index}
                            signup={props.signup.signup}
                            idexists={props.idexists}
                            theSortBy={props.theSortBy}
                            // videoId={props.videoId}
                            // playInPlaceVideo={props.playInPlaceVideo}
                          />
                        </div>
                      );
                  })}



      </div>

      {/* {loading && <p>Loading...</p>} */}

      {/* {!loading && links.length === 0 && <p>No results found.</p>} */}

      <div ref={loaderRef} style={{ height: "20px" }} />

      {!hasMore && links.length > 0 && <p>No more results.</p>}
    </div>
  );
};




 const mapStateToProps = (state) => {

  return {
   
    signup: state.signup,
   
  };
};


export default connect(mapStateToProps)(InfiniteScrollNewSortByLikes);

