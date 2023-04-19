
import React, { useEffect } from 'react'
import Login from './components/Login'
import Home from './container/Home'
import {Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';

import Welcome from './components/Welcome';
import PinDetail from './components/PinDetail';


const App = () => {
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<Home/>} />
      <Route path='welcome' element={<Welcome/>} />
      
    </Routes>
    </BrowserRouter>
    
    
    </>
    
  )
}

export default App


