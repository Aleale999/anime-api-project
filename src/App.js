import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

import Nav from './components/Nav'

export default function App(){


  return (
    <BrowserRouter>
      
      <header>
        <Nav />
      </header>

      

    </BrowserRouter>
  )
}