import React from 'react';
import '../styles/TableComponent.css';


const TableComponent = ({ data }) => {
 return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>BD</th>
          <th>Department</th>
          <th>College</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.id}</td>
            <td>{item.bd}</td>
            <td>{item.department}</td>
            <td>{item.college}</td>
            <td><button>Update</button></td>
            <td><button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
 );
};

export default TableComponent;
