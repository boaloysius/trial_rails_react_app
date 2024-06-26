import { useRef } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ value, onSearchChange, onImmediateChange }) => {
  const searchDebounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    // Update the search term immediately
    onImmediateChange(searchValue);

    // Clear the search timeout if it exists.
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    // Set a new timeout
    searchDebounceRef.current = setTimeout(() => {
      onSearchChange(searchValue);
    }, 500);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleSearchChange}
      ></input>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
};

export default SearchBar;
