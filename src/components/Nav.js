import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav(){

  return (
    <>
      <Link>Most popular</Link>
      <input type="text" placeholder='search'/>
      <Link>Highest Score</Link>
    </>
  )
}