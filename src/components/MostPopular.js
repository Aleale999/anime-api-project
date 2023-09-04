import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function MostPopular(){

  const [popular, setPopular] = useState()
  const [animeId, setAnimeId] = useState()

  useEffect(() => {
    async function popularAnimes(){
      const { data } = await axios.get('https://api.jikan.moe/v4/top/anime')
      setPopular(data.data.map(name=>name))
      setAnimeId(data.data.map(id => id.mal_id))
    }
    popularAnimes()
  }, [])

  return (
    <>
      {console.log(popular)}
      {popular && popular.map(({ title, images }, i) => {
        return (
          <span
            key={i} value={title} className='single-anime-container'>
            <Link to={`/${animeId[i]}`} >
              <span className='anime-img'><img src={images.jpg.image_url}/></span>
              <h3 className='anime-title'>{title}</h3>
            </Link>
        
          </span>
        )
      })}
    </>
  )
}