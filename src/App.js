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

      <main>
        <Routes>
          {/* <Route path='/Nav'></Route>
          <Route path='/:anime_id'></Route>
          <Route path='/genres/anime'></Route>
          <Route path='/top/anime'></Route> */}
        </Routes>
      </main>

      <footer>

      </footer>

    </BrowserRouter>
  )
}