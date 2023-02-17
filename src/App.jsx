import './App.scss'
import Navbar from './components/Navbar'
import Countries from './components/Countries'
import Country from './components/Country'
import SearchForm from './components/SearchCountry/index.jsx'
import FilterCountry from './components/FilterCountry'
import { useCountry } from './contexts/CountryProvider'

function App() {

  const { country } = useCountry()

  return (
    <div className="App"> 
      <div id="header">
        <Navbar />
      </div>
      {!country.length ?
        (<div id='countriesWrapper' className='container'>
            <div id="searchFilterWrapper">
              <SearchForm />
              <FilterCountry />
            </div>
            <Countries />
          </div>) :
        <div id='country-single' className='container'>
          <Country />
        </div>}
    </div>
  )
}

export default App
