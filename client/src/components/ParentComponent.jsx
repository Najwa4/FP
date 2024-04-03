import React from 'react';
import TableComponent from './TableComponent'; // Adjust the import path as necessary

const ParentComponent = () => {
 const data = [
    { name: 'John Doe', id: '123', bd: '2000-01-01', department: 'Computer Science', college: 'XYZ University' },
    { name: 'Jane Doe', id: '124', bd: '2001-02-02', department: 'Mathematics', college: 'ABC University' },
    // Add more objects as needed
 ];

 return (
    <div>
      <TableComponent data={data} />
    </div>
 );
};

export default ParentComponent;
