import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hello, setHello] = useState("say");

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <div>백엔드에서 가져온 데이터입니다 : {hello}</div>
    </div>
  );
}

export default App;
