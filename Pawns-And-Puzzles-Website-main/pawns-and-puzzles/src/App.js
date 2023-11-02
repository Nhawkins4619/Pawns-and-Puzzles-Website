import React, {Component} from 'react';
import './App.css';
import './App.css';
import Box from '@mui/material/Box';
import SignIn from './Components/Sign in Page/SignIn'
import Home from './Components/Home Page/Home.js'
import Vendor from './Components/Vendor Page/Vendor'
import Browse from './Components/Browse Page/Browse'
import Comments from './Components/Comments Page/Comments'
import {
  Route,
  HashRouter,
  Routes
} from "react-router-dom";


//main app contains routes to all pages
function App(){
      return (
        <Box sx={{ display: 'block', bgcolor: 'white', width: '100vw', height: '100vh', overflowX: 'hidden' }}>
          <HashRouter>
            <Routes>
              <Route path='/' element={<SignIn></SignIn>} />
              <Route path='/Home' element={<Home></Home>} />
              <Route path='/Vendors' element={<Vendor></Vendor>} />
              <Route path='/Games' element={<Browse></Browse>} />
              <Route path='/Comments' element={<Comments></Comments>} />
            </Routes>
          </HashRouter>
        </Box>
    );
  }
export default App;
