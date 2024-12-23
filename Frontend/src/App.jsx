import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import Signup from './Components/Authentication/Signup'
import Login from './Components/Authentication/Login'

import {ToastContainer} from 'react-toastify';
import Dashboard from './Components/Common/Dashboard.jsx'
function App() {


  return (
      <>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>

          <div className='w-0 h-0'>
            <ToastContainer />
          </div>

        </div>
      </>
  )
}

export default App