import React, { useState } from "react";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";

const AddDepartmentForm = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");

  const handleAddDepartment = async (event) => {
    event.preventDefault();
    try {
      const departmentData = {
        name,
        college,
      };
      console.log(departmentData);

      // Add validation logic here if needed

      const response = await postRequest("/departments", departmentData);
      if (response) {
        toast.success("Department added successfully!");
        setName("");
        setCollege("");
      } else {
        toast.error(
          "Failed to add department. Please ensure that all fields are filled in correctly."
        );
        setName("");
        setCollege("");
      }
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <form onSubmit={handleAddDepartment}>
      <div>
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          name="departmentName"
          value={name}
          onChange={(event) => setName(event.target.value.trim())}
          required
        />
      </div>
      <div>
        <label htmlFor="college">College:</label>
        <input
          type="text"
          id="college"
          name="college"
          value={college}
          onChange={(event) => setCollege(event.target.value.trim())}
          required
        />
      </div>
      <button type="submit">Add Department</button>
    </form>
  );
};

export default AddDepartmentForm;
