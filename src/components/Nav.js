import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav(){

  const [genres, setGenres] = useState()

  useEffect(() => {
    async function getAnimes(){
      try {
        // const { data } = await axios.get('https://api.jikan.moe/v4/anime')
        const { data } = await axios.get('https://api.jikan.moe/v4/genres/anime')
        // console.log(data.pagination.items.per_page)
        setGenres(data.data)
        // console.log(name)
        // console.log(mal_id)}
      } catch (err){
        console.log(err)
      }
    }
    getAnimes()
  }, [genres])


  

  return (
    <>
      <Link>Most popular</Link>
      {
        <select placeholder="genres" id="genres">
          {genres.map(( { name }, i ) => {
            return <option key={i}>{name}</option>
          })}
        </select>
      }
      <input type="text" placeholder='search'/>
      <Link>Highest Score</Link>
      
    </>
  )
}