import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Home(){


  const [animeNames, setAnimeNames] = useState()
  const [newAnimeNames, setNewAnimeNames] = useState()

  const [animeGenreId, setAnimeGenreId] = useState()

  const [allGenres, setAllGenres] = useState()
  const [genre, setGenre] = useState('All')

  useEffect(() => {
    async function getAnimeGenres(){
      try {
        const { data } = await axios.get('https://api.jikan.moe/v4/genres/anime')
        const names = data.data
        setAnimeGenreId(names.map(id => id.mal_id))
        setAllGenres(names.map(genre => genre.name))
      } catch (err){
        console.log(err)
      }
    }
    getAnimeGenres()
  }, [])

  useEffect(()=> {
    async function searchGenres(){
      if (genre !== 'All') {
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genre}`)
        setNewAnimeNames(data.data.map(name=>name))
      } else {
        const { data } = await axios.get('https://api.jikan.moe/v4/anime')
        setAnimeNames(data.data.map(name=>name))
      }
    }
    searchGenres()
  }, [genre])

  return (
    <>
      {
        <select onChange={((e) => setGenre(e.target.value))}>
          <option value="All">All</option>
          {allGenres && allGenres.map(( genre, i ) => {
            return <option key={i} value={animeGenreId[i]}>{genre}</option>
          })}
        </select>
      }
      <span className='anime-container'>
        { (genre === 'All') ? animeNames && animeNames.map( ({ title, images }, i) => {
          return (
            <span
              key={i} value={title} className='single-anime-container'>
              <Link to='/anime_id'>
                <span className='anime-img'><img src={images.jpg.image_url}/></span>
                <h3 className='anime-title'>{title}</h3>
              </Link>
            
            </span>
          )
        }) : newAnimeNames && newAnimeNames.map( ({ title, images }, i) => {
          return (
            <span
              key={i} value={title} className='single-anime-container'>
              <Link to='/anime_id'>
                <span className='anime-img'><img src={images.jpg.image_url}/></span>
                <h3 className='anime-title'>{title}</h3>
              </Link>
            
            </span>
          )
        })
        }
      </span>
      <button><Link to='/'>Previous-Page</Link></button>
      <button><Link to='/'>Next-Page</Link></button>
    </>
  )
}