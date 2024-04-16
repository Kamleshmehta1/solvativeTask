import React, { useContext, useEffect, useMemo, useState } from 'react';
import { SearchContext } from '../App';
import { fetchData } from '../utils/fetchData';

function Pagination() {
  const { state } = useContext(SearchContext);

  const data = useMemo(
    () => state?.data?.data?.data,
    [state?.data?.data?.data]
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { pagination: recordsPerPage } = useMemo(() => state, [state]);

  const lastIndex = useMemo(() => {
    if (data && data?.length < recordsPerPage) {
      return currentPage * data?.length;
    }
    return currentPage * recordsPerPage;
  }, [currentPage, data, recordsPerPage]);

  const firstIndex = useMemo(() => {
    if (data && data?.length < recordsPerPage) {
      return lastIndex - data?.length;
    }
    return lastIndex - recordsPerPage;
  }, [data, lastIndex, recordsPerPage]);

  const records = useMemo(
    () => data?.slice(firstIndex, lastIndex),
    [data, firstIndex, lastIndex]
  );

  const { setState } = useContext(SearchContext);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      res: records,
    }));
  }, [records, setState]);

  function handlePreviousPage() {
    if (currentPage !== firstIndex && currentPage - 1 > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function handlePageChange(e) {
    const pageVal = parseInt(e?.target?.value);

    const res = await fetchData({
      inputs: state?.searchedPlace,
      pagination: pageVal,
    });

    setState((prevState) => ({
      ...prevState,
      res,
      pagination: pageVal,
    }));
  }

  return (
    <nav className="pagination">
      <button onClick={handlePreviousPage}>prev</button>
      <button onClick={handleNextPage}>next</button>
      <select onChange={handlePageChange}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </nav>
  );
}

export default Pagination;
