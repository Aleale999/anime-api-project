Anime API
In this project James and I worked together for the realisation of this site which takes really detailed data from a free API about animes. We worked on this as our second project of our bootcamp with General Assembly, and this was the first time we had to find our own API and actually develop and deploy a fully working site using React to make it work and run properly.
We had the weekend to find an API that was first of all of interest for the both of us so it would also be a fun experience to work on it (and this was also a way to get to know eachother, find common interests) and also that delivered data in a way we could both comprehend and work with, and this was crucial because it seems that some people's only goal is to make it as hard as possible to read the data provided by their own APIs, and lastly we needed an API that actually had sufficient data to actually make it worth it working on, because we found some APIs that only displayed an ID and a name, and that was clearly not enough to actually pass this project.
James and I both equally contributed to this project, but i was more focused on making the structure of the site whereas he was more focused on styling and also on handling the data. Our goal was to make a site that in the homepage displayed a list of random animes, and also have various functions to sort them. In the beginning we had a fixed plan about what functions we wanted to do, but the API had some limitations that made it really difficult to develop those functions, for example showing animes sorted by their scores. The API had an end point which sorted the animes by their scores, going from the lowest to the highest, but it also displayed only 25 animes per each request, and that limit made it really hard to sort them the way we wanted, so we opted for a sort by lowest scores, but sorting the by both high and low scores can be implemented in the future. That 25 anime limitation was definetly the biggest challenge to overcome, because it put us in a position where we couldnt really handle all the data the way we wanted but we had to send a request to get our data and if something else had to be done send a new request to the API, and even though we had a limit of 3 requests per second, having a search function that kept updating all the results was really difficult.

useEffect(()=> {
    async function searchGenres(){
      if (genre !== 'All') {
        const { data } = await axios.get(`/api/v4/anime?genres=${genre}&page=${pageNumber}`)
        setNewAnimeNames(data.data.map(name=>name))
        setAnimeId(data.data.map(id => id.mal_id))
      } else {
        const { data } = await axios.get(`/api/v4/anime?page=${pageNumber}`)
        setAnimeNames(data.data.map(name=>name))
        setAnimeId(data.data.map(id => id.mal_id))
      }
    }
    searchGenres()
  }, [genre,pageNumber])

Also adding a filter that showed animes for each genre was difficult, because we had to figure out how the queries worked with this API, and also not getting blocked by the API by sending too many requests per second. 

  useEffect(() => {
    async function getAnimeGenres(){
      try {
        const { data } = await axios.get('/api/v4/genres/anime')
        const names = data.data
        
        setAnimeGenreId(names.map(id => id.mal_id))
        setAllGenres(names.map(genre => genre.name))
      } catch (err){
        console.log(err)
      }
    }
    getAnimeGenres()
  }, [])

But thankfully everything else was pretty straight forward after understanding how the queries and the different API end points worked, for example, since we were limited to showing only 25 animes per page, we also had to get the number of pages and use buttons that allowed to scroll through pages, and disable these buttons at the first and last page to not make the whole thing bug out and give a 404 NotFound error.

function changePage(target){
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
    async function getLastPage(){
      if (genre !== 'All') {
        const { data } = await axios.get(`/api/v4/anime?genres=${genre}`)
        setLastPage(data.pagination.last_visible_page)
      } else {
        const { data } = await axios.get('/api/v4/anime')
        setLastPage(data.pagination.last_visible_page)
      }
    }
    getLastPage()
  },[genre])

Another challenge we overcame was the displaying more detailed data about a single anime once you clicked on it, so we decided to use routes and link each window where every single anime was displayed to a component that allowed us to show the more detailed information about that specific anime, but also this was fairly easy to display thanks to the API's endpoints, because it showed the exact details of every single anime by specific ID.

 useEffect(() => {
    async function singleAnime(){
      const { data } = await axios.get(`/api/v4/anime/${animeId}/full`)
      setAnime(data.data)
      setImage(data.data.images.jpg.image_url)
    }
    singleAnime()
  }, [])

And to pass the specific ID we just had to get the ID in the main page and pass it down to this component through the Link command:

<Link to={`/${animeId[i]}`}>

As mentioned, we had sortings to show animes by lowest scores, but we also sorted them by most watched animes and the most popular ones, and they are all really similar, the only change was the query at the end of our API:
useEffect(() => {
    async function lowScoreAnimes(){
      const { data } = await axios.get('/api/v4/anime?order_by=score')
      setScore(data.data.map(name=>name))
      setAnimeId(data.data.map(id => id.mal_id))
    }
    lowScoreAnimes()
  }, [])

useEffect(() => {
    async function popularAnimes(){
      const { data } = await axios.get('/api/v4/anime?order_by=popularity')
      setPopular(data.data.map(name=>name))
      setAnimeId(data.data.map(id => id.mal_id))
    }
    popularAnimes()
  }, [])

useEffect(() => {
    async function popularAnimes(){
      const { data } = await axios.get('/api/v4/top/anime')
      setPopular(data.data.map(name=>name))
      setAnimeId(data.data.map(id => id.mal_id))
    }
    popularAnimes()
  }, [])

There are bugs of course, we are aware that if you use the search bar to look for an anime the buttons dont get disabled and we will address it.

We also need to improve the styling of every page, but given the amount of time we had we really didnt want to focus on it but we wanted to make an ugly functioning site rather than a broken pretty looking site.