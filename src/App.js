import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { Gallery } from './components/Gallery'
import { SearchBar } from './components/SearchBar'
import { DataContext } from './context/DataContext'

function App() {
  let [query, setQuery] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')


  useEffect(() => {
    const fetchData = () => {
      document.title = '${query} Music'
      console.log('here we are')
      fetch(`https://itunes.apple.com/search?term=${query}`)
        .then(Response => Response.json())
        .then(result => {
          setData(result.results) //{ resultsCount: Number, results: Array }
        })
    }

    fetchData()
  }, [query])

  const handleSubmit = (e, term) => {
    e.preventDefault()
    setQuery(term);
  }

  return (
    <>
      <DataContext.Provider value={data} >
        <SearchBar handleSubmit={handleSubmit} />
        {message}
        <Gallery />
      </DataContext.Provider>
    </>
  );
}

export default App

/*
useEffect always runs when the component initially mounts to the dom.
 
A.) when there is no dependency list
it will run the supplied function whenever there is a change to state or props.
 
B.) when there is an empty dependency list
it will not run again. Ever. For any reason. 
 
C.) when there is a dependency list with elements inside
it will run when it detects a change to the tracked variables.
*/