import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Routes, Route, useNavigate } from "react-router-dom"
import { Form } from './components/Form'
import { useEffect } from 'react'

function App() {

  // eslint-disable-next-line no-unused-vars
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    !isLogged && navigate("/")
  }, [isLogged])

  return (
    <>

      <Routes>
        <Route path='/' element={<Login setIsLogged={setIsLogged}/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App
