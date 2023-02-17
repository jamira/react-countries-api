import styles from './styles.module.scss'
import { useCountry } from '../../contexts/CountryProvider'
import { useCountriesData } from '../../hooks/useCountriesData'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

const CountryItem = ({ name, population, region, capital, flag }) => {

    const { getCountry } = useCountry()

    return (
        <div className={styles.country}>
            <div className="country__flag">
                <a onClick={() => getCountry(name)}>
                    <img src={flag} alt="" width="100%" className={styles.country__img} />
                </a>
            </div>
            <div className={styles.country__inner}>
                <h3 className={styles.country__name}>{name}</h3>
                <div className={styles.country__data}>
                    <p>Population: <span>{population}</span></p>
                    <p>region: <span>{region}</span></p>
                    <p>capital: <span>{capital}</span></p>
                </div>
            </div>
        </div>
    );
}

const Countries = () => {
    const pageLimit = 8
    
    const [currentPage, setCurrentPage] = useState(1)
    const { filterRegion, searchName } = useCountry()

    const queryClient = useQueryClient()

    const { countries, regionQuery: regions, countriesQuery: allCountries, searchQuery: search } = useCountriesData(filterRegion, searchName)
    const queries = [allCountries, regions, search]
    const isLoading = queries.some(query => queryClient.getQueryState(query)?.isLoading)
    const isError = queries.some(query => queryClient.getQueryState(query)?.isLoading)

    if (isLoading) {
        return <div className='spinner'></div>
    } else if (isError) {
        return <h1>Couldn't fetch data</h1>
    } else {
        const paginateCountries = countries?.slice((currentPage - 1) * pageLimit, currentPage * pageLimit)
        console.log(paginateCountries)
        return (
            <>
                <div id="countryItems">
                    {paginateCountries.map((props, index) => (
                        <CountryItem key={index} {...props} />
                    ))}
                </div>
                <div id='pagination'>
                    <div className='paginate'>
                        <button className={`btn paginate__btn${currentPage === 1 ? ' paginate__btn--disabled' : ''}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev Page</button>
                        <button className='btn paginate__btn' onClick={() => setCurrentPage(currentPage + 1)} >Next Page</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Countries;
