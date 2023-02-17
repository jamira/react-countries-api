import { useCountryCodeData } from "../../hooks/useCountryCodeData";
import { useCountry } from "../../contexts/CountryProvider";
import styles from './styles.module.scss'

const BorderCountries = ({ codes }) => {
    const { codesQuery } = useCountryCodeData(codes)
    const { getCountry } = useCountry()

    if (codesQuery.isLoading) {
        return <h1>Loading</h1>
    }

    if (codesQuery.isSuccess) {
        return <h1>dsdsd</h1>
    }

    let countryNames = []
    codesQuery.map(item => {
        item.data?.map((name) => {
            countryNames.push(name)
        })
    })

    return (
        <div className={styles.borderCountries}>
            <p>Border Countries:</p>
            <ul>{countryNames.map(({ name }, index) => (<li key={index} onClick={() => getCountry(name)}>{name}</li>))}</ul>
        </div>
    );
}

export default BorderCountries;