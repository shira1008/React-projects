import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { FaPlus, FaMinus } from "react-icons/fa";

//this is the singleQuestion component
const Question = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {!showInfo ? <FaPlus /> : <FaMinus />}
        </button>
      </header>
      {/* false by default so gonna hide the p: */}
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
