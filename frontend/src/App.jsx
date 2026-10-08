import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './component/home/home';
import Studios from './pages/studio';
import Studio from './component/studio/studio';
import Model from './model/model';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}  />
           
        <Route  path="/studios"  element={<Studios />} />
         
        <Route  path="/studios/:studioId" element={<Studio />}  />
         
      
      </Routes>
        {/* Floating WhatsApp */}
      <Model />
    </BrowserRouter>
  );
}