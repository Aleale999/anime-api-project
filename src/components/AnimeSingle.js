import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function AnimeSingle(){
  //I dont know if this will help you, but i hope so, you just gotta change the Link in the Home page, line 28 and add ":" and also in the js file line 20

  const { animeId } = useParams()
  const [anime, setAnime] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    async function singleAnime(){
      const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`)
      setAnime(data.data)
      setImage(data.data.images.jpg.large_image_url)
    }
    singleAnime()
  }, [])

  return (
    <>
      <section id='title'>{anime && anime.title}</section>
      <section id='background'>{anime && anime.background}</section>
      <section id='synopsis'>{anime && anime.synopsis}</section>
      <section id='genres'>{anime && anime.genres.map(({ name },i) => {
        return (
          <p key={i}>{name}</p>
        )
      })}</section>
      <section><img src={image} /></section>
    </>
  )

}