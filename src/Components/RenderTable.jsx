import React from 'react';
import '../styles/Table.css';

function CustomTableHeader({ tableHeaders }) {
  return (
    <thead>
      <tr>
        {tableHeaders?.map(({ title }, index) => {
          return <th key={title + index}>{title}</th>;
        })}
      </tr>
    </thead>
  );
}

function RenderTable() {
  const tableHeaders = [
    { title: '#' },
    { title: 'First' },
    { title: 'Last' },
    { title: 'Handle' },
  ];

  return (
    <>
      <table>
        <CustomTableHeader tableHeaders={tableHeaders} />
      </table>
    </>
  );
}

export default RenderTable;
