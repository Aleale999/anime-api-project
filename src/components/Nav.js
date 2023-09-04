import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Nav(){

  return (
    <>
      <Link to='/MostPopular'>Most popular</Link>
      <Link>Highest Score</Link>
    </>
  )
}