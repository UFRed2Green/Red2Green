"use client";

import { useState } from 'react';
import '@/app/styles/dashboard/dashboard.css';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TotalInvested, TotalRevenue, ProfitLoss, TotalTrades } from '@/app/dashboard/dashboard/components/SideBarTrackers';
import TradeForm from './components/TradeForm';
import TradeHistory from './components/TradeHistory';
import { PerformanceChart } from './components/PerformanceChart';
import { RiskToReward } from './components/RiskToReward';
import { Watchlist } from './components/Watchlist';

export default function DashboardPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(true);

    const handleChange = () => {
        setRefreshTrigger(prev => !prev);
    };

    return (
        <ProtectedRoute>
            <main className='dashboard-container'>
                {/*
                    Do not remove / edit the containers just build inside them
                    Feel free to make functions for your elements so theres not so much clutter here
                */}
                <div className='left-column'>
                    <div className='stock-performance-container card-container'>
                        <PerformanceChart refreshTrigger={refreshTrigger} />
                    </div>
                    <div className='add-new-trade-container card-container'>
                        <TradeForm onTradeAdded={handleChange} />
                    </div>
                    <div className='trade-history-container card-container'>
                        <TradeHistory refreshTrigger={refreshTrigger} onTradeDeleted={handleChange} onTradeEdited={handleChange} />
                    </div>
                </div>
                <div className='right-column'>
                    <div className='side-bar-trackers-container1'>
                        <div className='side-bar-trackers-container2'>
                            <div className='total-invested-container'>
                                <TotalInvested refreshTrigger={refreshTrigger} />
                            </div>
                            <div className='total-revenue-container'>
                                <TotalRevenue refreshTrigger={refreshTrigger} />
                            </div>
                        </div>
                        <div className='side-bar-trackers-container2'>
                            <div className='realized-pl-container'>
                                <ProfitLoss refreshTrigger={refreshTrigger} />
                            </div>
                            <div className='total-trades-container'>
                                <TotalTrades refreshTrigger={refreshTrigger} />
                            </div>
                        </div>

                    </div>

                    <div className='card-container'>
                        <Watchlist />
                    </div>

                    <div className='risk-reward-container card-container'>
                        <RiskToReward refreshTrigger={refreshTrigger} />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
