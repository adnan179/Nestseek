import axios from "axios";
import React, { useState } from "react";

const Test = () => {
  const [file, setFile] = useState([]);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:4000/properties/test", file);
    if (res.status === 200) {
      alert("success!");
    }
    alert("error!");
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files)} />
      <button onClick={handleSubmit}>upload</button>
    </div>
  );
};

export default Test;
