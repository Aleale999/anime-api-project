import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Home(){


  const [animeNames, setAnimeNames] = useState()
  const [newAnimeNames, setNewAnimeNames] = useState()

  const [animeGenreId, setAnimeGenreId] = useState()

  const [allGenres, setAllGenres] = useState()
  const [genre, setGenre] = useState('All')

  let currentPage = 1
  const [lastPage, setLastPage] = useState()
  const [pageNumber, setPageNumber] = useState(1)

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
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genre}&page=${pageNumber}`)
        setNewAnimeNames(data.data.map(name=>name))
      } else {
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?page=${pageNumber}`)
        setAnimeNames(data.data.map(name=>name))
      }
    }
    searchGenres()
  }, [genre,pageNumber])
  
  function changePage(target){
    console.log(target)
    currentPage = pageNumber
    if (target === '1') {
      currentPage--
    } else if (target === '2' && currentPage !== 1) {
      currentPage++
    } else {
      currentPage = 2
    }
    setPageNumber(currentPage)
  }
  useEffect(() => {
    function resetPage(){
      currentPage = 1
      setPageNumber(currentPage)
    }
    resetPage()
  },[genre])

  useEffect(() => {
    async function getLastPage(){
      if (genre !== 'All') {
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genre}`)
        setLastPage(data.pagination.last_visible_page)
      }
    }
    getLastPage()
  },[genre])

  return (
    <>
      <button disabled={pageNumber === 1 ? true : false} value={1} onClick={(e) => changePage(e.target.value)}>Previous-Page</button>
      <p>{pageNumber}</p>
      <button disabled={pageNumber === lastPage ? true : false} value={2} onClick={(e) => changePage(e.target.value)}>Next-Page</button>
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
      <button disabled={pageNumber === 1 ? true : false} value={1} onClick={(e) => changePage(e.target.value)}>Previous-Page</button>
      <p>{pageNumber}</p>
      <button disabled={pageNumber === lastPage ? true : false} value={2} onClick={(e) => changePage(e.target.value)}>Next-Page</button>
    </>
  )
}