import React from "react";

const Suggestions = ({
  suggestions,
  searchText,
  setSearchText,
  setShowSuggestions,
  currentFocus,
}) => {
  const handleOptionClick = (e, item) => {
    setSearchText(item);
    setShowSuggestions(false);
  };
  if (suggestions.length > 0) {
    const options = suggestions.map((item, i) => {
      const matchingTextStartIndex = item.indexOf(searchText.trim());
      return (
        <li
          key={item}
          className={
            currentFocus === i
              ? "list-group-item active-item"
              : "list-group-item"
          }
          onClick={(e) => handleOptionClick(e, `${item} `)}
        >
          {matchingTextStartIndex !== -1 ? (
            <>
              <span>{item.substr(0, matchingTextStartIndex)}</span>
              <strong>
                {item.substr(
                  matchingTextStartIndex,
                  matchingTextStartIndex + searchText.length
                )}
              </strong>
              <span>
                {item.substr(matchingTextStartIndex + searchText.length)}
              </span>
            </>
          ) : (
            <span>{item}</span>
          )}
        </li>
      );
    });
    return options;
  }
  return "";
};

export default Suggestions;
