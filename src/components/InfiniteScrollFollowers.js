import React, { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;

const InfiniteScrollFollowers = (props) => {
  const {
    uniqueData3,
    uid,
    theuser,
    handleClick2,
    signup,
    rt,
    lengthOf3,
  } = props;

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const loaderRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const scrollContainer = scrollRef.current;

    if (!loader || !scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setVisibleCount((previousCount) => {
            return Math.min(
              previousCount + PAGE_SIZE,
              uniqueData3.length
            );
          });
        }
      },
      {
        root: scrollContainer,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [uniqueData3.length]);

  // Start over if the follower list changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [uniqueData3]);

  const visibleData = uniqueData3.slice(0, visibleCount);

  return (
    <div>
      {rt !== "readonly" && (
        <div
          className="padding-tb"
          title="The number of people that you are following."
        >
          Follower: ({lengthOf3})
        </div>
      )}

      <div
        ref={scrollRef}
        className="scrollable-div3"
      >
        <div
          className={`flexcol3- borderLightOrange- ${
            signup === false
              ? "margin-top-n-x2a"
              : "margin-top-n-x2b"
          } padding1- border-top-1-`}
        >
          <div>
            <div className="liststylenone- cursor-pointer interline padding-top-z6">

              {visibleData.map((item, index) => {
                if (uid !== item.gud.uid) {
                  return (
                    <div
                      onClick={(event) =>
                        handleClick2(2, event)
                      }
                      className={`${
                        item.isMatch === "is following "
                          ? "bg-color-1 color-white-1"
                          : "bg-color-1w color-black-3"
                      }
                      flexrowzv
                      padding-left-11
                      margin-bottom-1vv
                      padding-tb`}
                      key={item.gud.uid || index}
                      data-item-id={
                        uid +
                        ";" +
                        item.gud.uid +
                        ";" +
                        (theuser
                          ? theuser.displayName
                          : "name") +
                        ";" +
                        item.gud.displayname +
                        ";" +
                        item.gud.photourl +
                        ";" +
                        item.gud.email +
                        ";" +
                        (theuser
                          ? theuser.email
                          : "ph@ph.com") +
                        ";" +
                        item.isMatch
                      }
                    >
                      <img
                        src={item.gud.photourl}
                        width="42"
                        height="42"
                        className="borderRadius50- circular-img-"
                        style={{
                          borderRadius: "50%",
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "/default-profile.png";
                        }}
                      />

                      <span className="margin-left-11">
                        {item.gud.displayname}
                      </span>
                    </div>
                  );
                }

                return null;
              })}

              {visibleCount < uniqueData3.length && (
                <div
                  ref={loaderRef}
                  style={{ height: "20px" }}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollFollowers;