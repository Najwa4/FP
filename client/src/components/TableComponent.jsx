import React from 'react';
import '../styles/TableComponent.css';

const TableComponent = ({ data }) => {
 const handleUpdate = (id) => {
    console.log(`Update button clicked for ID: ${id}`);
    // Implement your update logic here
 };

 const handleDelete = (id) => {
    console.log(`Delete button clicked for ID: ${id}`);
    // Implement your delete logic here
 };

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
            <td><button onClick={() => handleUpdate(item.id)}>Update</button></td>
            <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
 );
};

export default TableComponent;
