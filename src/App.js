import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import AnimeSingle from './components/AnimeSingle'
import MostPopular from './components/MostPopular'

export default function App(){


  return (
    <BrowserRouter>
      
      <header>
        <Nav />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/:animeId' element={<AnimeSingle />} />
          <Route path='/genres/anime'></Route>
          <Route path='/MostPopular' element={<MostPopular />} />
        </Routes>
      </main>

      <footer>

      </footer>

    </BrowserRouter>
  )
}