import React, { memo, useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";

import { useDebounce } from "../../shared/hooks/useDebounce";
import apiPaths from "../../shared/settings/apiPaths";

const SearchSuggestions = (props) => {
  // state for search text
  const [value, setValue] = useState("");
  // state for searched results
  const [suggestions, setsuggestions] = useState([]);
  // state for whether search again or not
  const [shouldSearch, setShouldSearch] = useState(true);

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

  // returns the selected suggestion
  const getSuggestionValue = (suggestion) => {
    setShouldSearch(false);
    return `${suggestion.name} `;
  };

  // func to return list of suggestions with highlighted text
  const renderSuggestion = (suggestion, { query }) => {
    const matches = AutosuggestHighlightMatch(suggestion.name, query);
    const parts = AutosuggestHighlightParse(suggestion.name, matches);

    return (
      <span>
        {parts.map((part, index) => {
          const className = part.highlight
            ? "react-autosuggest__suggestion-match"
            : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  };

  // onchange handler of input
  const onChange = (event, { newValue, method }) => {
    setShouldSearch(true);
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    // do nothing
  };

  // clear suggestions
  const onSuggestionsClearRequested = () => {
    setsuggestions([]);
  };

  // debounce while typing
  const debouncedSearchText = useDebounce(value, 500);

  useEffect(
    () => {
      if (debouncedSearchText && shouldSearch) {
        getSuggestions({
          url: apiPaths.getSuggestions({ searchText: value }),
        }).then((response) => {
          const arrayObj = response.map((item) => ({ name: item }));
          setsuggestions(arrayObj);
        });
      } else {
        setsuggestions([]);
      }
    },
    [debouncedSearchText] // Only call effect if debounced search text changes
  );

  const inputProps = {
    placeholder: "Enter search text...",
    value,
    onChange,
  };

  return (
    <>
      <section>
        <h3 className="display-3 text-secondary">Search Utility</h3>
      </section>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </>
  );
};

export default memo(SearchSuggestions);
