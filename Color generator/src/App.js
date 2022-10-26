import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  //new
  const [number, setNumber] = useState("");
  //100%  divided by 10 the .all(10)
  const [list, setList] = useState(new Values("#E5625E").all(10));

  //check if the value is color
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //.all gonna create shades using the library
      let colors = new Values(color).all(number);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  // in the btn className - if its error add a error class
  return (
    <>
      <section className="container">
        <h3> color generator </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#E5625E"
            className={`${error ? "error" : null}`}
          />

          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            placeholder="10"
            className={`number ${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>

      <section className="colors">
        {list.map((color, index) => {
          // in SingleColor.js:
          return <SingleColor key={index} {...color} index={index} />;
        })}
      </section>
    </>
  );
}

export default App;
