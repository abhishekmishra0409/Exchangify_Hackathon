import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import Signup from './Components/Authentication/Signup'
import Login from './Components/Authentication/Login'
function App() {


  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
    </>
  )
}

export default App
