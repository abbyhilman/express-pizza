import React from "react";
import { useLottie } from "lottie-react";
import notFound from "../404-error-page.json";

const PageNotFound = () => {
  const style = {
    height: 400,
  };
  const options = {
    animationData: notFound,
    loop: true,
    autoplay: true,
  };
  const { View } = useLottie(options, style);
  return (
    <div className="row d-flex justify-content-center m-3">
      {View} <h3>Page Not Found</h3>
    </div>
  );
};

export default PageNotFound;
