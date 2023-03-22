import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Auth from './pages/Auth'
import TaskList from './pages/tasks/TaskList'
import CreateUser from './pages/users/CreateUser'
import UserList from './pages/users/UserList'


function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/tasks' element={<TaskList/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/users' element={<UserList/>} />
        {/* <Route path='/adduser' element={<CreateUser/>} /> */}
      </Routes>
    </Layout>
  )
}

export default App
