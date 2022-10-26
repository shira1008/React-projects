import React, { useState, useEffect } from "react";
//rgb to hex
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  //rgb to hex:
  const hex = rgbToHex(...rgb);
  
  //"copied to clipboard" gonna disappear after 3 sec
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    //cleanup:
    return () => clearTimeout(timeout);
  }, [alert]);

  //inline style that change the color, and diff class that change the text color
  //navigator.clipboard..... -> copy the value
  return (
    <article
      className={`color ${index > 10 && "color-light"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p className="percent-value">{weight}%</p>
      {/* display hex color with a function that convert...*/}
      <p className="color-value">{hex}</p>

      {alert && <p className="alert"> copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
