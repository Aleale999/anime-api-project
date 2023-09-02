import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav(){

  const [genres, setGenres] = useState()
  const [genre, setGenre] = useState()

  useEffect(() => {
    async function getAnimes(){
      try {
        const { data } = await axios.get('https://api.jikan.moe/v4/genres/anime')
        const names = data.data
        setGenres(names.map(genre => genre.name))

      } catch (err){
        console.log(err)
      }
    }
    getAnimes()
  }, [genre])
  

  return (
    <>
      <Link>Most popular</Link>
      {
        <select onChange={(e) => setGenre(e.target.value)}>
          {genres && genres.map(( genre, i ) => {
            return <option key={i} value={genre}>{genre}</option>
          })}
        </select>
      }
      <input type="text" placeholder='search'/>
      <Link>Highest Score</Link>
    </>
  )
}