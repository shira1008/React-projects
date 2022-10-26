import React, { useState } from "react";
import data from "./data";
function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //getting number and not an str:
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }

    if (count > 8) {
      amount = 8;
    }

    setText(data.slice(0, amount));
  };

  return (
    <section className="section-center">
      <h3> Lorem ipsum generator</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount"> paragraphs: </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit" className="btn">
          generate
        </button>
      </form>

      <article className="lorem-text">
        {count <= 0 ? (
          <p className="alert">
            {count} is less than 1 , by click you are going to get 1 paragraph
          </p>
        ) : (
          ""
        )}
        {count > 8 ? (
          <p className="alert">
            {count} is bigger than 8 , by click you are going to get 8 paragraph
          </p>
        ) : (
          ""
        )}

        {text.map((item, index) => {
          return <p key={index}>{item} </p>;
        })}
      </article>
    </section>
  );
}

export default App;
