import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loading = () => {
  return (
    <div className="circle mt-3">
      <CircularProgress size={50} />
    </div>
  );
};
