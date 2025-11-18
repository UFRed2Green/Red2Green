import { TbPigMoney } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuTrendingUpDown } from "react-icons/lu";
import { FaExchangeAlt } from "react-icons/fa";
import { useCallback, useEffect, useState } from 'react';
import { getTrades, type Trade } from '@/lib/trades';
import { useAuth } from '@/context/AuthContext';
import { getStockPrices } from "@/lib/stocks";
import '@/app/styles/dashboard/side-bar-trackers.css';
import { IoMdReturnLeft } from "react-icons/io";

interface SideBarProps {
  refreshTrigger?: boolean;
}

export function TotalInvested({ refreshTrigger }: SideBarProps) {
    const { token } = useAuth();
    const [total, setTotal] = useState(0);

    const fetchTotal = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getTrades(token);
            
            let c = 0;
            for (const trade of data) {
                if (trade.tradeType == "BUY") {
                    c += Number(trade.price) * trade.quantity;
                }
            }
            
            setTotal(Math.max(Math.floor(c * 100) / 100, 0));
        } catch (error) {
            console.error('Failed to fetch trades:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token]);

    useEffect(() => {
        fetchTotal();
    }, [fetchTotal, refreshTrigger]);

    return (
        <div className='total-invested-container'>
            <div className='invested-header-container'>
                < TbPigMoney size={20}/>
                <h1>Total Invested</h1>
            </div>
            <div className='invested-amount-container'>
                <h1>{ total }</h1>
            </div>
        </div>
    );
}

export function TotalRevenue({ refreshTrigger }: SideBarProps) {
    const { token } = useAuth(); 
    const [revenue, setRevenue] = useState(-1);

    const calacRevenue = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getTrades(token);
            
            let c = 0;
            for (const trade of data) {
                if (trade.tradeType === "SELL") {
                    c += trade.quantity * Number(trade.price);
                }
            }

            setRevenue(Math.floor(c * 100) / 100);
        } catch (error) {
            console.error('Failed to fetch trades:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token]);

    useEffect(() => {
        calacRevenue();
    }, [calacRevenue, refreshTrigger]);

    return (
        <div className='total-revenue-container'>
            <div className='revenue-header-container'>
                < FaArrowTrendUp size={20}/>
                <h1>Total Revenue</h1>
            </div>
            <div className='revenue-amount-container'>
                <h1>{revenue < 0 ? "-" : revenue}</h1>
            </div>
        </div>
    );
}

export function ProfitLoss({ refreshTrigger }: SideBarProps) {
    const { token } = useAuth(); 
    const [profitLoss, setProfitLoss] = useState(-1);

    const calacProfitLoss = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getTrades(token);
            
            let totInvested = 0;
            for (const trade of data) {
                if (trade.tradeType == "BUY") {
                    totInvested += Number(trade.price) * trade.quantity;
                }
            }

            let totRev = 0;
            for (const trade of data) {
                if (trade.tradeType === "SELL") {
                    totRev += trade.quantity * Number(trade.price);
                }
            }

            const rpl = Math.floor((totRev - totInvested) * 100) / 100;
            setProfitLoss(rpl);
        } catch (error) {
            console.error('Failed to fetch trades:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token]);

    useEffect(() => {
        calacProfitLoss();
    }, [calacProfitLoss, refreshTrigger]);

    return (
        <div className='realized-pl-container'>
            <div className='realized-header-container'>
                < LuTrendingUpDown size={20}/>
                <h1>Realized P&L</h1>
            </div>
            <div className='realized-amount-container'>
                <h1>{ profitLoss }</h1>
            </div>
        </div>
    );
}

export function TotalTrades({ refreshTrigger }: SideBarProps) {
    const { token } = useAuth();
    const [shares, setShares] = useState(0);

    const fetchTrades = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getTrades(token);
            const map: Record<string, number> = {};
            
            for (const trade of data) {
                if (!map[trade.ticker]) {
                    map[trade.ticker] = 0;
                }

                if (trade.tradeType == "SELL") {
                    map[trade.ticker] -= Math.max(trade.quantity, 0);

                } else {
                    map[trade.ticker] += trade.quantity;
                } 
            }

            let total = 0;
            for (const ticker in map) {
                total += map[ticker];
            }
            
            setShares(total);
        } catch (error) {
            console.error('Failed to fetch trades:', error);
            alert(error instanceof Error ? error.message : 'Failed to fetch trades');
        }
    }, [token]);

    useEffect(() => {
        fetchTrades();
    }, [fetchTrades, refreshTrigger]);

    return (
        <div className='total-trades-container'>
            <div className='trades-header-container'>
                < FaExchangeAlt size={20}/>
                <h1>Total Shares</h1>
            </div>
            <div className='trades-amount-container'>
                <h1>{ shares }</h1>
            </div>
        </div>
    );
}


