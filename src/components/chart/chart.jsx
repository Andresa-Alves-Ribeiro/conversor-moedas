import ReactApexChart from 'react-apexcharts';


export function Chart() {
    const options = {
        series: [
            {
                name: "cambio",
                data: [
                    {
                        x: new Date("2023-03-22").getTime(),
                        y: 5.26,
                    },
                    {
                        x: new Date("2023-03-23").getTime(),
                        y: 5.26,
                    },
                    {
                        x: new Date("2023-03-24").getTime(),
                        y: 5.29,
                    },
                    {
                        x: new Date("2023-03-25").getTime(),
                        y: 5.29,
                    },
                    {
                        x: new Date("2023-03-26").getTime(),
                        y: 5.29,
                    },
                    {
                        x: new Date("2023-03-27").getTime(),
                        y: 5.23,
                    },
                    {
                        x: new Date("2023-03-28").getTime(),
                        y: 5.17,
                    },
                    {
                        x: new Date("2023-03-29").getTime(),
                        y: 5.17,
                    },
                ],
            },
        ],
        chart: {
            height: 350,
            type: "area",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        yaxis: {
            min: 5,
            tickAmount: 4,
            labels: {
                formatter: (value) => {
                    return value.toFixed(1).replace(".", ",");
                },
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
            axisTicks: {
                show: false,
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
        colors: ["#7C3AED"],
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `<div class="tooltip">
          <span>${String(series[seriesIndex][dataPointIndex]).replace(
                    ".",
                    ","
                )}</span>
          <span>${new Date(
                    w.globals.seriesX[seriesIndex][dataPointIndex]
                ).toLocaleDateString("pt-BR", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                })}</span>
          </div>`;
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={options.series} type="area" height={350} />
        </div>
    );
}
