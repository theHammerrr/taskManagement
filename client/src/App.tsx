import React from "react";
import "./App.css";
import ContainerList from "./Components/ContainerList/ContainerList";
import NavBar from "./Components/NavBar/NavBar";
import TasksProvider from "./Components/Contexts/TasksProvider";

function App() {
  return (
    <div className="App">
      <NavBar />
      <TasksProvider>
        <ContainerList />
      </TasksProvider>
    </div>
  );
}

export default App;
