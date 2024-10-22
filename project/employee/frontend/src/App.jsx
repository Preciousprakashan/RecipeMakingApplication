import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Head from './conponents/Head'
import Login from './conponents/Login'
import Home from './conponents/Home'
import Add from './conponents/Add'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>
      <Head />
      <Routes>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/Add' element={<Add />}></Route>
      </Routes>
    </>
  )
}
export default App
