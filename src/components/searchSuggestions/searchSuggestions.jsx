import React, { memo, useState, useRef, useEffect } from "react";

import { useDebounce } from "../../shared/hooks/useDebounce";
import apiPaths from "../../shared/settings/apiPaths";

import Suggestions from "../suggestions/suggestions";

const SearchSuggestions = (props) => {
  // state for search text
  const [searchText, setSearchText] = useState("");
  // state for searched results
  const [searchResult, setSearchResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentFocus, setCurrentFocus] = useState(-1);

  //API to get suggestions
  const getSuggestions = ({ url }) => {
    return fetch(url, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => r.results)
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const debouncedSearchText = useDebounce(searchText, 500);

  const suggestionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      event.target.localName !== "input" &&
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(
    () => {
      if (debouncedSearchText && showSuggestions) {
        getSuggestions({ url: apiPaths.getSuggestions({ searchText }) }).then(
          (response) => {
            setSearchResult(response);
            setShowSuggestions(true);
          }
        );
      } else {
        setSearchResult([]);
      }
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [debouncedSearchText] // Only call effect if debounced search text changes
  );

  const handleKeyDown = (e) => {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && currentFocus >= 0) {
      setCurrentFocus(currentFocus - 1);
    } else if (e.keyCode === 40 && currentFocus < searchResult.length - 1) {
      setCurrentFocus(currentFocus + 1);
    } else if (e.keyCode === 13) {
      const currentOption = suggestionsRef.current.childNodes[currentFocus];
      setSearchText(`${currentOption.textContent} `);
      setShowSuggestions(false);
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="container">
      <section>
        <h3 className="display-3 text-secondary">Search Utility</h3>
      </section>
      <section
        data-testid="SearchSuggestions"
        className="input-group mt-5"
        {...props}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter search text"
          aria-label="search text"
          autoFocus
          value={searchText}
          onChange={handleChange}
          onFocus={(e) => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
        />
      </section>
      {showSuggestions && (
        <section>
          {!searchResult.length && searchText && (
            <p className="text-info">No data found</p>
          )}
          <ul
            ref={suggestionsRef}
            className="list-group flush"
            onBlur={(e) => setShowSuggestions(false)}
          >
            <Suggestions
              currentFocus={currentFocus}
              suggestions={searchResult}
              searchText={searchText}
              setSearchText={setSearchText}
              setShowSuggestions={setShowSuggestions}
            />
          </ul>
        </section>
      )}
    </div>
  );
};

export default memo(SearchSuggestions);
