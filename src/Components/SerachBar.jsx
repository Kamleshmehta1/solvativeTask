import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { handleDebounce } from '../utils/debounce';
import '../styles/Search.css';
import { SearchContext } from '../App';
import { fetchData } from '../utils/fetchData';

function SearchBar() {
  const shortCutKey = useRef();
  const { state, setState } = useContext(SearchContext);

  const { pagination } = useMemo(() => state, [state]);

  const [inputs, setInput] = useState({ search: '' });

  const onSearch = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = handleDebounce(onSearch, 0); // can be used in future to avoid calls on each key stroke (debouncing)

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // value feteched from input searh bar

      setState((prevState) => ({
        ...prevState,
        loader: true,
      }));
      const res = await fetchData({ inputs, pagination });

      setState((prevState) => ({
        ...prevState,
        data: res,
        searchedPlace: inputs?.search,
        loader: false,
      }));
    },
    [inputs, pagination, setState]
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
