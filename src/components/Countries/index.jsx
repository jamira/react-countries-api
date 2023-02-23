import styles from './styles.module.scss'
import { useCountry } from '../../contexts/CountryProvider'
import { useCountriesData } from '../../hooks/useCountriesData'
import { useQueryClient } from 'react-query'

const CountryItem = ({ name, population, region, capital, flag }) => {

    const { setCountry } = useCountry()
    const formattedPopulation = population.toLocaleString('en-US')

    return (
        <div className={styles.country}>
            <div className="country__flag">
                <a onClick={() => setCountry(name)}>
                    <img src={flag} alt="" width="100%" className={styles.country__img} />
                </a>
            </div>
            <div className={styles.country__inner}>
                <h3 className={styles.country__name}>{name}</h3>
                <div className={styles.country__data}>
                    <p>Population: <span>{formattedPopulation}</span></p>
                    <p>Region: <span>{region}</span></p>
                    <p>Capital: <span>{capital}</span></p>
                </div>
            </div>
        </div>
    );
}

const Countries = ({ currentPage, pageLimit, query }) => {

    const { filterRegion } = useCountry()

    const queryClient = useQueryClient()

    const { countries, regionQuery: regions, countriesQuery: allCountries } = useCountriesData(filterRegion)
    const queries = [allCountries, regions]
    const isLoading = queries.some(query => queryClient.getQueryState(query)?.isLoading)
    const isFetching = queries.some(query => queryClient.getQueryState(query)?.isFetching)
    const isError = queries.some(query => queryClient.getQueryState(query)?.error)

    const filter = [...countries]?.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    const renderCountries = filter.length > 0 ? filter : countries

    if (isLoading || isFetching) {
        return <div className='spinner'></div>
    } else if (isError) {
        return <h1>Couldn't fetch data</h1>
    } else {
        const paginateCountries = renderCountries
        ?.slice((currentPage - 1) * pageLimit, currentPage * pageLimit)
        .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        
        return (
            <>
                <div id="countryItems">
                    {paginateCountries.map((props, index) => (
                        <CountryItem key={index} {...props} />
                    ))}
                </div>
            </>
        )
    }
}

export default Countries;
