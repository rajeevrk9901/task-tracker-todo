import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Auth from './pages/Auth'
// import TaskList from './pages/tasks/TaskList'
import TaskList from './pages/tasklist/TaskList'
import CreateUser from './pages/users/CreateUser'
import UserList from './pages/users/UserList'

import { AuthContext } from './context/AuthContext';
import React, { useContext } from 'react'
import CreateTask from './pages/tasklist/CreateTask'
import TaskDetail from './pages/tasklist/TaskDetail'


function App() {
  const { role } = useContext(AuthContext)
  //  console.log(localStorage.getItem("role"));
  return (
    <Layout>
      {(!role) &&
        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      }

      {(role === "USER") &&
        <Routes>
          <Route path='/tasks' element={<TaskList />} />
        </Routes>
      }


      {(role === "ADMIN") &&
        <Routes>
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/createtask' element={<CreateTask />} />
          <Route path='/taskdetail' element={ <TaskDetail /> } />
        </Routes>
      }
    </Layout>
  )
}

export default App
