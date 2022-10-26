import React, { useState } from "react";
import people from "./data";
//icons:
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }

    if (number < 0) {
      return people.length - 1;
    }

    return number;
  };

  const prevPerson = () => {
    // my way:

    return setIndex(checkNumber(index + 1));
    // the course way:

    // setIndex((index) => {
    //   let newIndex = index + 1;
    //   return checkNumber(newIndex);
    // });
  };
  const nextPerson = () => {
    return setIndex(checkNumber(index - 1));
    // setIndex((index) => {
    //   let newIndex = index - 1;
    //   return checkNumber(newIndex);
    // });
  };

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    //if the random is already the current index:
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    // console.log(randomNumber);

    setIndex(checkNumber(randomNumber));
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight></FaQuoteRight>
        </span>
      </div>

      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft></FaChevronLeft>
        </button>

        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>
        Random
      </button>
    </article>
  );
};

export default Review;
