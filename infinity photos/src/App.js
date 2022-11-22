import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  //for search:
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  //for scroll - when we get down newimages gonna be true
  const [newImages, setNewImages] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    // for url of search
    const urlQuery = `&query=${query}`;

    //לבדוק אם יש משהו בחיפוש, אם אין לעשות פצ' רגיל אם יש להשתמש בקישור של החיפוש.
    //check if the user search , if so, use the search url, if not, use the other one

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((oldPhotos) => {
        //deals with the first page patching
        if (query && page === 1) {
          return [...data.results];
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      //once done fetching  setNewImages(false);
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
    }
  };

  //for fetch
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  // only run from second render, for scroll [newImages]
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;

    setPage((oldPage) => {
      return oldPage + 1;
    });
    // eslint-disable-next-line
  }, [newImages]);

  //for scroll

  const event = () => {
    //the end of the page - need 2px before:
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    // console.log(`innerHeight ${window.innerHeight}`);
    // console.log(`scrollY ${window.scrollY}`);
    // console.log(`body height ${document.body.scrollHeight}`);
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);

    // fetchImages();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
