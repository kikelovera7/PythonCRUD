import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { About } from './component/About';
import { Users } from './component/Users';
import {NavBar} from './component/Navbar'
function App(){
  return (
    <Router>
      <NavBar/>
      <div className='container p-4'>
        <Routes>
          <Route path="/About" element={<About/>} />
          <Route path='/' element={<Users/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
