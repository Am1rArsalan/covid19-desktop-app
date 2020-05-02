import React, { useRef, useState, useEffect } from 'react'
import pomber from '../api';
import { Chart } from 'chart.js';
import {
    extractDataSet, extractDatesAndConfirmed, formatDate, getCanvasConfig
} from './helper'
import WithClass from './WithClass';
import Select from 'react-select';
import Button from './button';

export default function (props) {
    const [confirmed, setConfirmed] = useState([]);
    const [dates, setDates] = useState([]);
    const [dataset, setDataset] = useState(null);
    const [from, setFrom] = useState('2020-1-22');
    const [to, setTo] = useState(formatDate(new Date()));
    let chartRef = useRef();

    useEffect(() => {
        addDataset();
    }, []);

    useEffect(() => {

        const context = chartRef.current.getContext('2d');
        const { updatedConfirmed, updatedDates } = modifyByDate();
        const days = dataset ? updatedDates : ['day1', 'day2', 'day3'];
        const cases = dataset ? updatedConfirmed : [];
        const chartObj = new Chart(context, getCanvasConfig(days, cases, confirmed.length));
        return () => {
            chartObj.destroy();
        }
    }, [dates, confirmed, to, from]);

    function modifyByDate() {
        let updatedDates = [...dates];
        let updatedConfirmed = [...confirmed];
        const resultFrom = dates.findIndex((value, idx) => {
            return value === from;
        });
        const resultTo = dates.findIndex((value, idx) => {
            return value === to;
        });
        const fromIndex = resultFrom === - 1 ? 0 : resultFrom;
        const toIndex = resultTo === - 1 ? dates.length - 1 : resultTo;
        updatedConfirmed = updatedConfirmed.slice(fromIndex, toIndex);
        updatedDates = updatedDates.slice(fromIndex, toIndex);
        return {
            updatedDates,
            updatedConfirmed
        }
    }

    function addDataset() {
        pomber.get('/covid19/timeseries.json').then(response => {
            let resultPerDate = extractDataSet(response.data);
            const { dates, confirmed } = extractDatesAndConfirmed(resultPerDate);
            setDataset(resultPerDate);
            setDates(dates);
            setConfirmed(confirmed);
        }).catch(err => {
            console.log('Error in add dataset');
        });
    }

    return (
        <WithClass classes='mychart'>
            <h1 className='chart-title'>
                {props.chartTitle}
            </h1>
            <canvas
                ref={chartRef}
                id='canvas'
                height='210'
                width='500'></canvas>
            <WithClass classes='selectors'>
                <WithClass classes='form_controller'>
                    <Button
                        onAddDataset={addDataset}
                        text='Reset'
                    />
                </WithClass>
                <WithClass classes='form_controller'>
                    <label className='form_controller__label'> From </label>
                    <Select
                        value={{ value: from, label: from }}
                        onChange={(selected) => {
                            console.log('selected From is ?? ', selected)
                            setFrom(selected.value)
                        }}
                        options={
                            dates.slice(0, Math.round(dates.length / 2))
                                .map((item, idx) => {
                                    return {
                                        value: item,
                                        label: item
                                    }
                                })
                        }
                    />
                </WithClass>
                <WithClass classes='form_controller'>
                    <label className='form_controller__label'> To </label>
                    <Select
                        value={{ value: to, label: to }}
                        onChange={(selected) => setTo(selected.value)}
                        options={
                            dates.slice(Math.round(dates.length / 2)).map((item, idx) => {
                                return {
                                    value: item,
                                    label: item
                                }
                            })
                        }
                    />
                </WithClass>
            </WithClass>
        </WithClass>
    );
}



