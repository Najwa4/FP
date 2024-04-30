import React, { useState } from "react";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/AddCollege.css";

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
    <div className="form-container">
      <form onSubmit={handleCreateCollege} className="my-form">
        {" "}
        <div className="form">
          <label htmlFor="name" style={{ paddingRight: "95px" }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={collegeName}
            onChange={(event) => setCollegeName(event.target.value.trim())}
            required
            style={{ width: "50%" }}
          />
        </div>
        <div className="form">
          <label htmlFor="collegeDeanID" style={{ paddingRight: "22px" }}>
            College Dean ID:
          </label>
          <input
            type="text"
            id="collegeDeanID"
            name="collegeDeanID"
            value={collegeDeanID}
            onChange={(event) => setCollegeDeanID(event.target.value.trim())}
            required
            style={{ width: "50%" }}
          />
        </div>
        <button
          type="submit"
          // style={{
          //   width: "50%",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;
