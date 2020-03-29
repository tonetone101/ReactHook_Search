import React, { useState, useEffect } from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]) 
  const [searchQuery, setSearchQuery] = useState('react') 
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react') 
  const [loading, setLoading] = useState(false)

  // fetch news
  const fetchNews = () => {
    // set loading to true
    setLoading(true)

    // fetch method takes a url as an arguement
    fetch(url)
    // promise to return data in json formate
    .then(result => result.json())
    // promise to update the state and update loading back to false
    .then(data => (setNews(data.hits), setLoading(false)))
    // catch any error
    .catch(error => console.log(error))
  }

  // updates the state with useEffect
  // useEffect is a function that takes another function as an arguement
  useEffect(() => {
    fetchNews()
  }, [url])

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showLoading = () => (
    loading ? <h2>loading...</h2> : ""
  )

  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <input types='text' values={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>
  )

  const showNews = () => {
    return news.map((n, i) => {
      return <p keys={i}>
        {n.title}
      </p>
    })
  }

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {showForm()}
      {showNews()}
    </div>
  )
}

export default App;
