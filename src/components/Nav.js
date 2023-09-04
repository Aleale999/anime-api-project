import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Nav(){

  return (
    <>
      <Link to='/MostWatched'>Most Watched</Link>
      <Link to='/MostPopular'>Most Popular</Link>
      <Link to='/LowestScore'>Lowest Score</Link>
    </>
  )
}