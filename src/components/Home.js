import axios from 'axios'
import { useEffect, useState } from 'react'


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
        {animeNames.length > 0 && animeNames.map( ({ title, images }) => {
          console.log(title,images.jpg.image_url)
          return <span
            key={animeNames[0]} value={title} className='single-anime-container'>
            <img src={images.jpg.image_url}></img>
            <h3>{title}</h3>
          </span>
        })}
      </span>
    </>
  )
}