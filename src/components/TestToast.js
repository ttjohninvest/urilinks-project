import React from "react";

import {
  toast,
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const TestToast = () => {
  return (
    <div>

      <ToastContainer />

      <button
        type="button"
        onClick={() => {
          console.log("BUTTON CLICKED");
          toast("Toast test");
        }}
      >
        Test Toast
      </button>

    </div>
  );
};

export default TestToast;