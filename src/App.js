import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Form from './Component/FormPage';
import TaskList from './Component/List';



function App() {

  return (
    <div className="app p-3">
      <h2 className="text-center text-primary app-head">Task Management</h2>
      <Routes>
        <Route path="/form" element={<Form />} />

<Route path="/editForm/:id" element={<Form  />} />

        <Route path="/" element={<TaskList />} />
      </Routes>
    </div>
  );
}

export default App;
