import React, { useContext, useMemo } from 'react';
import '../styles/Table.css';
import { SearchContext } from '../App';
import Pagination from './Pagination';

const CustomTableHeader = ({ tableHeaders }) => {
  return (
    <thead>
      <tr>
        {tableHeaders?.map(({ title }, index) => {
          return <th key={title + index}>{title}</th>;
        })}
      </tr>
    </thead>
  );
};

const CustomTableBody = ({ data }) => {
  return data?.map((ele, index) => {
    return (
      <tbody key={ele?.id}>
        <tr>
          <td>{index + 1}</td>
          <td>{ele.city}</td>
          <td>{ele.country}</td>
        </tr>
      </tbody>
    );
  });
};

function RenderTable() {
  const { state } = useContext(SearchContext);

  const data = useMemo(
    () => state?.data?.data?.data,
    [state?.data?.data?.data]
  );

  const tableHeaders = [
    { title: '#' },
    { title: 'Place Name' },
    { title: 'Country' },
  ];

  return (
    <div className="table-container">
      <div className="grid-container">
        {data && data?.length ? (
          <div className="item1">
            <div className="grid-container">
              <div className="item1">
                {state?.loader ? (
                  <h1>Loader...</h1>
                ) : (
                  <table>
                    <CustomTableHeader tableHeaders={tableHeaders} />
                    <CustomTableBody data={data} />
                  </table>
                )}
              </div>
              <div className="item2">
                <Pagination />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="item2">
              <h1>NO DATA !</h1>
              <p>Search by places to fetch data !</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RenderTable;
