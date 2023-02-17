import { fetchCountryCode } from "../api/countries";
import { useQueries } from "react-query";

export const useCountryCodeData = (codes) => {

    const countryName = (data) => {
        return data.map(item => {
            return {
                name: item.name.common
            }
        })
    }

    const codesQuery = useQueries(
        codes.map(code => {
            return {
                queryKey: ['border-countries', code],
                queryFn: () => fetchCountryCode(code),
                select: countryName
            }
        })
    )

    return { codesQuery }
}

