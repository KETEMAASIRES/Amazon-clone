import React from "react";
import { SyncLoader } from "react-spinners";

function Load() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <SyncLoader color="green" />
    </div>
  );
}

export default Load;
