import './App.scss'
import Navbar from './components/Navbar'
import Countries from './components/Countries'
import Country from './components/Country'
import SearchForm from './components/SearchCountry/index.jsx'
import FilterCountry from './components/FilterCountry'
import Pagination from './components/Pagination'
import { useCountry } from './contexts/CountryProvider'
import React, { useState, useCallback } from 'react';

function App() {
  const pageLimit = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')

  const { country } = useCountry()
  
  return (
    <div className="App">
      <div id="header">
        <Navbar />
      </div>
      {!country.length ?
        (<div id='countriesWrapper' className='container'>
          <div id="searchFilterWrapper">
            <SearchForm setQuery={setQuery}/>
            <FilterCountry />
          </div>
          <Countries currentPage={currentPage} pageLimit={pageLimit} query={query} />
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>) :
        <div id='country-single' className='container'>
          <Country />
        </div>}
    </div>
  )
}

export default App
