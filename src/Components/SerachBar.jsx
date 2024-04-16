import React, { useCallback, useEffect, useRef, useState } from 'react';
import { handleDebounce } from '../utils/debounce';
import '../styles/Search.css';
import axios from 'axios';
import { key as secretkey } from '../utils/apikey';

function SearchBar() {
  const shortCutKey = useRef();
  const [inputs, setInput] = useState({ search: '' });

  const onSearch = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = handleDebounce(onSearch, 300);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // value feteched from input searh bar
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: { countryIds: 'IN', namePrefix: inputs.search, limit: '5' },
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': secretkey, // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
        },
      };

      const res = await axios(options);
      console.log(res);
    },
    [inputs]
  );

  const handlePress = (e) => {
    if (e.keyCode === 191) {
      e.preventDefault();
      shortCutKey.current.focus();
      return;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handlePress);
    return () => document.removeEventListener('keydown', handlePress);
  }, []);

  return (
    <div className="search-container">
      <div id="keyboard-shortcut">Ctrl+/</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Places..."
          name="search"
          id="searchBar"
          onChange={handleSearch}
          autoComplete="off"
          ref={shortCutKey}
        />
      </form>
    </div>
  );
}

export default SearchBar;
