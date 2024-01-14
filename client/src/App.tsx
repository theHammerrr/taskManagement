import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ContainerList from './Components/ContainerList/ContainerList';
import NewTask from './Components/newTask/NewTask';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <ContainerList />
      <div className='new-task-button'>
        <NewTask />
      </div>
    </div>
  );
}

export default App;