import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function HighestScore(){

  const [score, setScore] = useState()
  const [animeId, setAnimeId] = useState()

  useEffect(() => {
    async function lowScoreAnimes(){
      const { data } = await axios.get('https://api.jikan.moe/v4/anime?order_by=score')
      setScore(data.data.map(name=>name))
      setAnimeId(data.data.map(id => id.mal_id))
    }
    lowScoreAnimes()
  }, [])

  return (
    <>
      {score && score.map(({ title, images, score }, i) => {
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