import React from 'react';
import './App.css';
import SearchBar from './Components/SerachBar';
import { useState, createContext } from 'react';

import RenderTable from './Components/RenderTable';

export const SearchContext = createContext();

function App() {
  const [state, setState] = useState({
    res: {},
    pagination: 5,
    searchedPlace: '',
    loader: false,
  });

  return (
    <div className="container">
      <SearchContext.Provider value={{ state, setState }}>
        <div className="grid-container">
          <div className="item1">
            <SearchBar />
          </div>
          <div className="item2">
            <RenderTable />
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
