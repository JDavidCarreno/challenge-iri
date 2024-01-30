import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Routes, Route, useNavigate } from "react-router-dom"
import { Form } from './components/Form'
import { useEffect } from 'react'
import { Thankyou } from './components/Thankyou'
import { Error } from './components/Error'

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
        <Route path='/form/:id' element={<Form/>}/>
        <Route path='/thankyou' element={<Thankyou/>} />
        <Route path='/error' element={<Error/>} />
      </Routes>
    </>
  )
}

export default App
