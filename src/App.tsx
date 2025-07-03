import './App.css'
import Login from './Components/Auth/Login'
import Signup from "./Components/Auth/Signup"
import Dashboard from './Components/Dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element = {<Signup />} />
          <Route path="/login" element = {<Login />} />
          <Route path='/dashboard' element= {<Dashboard />} />
        </Routes>
      </Router>
  )
}

export default App
