import React, { useState, useRef, useEffect } from "react";

const HeaderAccountMenu = (props) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleDeleteAccount = () => {
    setOpen(false);

    if (props.onDeleteAccount) {
      props.onDeleteAccount();
    }
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: "relative",
        display: "inline-block"
      }}
    >
      <button
        type="button"
        className="button-2"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        // style={{
        //   padding: "7px 12px",
        //   border: "1px solid #aaa",
        //   borderRadius: "5px",
        //   background: "white",
        //   cursor: "pointer",
        //   fontSize: "14px"
        // }}
      >
        Account ▼
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            marginTop: "4px",
            minWidth: "170px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.18)",
            zIndex: 1000,
            overflow: "hidden"
          }}
        >
          <button
            type="button"
            onClick={handleDeleteAccount}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "none",
              background: "white",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Delete Account
          </button>
           <button
            type="button"
            onClick={props.downloadLinksCSV}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "none",
              background: "white",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            downloadLinksCSV
          </button>
           <button
            type="button"
            onClick={props.downloadLinksHTML}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "none",
              background: "white",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            DownloadLinksHTML
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderAccountMenu;