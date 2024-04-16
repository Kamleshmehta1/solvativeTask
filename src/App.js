import React from 'react';
import './App.css';
import SearchBar from './Components/SerachBar';
import RenderTable from './Components/RenderTable';

function App() {
  return (
    <div className="container">
      <SearchBar />
      <RenderTable />
    </div>
  );
}

export default App;
