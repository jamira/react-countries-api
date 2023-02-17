import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCountries, fetchRegion, fetchCountry } from "../api/countries";

export const useCountriesData = (region, country) => {
    const [countries, setCountries] = useState([])

    const formattedCountries = (data) => {
        return data.map(item => {
            return {
                name: item.name.common,
                population: item.population,
                region: item.region,
                capital: item.capital,
                flag: item.flags.svg
            }
        })
    }

    const regionQuery = useQuery(['countries-by-regions', region], () => fetchRegion(region), {
        enabled: !!region,
        select: formattedCountries,
        onSuccess: (filteredData) => {
            setCountries(filteredData)
        }
    })

    const countriesQuery = useQuery('all-countries', fetchCountries, {
        select: formattedCountries,
        onSuccess: (data) => {
            setCountries(data)
        }
    })

    const searchQuery = useQuery(['search-by-country', country], () => fetchCountry(country), {
        enabled: !!country,
        select: formattedCountries,
        onSuccess: (searchData) => {
            setCountries(searchData)
        }
    })

    return {
        regionQuery,
        countriesQuery,
        searchQuery,
        countries
    }
}
