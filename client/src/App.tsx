import React from "react";
import "./App.css";
import ContainerList from "./Components/ContainerList/ContainerList";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ContainerList />
    </div>
  );
}

export default App;
