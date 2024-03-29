import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ContainerList from './Components/ContainerList/ContainerList';
import NewTaskButton from './Components/newTask/NewTaskButton';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <ContainerList />
      <div className='new-task-button'>
        <NewTaskButton />
      </div>
    </div>
  );
}

export default App;