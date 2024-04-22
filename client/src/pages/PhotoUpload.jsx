import React, { useState } from "react";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [fname, setFname] = useState("");
  const handleName = (e) => {
    setFname(e.target.value);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const mm = {
      fname: "alhamdu",
      age: "34",
    };
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    formData.append("fname", fname);

    try {
      const response = await fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    // <div>
    //   <h1>Photo Upload</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" onChange={handleFileChange} />
    //     <button type="submit">Upload</button>
    //   </form>
    // </div>
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="Photo Upload">Photo Upload</label>
        <input type="file" onChange={handleFileChange} />
        <input type="text" onChange={handleName} />
        <button type="submit">Upload</button>
      </form>
      <img src={"http://127.0.0.1:5000/images/a.png"} alt="" />
    </div>
  );
};

export default PhotoUpload;
