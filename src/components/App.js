import React from 'react'
import Brand from './brand';
import WithClass from './WithClass';
import MyChart from './myChart';

export default function(){
    return (
        <WithClass classes='root'>
            <Brand
                linkToSource='https://github.com/AmirAhmadzadeh/corona-virus-charts'
                firstName='AMIRHOSEYN'
                lastName='AHMADZADEH'
            />
            <MyChart
                chartTitle='Confirmed Corona Cases'
            />
        </WithClass>
    )
}
