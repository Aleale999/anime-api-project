import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Nav(){

  return (
    <>
      <section className='topnav'>
        <Link to='/'className='home'>Home</Link>
        <Link to='/MostWatched'className='mostWatched'>Most Watched</Link>
        <Link to='/MostPopular'className='mostPopular'>Most Popular</Link>
        <Link to='/LowestScore'className='lowestScore'>Lowest Score</Link>
      </section>
    </>
  )
}