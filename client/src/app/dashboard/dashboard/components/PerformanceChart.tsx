"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { getTrades, type Trade } from '@/lib/trades';
import { useAuth } from '@/context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import '@/app/styles/dashboard/dashboard.css';

interface SideBarProps {
    refreshTrigger?: boolean;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function PerformanceChart({ refreshTrigger }: SideBarProps) {
    const { token } = useAuth();
    const [chartData, setChartData] = useState({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Stock Price",
                data: [120, 125, 123, 130, 128],
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
            },
        ],
    });
    const [chartMode, setChartMode] = useState("Total");

    function getRandomColor(opacity = 1): string {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r},${g},${b},${opacity})`;
    }

    const fetchTrades = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getTrades(token);

            const labels = [];
            for (let i = 30; i > 0; i--) {
                labels.push(`Day ${i}`);
            }

            labels[29] = "Today";

            const today = new Date();
            const day30 = new Date();
            day30.setDate(today.getDate() - 29);

            const map = new Map<String, Map<String, number>>();

            for (const trade of data) {
                const tradeDate = new Date(trade.tradeDate);
                const date = tradeDate < day30 ? day30.toDateString() : tradeDate.toDateString();
                const value = trade.quantity * (trade.tradeType === "BUY" ? 1 : -1);

                if (!map.has(trade.ticker)) {
                    map.set(trade.ticker, new Map());
                }

                let current = 0;
                if (map.get(trade.ticker)!.has(date)) {
                    current = map.get(trade.ticker)!.get(date)!;
                }
                map.get(trade.ticker)?.set(date, current + value);
            }

            const datasets = [];
            for (const ticker of map) {
                const tickerData: number[] = [];
                for (let i = 29; i > -1; i--) {
                    const date = new Date();
                    date.setDate(today.getDate() - i);
                    if (ticker[1].has(date.toDateString())) {
                        tickerData.push(Number(ticker[1].get(date.toDateString())));
                    } else if (i == 29) {
                        tickerData.push(0);
                    } else {
                        tickerData.push(tickerData[tickerData.length - 1]);
                    }

                }

                const color = getRandomColor()

                datasets.push({
                    label: String(ticker[0]),
                    data: tickerData,
                    borderColor: color,
                    backgroundColor: color,
                    pointRadius: 0
                });
            }

            console.log(datasets);

            const chartSet = {
                labels,
                datasets
            };

            setChartData(chartSet);

        } catch (error) {
            console.error('Failed to fetch trades:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token]);

    useEffect(() => {
        const data = fetchTrades();
    }, [fetchTrades, refreshTrigger, chartMode]);


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Performance" },
        },
        layout: {
            padding: 10,
        },
        elements: {
            line: {
                borderJoinStyle: 'round',
            }
        },
        spanGaps: true,
        cubicInterpolationMode: 'monotone',
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <button
                onClick={() =>
                    chartMode === "Total" ? setChartMode("Individual") : setChartMode("Total")
                }
                className="performance-chart-button"
            >{chartMode === "Total" ? "Individual" : "Total"}</button>
            <Line data={chartData} options={options} />
        </div>
    );
}