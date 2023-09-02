import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home(){


  const [animeNames, setAnimeNames] = useState({
    images: '',
    title: '',
  })

  useEffect(()=> {
    async function showAnimes(){
      const { data } = await axios.get('https://api.jikan.moe/v4/anime')
      setAnimeNames(data.data.map(name=>name))
    }
    showAnimes()
  },[])

  return (
    <>
      <span className='anime-container'>
        {animeNames.length > 0 && animeNames.map( ({ title, images }, i) => {
          return <span
            key={i} value={title} className='single-anime-container'>
            <Link to='/anime_id'>
              <span className='anime-img'><img src={images.jpg.image_url}/></span>
              <h3 className='anime-title'>{title}</h3>
            </Link>
            
          </span>
        })}
      </span>
    </>
  )
}