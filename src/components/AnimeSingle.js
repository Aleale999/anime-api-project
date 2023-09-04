import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function AnimeSingle(){
  //I dont know if this will help you, but i hope so, you just gotta change the Link in the Home page, line 28 and add ":" and also in the js file line 20

  const { animeId } = useParams()
  const [anime, setAnime] = useState()

  useEffect(() => {
    async function singleAnime(){
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`)
      console.log(data.data)
      setAnime(data.data)
    }
    singleAnime()
  }, [])

  return (
    <>
      <p>{anime && anime.title}</p>
      <p>{anime && anime.background}</p>
      <p>{anime && anime.synopsis}</p>
    </>
  )

}