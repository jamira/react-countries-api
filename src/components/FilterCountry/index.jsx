import React, { useState } from 'react';
import styles from './styles.module.scss'
import { useCountry } from '../../contexts/CountryProvider';
import clsx from 'clsx';

const FilterCountry = () => {
    const regions = [
        {
            name: 'Africa',
            value: 'africa'
        },
        {
            name: 'America',
            value: 'america'
        },
        {
            name: 'Asia',
            value: 'asia'
        },
        {
            name: 'Europe',
            value: 'europe'
        },
        {
            name: 'Oceania',
            value: 'oceania'
        }
    ]

    const [region, setRegion] = useState('')
    const [isToggle, setToggle] = useState(false)

    const { filterCountry } = useCountry()

    const onChangeRegion = (name) => {
        setRegion(name)
        setToggle(false)
        filterCountry(name)
    }


    return (
        <div className={clsx(styles.filterCountry, styles.regions)}>
            <ul className={clsx(styles.regions__default, styles.filterBox)} onClick={() => setToggle(!isToggle)}>
                <li>{`${!region.length ? 'Filter by Regions' : region}`}</li>
            </ul>
            {isToggle &&
                <ul className={clsx(styles.regions__children, styles.filterBox)}>
                    {regions.map(({ name }, index) => (
                        <li key={index} className={styles.region__name} onClick={() => onChangeRegion(name)}>
                            {name}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default FilterCountry;
