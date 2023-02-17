const apiEndpont = 'https://restcountries.com/v3.1'

export const fetchCountries = async () => {
    const res = await fetch(`${apiEndpont}/all`)
    return await res.json()
}

export const fetchRegion = async (region) => {
    const res = await fetch(`${apiEndpont}/region/${region}`)
    return await res.json()
}

export const fetchCountry = async (name) => {
    const res = await fetch(`${apiEndpont}/name/${name}`)
    return await res.json()
}

export const fetchCountryCode = async (code) => {
    const res = await fetch(`${apiEndpont}/alpha/${code}`)
    return await res.json()
}