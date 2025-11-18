import '@/app/styles/dashboard/risk-to-reward.css';
import { getTrades, type Trade } from '@/lib/trades';
import { useAuth } from '@/context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";

interface SideBarProps {
    refreshTrigger?: boolean;
}

export function RiskToReward({ refreshTrigger }: SideBarProps) {
    const { token } = useAuth();
    const [priceOptions, setPriceOptions] = useState<any[]>([]);
    const [tickerOptions, setTickerOptions] = useState<any[]>([]);
    const [stopLossPrice, setStopLossPrice] = useState("");
    const [targetPrice, setTargetPrice] = useState("");
    const [price, setPrice] = useState(-1);
    const [ticker, setTicker] = useState("");
    const [ratio, setRatio] = useState(0.00);
    const [ratioColor, setRatioColor] = useState("");

    const fetchTickerOptions = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getTrades(token);

            const tickers = new Set<string>();
            tickers.add("");
            for (const trade of data) {
                tickers.add(trade.ticker);
            }

            setTickerOptions(
                Array.from(tickers).map((ticker, i) => (
                <option key={i} value={ticker}>
                    {ticker}
                </option>
                ))
            );
        } catch (error) {
            console.error('Failed to fetch tickers:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token]);

    const fetchPriceOptions = useCallback(async () => {
        if (!token || ticker === "") return;

        try {
            const data = await getTrades(token);

            const prices = new Set<string>();
            prices.add("");
            for (const trade of data) {
                if (trade.ticker === ticker) {
                    prices.add(trade.price);
                }
            }

            setPriceOptions(
                Array.from(prices).map((price, i) => (
                <option key={i} value={price}>
                    {price}
                </option>
                ))
            );
        } catch (error) {
            console.error('Failed to fetch prices:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [ticker, token]);

    const calculateRatio = useCallback(async () => {
        if (ticker === "" || price == -1 || targetPrice == "" || stopLossPrice === "" || 
            Number(targetPrice) < 0 || Number(stopLossPrice) < 0 || Number(targetPrice) == price || 
            Number(stopLossPrice) > price || Number(targetPrice) < price 
        ) {
            setRatio(0);
            setRatioColor("rgb(213, 0, 0)");
            return;
        };

        const ratio = Math.floor((price - Number(stopLossPrice)) / (Number(targetPrice) - price) * 100) / 100
        setRatio(ratio);

        function lerp(a: number, b: number, t: number) {
            return a + (b - a) * t;
        }
        function interpolateColor(c1: number[], c2: number[], t: number) {
            const r = Math.round(lerp(c1[0], c2[0], t));
            const g = Math.round(lerp(c1[1], c2[1], t));
            const b = Math.round(lerp(c1[2], c2[2], t));
            return `rgb(${r}, ${g}, ${b})`;
        }

        const r = Math.max(0, Math.min(ratio, 2));
        const green = [0, 200, 83];
        const yellow = [255, 235, 59];
        const red = [213, 0, 0];

        if (r <= 1) {
            setRatioColor(interpolateColor(green, yellow, r / 1));
        } else {
            setRatioColor(interpolateColor(yellow, red, (r - 1) / 1));
        }
    }, [ticker, price, targetPrice, stopLossPrice, token]);

    useEffect(() => {
        fetchTickerOptions();
    }, [fetchTickerOptions, refreshTrigger]);

    useEffect(() => {
        fetchPriceOptions();
    }, [fetchPriceOptions, ticker, refreshTrigger]);

    useEffect(() => {
        calculateRatio();
    }, [calculateRatio, ticker, price, stopLossPrice, targetPrice]);

    return (
        <div className='risk-to-reward-container'>
            <div className='header-container'>
                <div className='title-with-icon'>
                    <FaExclamationTriangle size={20} color='#f56767ff' />
                    <h2 className="section-heading">Risk to Reward</h2>
                </div>
            </div>
            <div className='title-selects'>
                <p>Ticker:</p>
                <select
                    value={ticker}
                    onChange={(e) => {
                        setTicker(e.target.value)
                        if (e.target.value === "") {
                            setPriceOptions([]);
                        }
                    }}
                >
                    {tickerOptions}
                </select>
                <p>Price:</p>
                <select
                    value={price}
                    onChange={(e) => {
                        if (e.target.value === "") {
                            setPrice(-1);
                        } else {
                            setPrice(Number(e.target.value));
                        }
                    }}
                >
                    {priceOptions}
                </select>
            </div>
            <div className='input-container'>
                <p>Stop Loss Price:</p>
                <input
                    placeholder="100.00"
                    type="number"
                    min={0}
                    value={stopLossPrice}
                    onChange={(e) => {
                        setStopLossPrice(e.target.value);
                    }}
                />
            </div>
            <div className='input-container'>
                <p>Target Price:</p>
                <input
                    placeholder="100.00"
                    type="number"
                    min={0}
                    value={targetPrice}
                    onChange={(e) => {
                        setTargetPrice(e.target.value);
                    }}
                />
            </div>
            <div className='ratio-container'>
                <p>Risk/Reward Ratio</p>
                <div className='win-rate' style={{ color: ratioColor, fontWeight: "bold", fontSize: "1.5rem" }}>
                    {ratio}
                </div>
            </div>
        </div>
    );
}
