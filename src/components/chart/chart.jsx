import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

export function Chart() {
    const [options, setOptions] = useState({
        series: [],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        yaxis: {
            min: 0,
            tickAmount: 4,
            labels: {
                formatter: (value) => {
                    return value.toFixed(2).replace('.', ',');
                },
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm',
                },
                style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                },
            },
        },
        fill: {
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
        colors: ['#7C3AED', '#FF9800', '#F44336', '#4CAF50', '#4c77af', '#af4ca2', '#4ca0af', '#c2c507', '#af4c7d'],
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
            y: {
                formatter: (value) => {
                    return value.toFixed(2).replace('.', ',');
                },
            },
        },

    });

    const [series, setSeries] = useState([
        {
            name: 'BRL',
            data: [],
        },
        {
            name: 'USD',
            data: [],
        },
        {
            name: 'EUR',
            data: [],
        },
        {
            name: 'GBP',
            data: [],
        },
        {
            name: 'JPY',
            data: [],
        },
        {
            name: 'CAD',
            data: [],
        },
        {
            name: 'AUD',
            data: [],
        },
        {
            name: 'CNY',
            data: [],
        },
        {
            name: 'CHF',
            data: [],
        },
    ]);

    useEffect(() => {
        async function fetchExchangeRates() {
            try {
                const response = await axios.get('https://api.exchangerate.host/timeseries', {
                    params: {
                        base: 'BRL',
                        symbols: 'USD,EUR,GBP,JPY,CAD,AUD,CNY,CHF',
                        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
                        end_date: new Date().toISOString().substr(0, 10),
                    },
                });

                const rates = response.data.rates;

                const newSeries = series.map((item) => {
                    const data = Object.entries(rates).map(([date, { USD, EUR, GBP, JPY, CAD, AUD, CNY, CHF }]) => ({
                        x: new Date(date).getTime(),
                        y: item.name === 'BRL' ? 1 : eval(item.name) / USD,
                    }));

                    return { ...item, data };
                });

                setSeries(newSeries);
            } catch (error) {
                console.error(error);
            }
        }

        fetchExchangeRates();
    }, []);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
}
