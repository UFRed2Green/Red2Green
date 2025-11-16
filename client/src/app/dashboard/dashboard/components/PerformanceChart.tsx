"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { getTrades } from '@/lib/trades';
import { useAuth } from '@/context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import '@/app/styles/dashboard/dashboard.css';
import { getStockPrices } from "@/lib/stocks";

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
    const [totalMode, setTotalMode] = useState(true);

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

            labels[29] = "Current";

            const today = new Date();
            today.setDate(today.getDate() - 1);
            const day30 = new Date();
            day30.setDate(today.getDate() - 30);

            const map = new Map<String, Map<String, number>>();

            for (const trade of data) {
                const tradeDate = new Date(trade.tradeDate);
                let date = tradeDate < day30 ? day30.toDateString() : tradeDate.toDateString();
                if (tradeDate > today) {
                    date = tradeDate.toDateString();
                }
                const value = trade.quantity * (trade.tradeType === "BUY" ? 1 : -1);

                if (!map.has(trade.ticker)) {
                    map.set(trade.ticker, new Map());
                }

                map.get(trade.ticker)?.set(date, value);
            }

            const datasets = [];
            if (totalMode) {
                for (const ticker of map) {
                    const tickerData: number[] = [];
                    let total = 0;
                    const stockData = await getStockPrices(token, String(ticker[0]), "D");
                    let prevTotal = 0;
                    for (let i = 29; i > -1; i--) {
                        const date = new Date();
                        date.setDate(today.getDate() - i);

                        const index = -i + 29;
                        const closePrice = stockData[index] ? Number(stockData[index].close) : 0;

                        if (ticker[1].has(date.toDateString())) {
                            total += Number(ticker[1].get(date.toDateString()));
                            prevTotal = total;
                            tickerData.push(total * closePrice);
                        } else if (i == 29) {
                            tickerData.push(0);
                        } else {
                            tickerData.push(prevTotal * closePrice);
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
            } else {
                const perfTotal: number[] = new Array(30).fill(0);
                for (const ticker of map) {
                    let total = 0;
                    const stockData = await getStockPrices(token, String(ticker[0]), "D");
                    let prevTotal = 0;
                    for (let i = 29; i > -1; i--) {
                        const date = new Date();
                        date.setDate(today.getDate() - i);

                        const index = -i + 29;
                        const closePrice = stockData[index] ? Number(stockData[index].close) : 0;

                        if (ticker[1].has(date.toDateString())) {
                            total += Number(ticker[1].get(date.toDateString()));
                            prevTotal = total;
                            perfTotal[index] += (total * closePrice);
                        } else if (i == 29) {
                            perfTotal[index] = 0;
                        } else {
                            perfTotal[index] += prevTotal * closePrice;
                        }

                    }
                }

                const color = getRandomColor()

                datasets.push({
                    label: "Total",
                    data: perfTotal,
                    borderColor: color,
                    backgroundColor: color,
                    pointRadius: 0
                });
            }
            

            const chartSet = {
                labels,
                datasets
            };

            setChartData(chartSet);

        } catch (error) {
            console.error('Failed to fetch trades:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token, totalMode]);

    useEffect(() => {
        const data = fetchTrades();
    }, [fetchTrades, refreshTrigger, totalMode]);


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
                onClick={() => setTotalMode(!totalMode)}
                className="performance-chart-button"
            >{totalMode ? "Individual" : "Total"}</button>
            <Line data={chartData} options={options} />
        </div>
    );
}