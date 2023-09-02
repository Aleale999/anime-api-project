import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'

export default function App(){


  return (
    <BrowserRouter>
      
      <header>
        <Nav />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/:anime_id'></Route>
          <Route path='/genres/anime'></Route>
          <Route path='/top/anime'></Route>
        </Routes>
      </main>

      <footer>

      </footer>

    </BrowserRouter>
  )
}