import { useCountryData } from "../../hooks/useCountryData";
import { useCountry } from "../../contexts/CountryProvider";
import BorderCountries from "../BorderCountries";
import styles from './styles.module.scss'

const Country = () => {
    const { country, getCountry } = useCountry()
    const { countryQuery } = useCountryData(country)

    const { data: countryItem, status } = countryQuery

    if (status === 'loading') {
        return <div className='spinner'></div>
    } else if (status === 'error') {
        return <h1>Couldn't fetch data</h1>
    } else {

        const formattedNativeName = (obj) => {
            const langCode = Object.keys(countryItem[0].native).toString()
            return String(obj[langCode].common)
        }

        const languages = Object.values(countryItem[0].languages).map(language => (
            <span key={language} className={styles.language}>{language}</span>
        ))

        const formattedPopulation = countryItem[0].population.toLocaleString('en-US')
        const formattedCurrency = Object.keys(countryItem[0].currencies).toString()

        return (
            <div className={styles.country}>
                <div className={styles.country__btn}>
                    <button className='btn' onClick={() => getCountry('')}>Back</button>
                </div>
                <div className={styles.country__inner}>
                    <div className={styles.country__inner__flag}>
                        <img src={countryItem[0].flag} alt="" width="100%" className={styles.country__img} />
                    </div>
                    <div className={styles.country__inner__detail}>
                        <h1 className={styles.country____inner__name}>{countryItem[0].name}</h1>
                        <ul className={styles.country____inner__list_detail}>
                            {/* <li>Native Name: <span>{formattedNativeName(countryItem[0].native)}</span></li> */}
                            <li>Population: <span>{formattedPopulation}</span></li>
                            <li>Region: <span>{countryItem[0].region}</span></li>
                            <li>Sub Region: <span>{countryItem[0].subregion}</span></li>
                            <li>Capital: <span>{countryItem[0].capital}</span></li>
                            <li>Top Level Domain: <span>{countryItem[0].tld}</span></li>
                            <li>Currencies: <span>{formattedCurrency}</span></li>
                            <li className={styles.country__languages}>Languages: {languages}</li>
                        </ul>
                      
                        {countryItem[0].borders && (
                            <div className={styles.country__inner__borders}>
                                <BorderCountries codes={countryItem[0].borders} />
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Country;