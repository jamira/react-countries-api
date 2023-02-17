import { useQuery } from "react-query";
import { fetchCountry } from "../api/countries";

export const useCountryData = (name) => {
    
    const formattedCountry = (data) => {
        return data.map(item => {
            return {
                name: item.name.common,
                native: item.name.nativeName,
                flag: item.flags.svg,
                population: item.population,
                region: item.region,
                subregion: item.subregion,
                capital: item.capital,
                tld: item.tld[0],
                currencies: item.currencies,
                languages: item.languages,
                borders: item.borders
            }
        })
    }

    const countryQuery = useQuery(['country', name], () => fetchCountry(name), {
        enabled: !!name,
        select: formattedCountry
    })

    return {
        countryQuery
    }
}