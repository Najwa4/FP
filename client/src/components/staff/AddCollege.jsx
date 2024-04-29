import React, { useState } from "react";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";

const MyForm = () => {
  const [collegeName, setCollegeName] = useState("");
  const [collegeDeanID, setCollegeDeanID] = useState("");

  const handleCreateCollege = async (event) => {
    event.preventDefault();
    try {
      const collegeData = {
        collegeName,
        collegeDeanID,
      };
      console.log(collegeData);

      // Add validation logic here if needed

      const response = await postRequest("/colleges", collegeData);
      if (response) {
        toast.success("College created successfully!");
        setCollegeName("");
        setCollegeDeanID("");
      } else {
        toast.error(
          "Failed to create college. Please ensure that all fields are filled in correctly."
        );
        setCollegeName("");
        setCollegeDeanID("");
      }
    } catch (error) {
      console.error("Error creating college:", error);
    }
  };

  return (
    <form onSubmit={handleCreateCollege}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={collegeName}
          onChange={(event) => setCollegeName(event.target.value.trim())}
          required
        />
      </div>
      <div>
        <label htmlFor="collegeDeanID">College Dean ID:</label>
        <input
          type="text"
          id="collegeDeanID"
          name="collegeDeanID"
          value={collegeDeanID}
          onChange={(event) => setCollegeDeanID(event.target.value.trim())}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
