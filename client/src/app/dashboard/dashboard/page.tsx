"use client";

import { useState } from 'react';
import '@/app/styles/dashboard/dashboard.css';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TotalInvested, TotalRevenue, ProfitLoss, TotalTrades } from '@/app/dashboard/dashboard/components/SideBarTrackers';
import TradeForm from './components/TradeForm';
import TradeHistory from './components/TradeHistory';

export default function DashboardPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTradeAdded = () => {
        setRefreshTrigger(prev => prev + 1);
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
                        Performance chart
                    </div>
                    <div className='add-new-trade-container card-container'>
                        <TradeForm onTradeAdded={handleTradeAdded} />
                    </div>
                    <div className='trade-history-container card-container'>
                        <TradeHistory refreshTrigger={refreshTrigger} />
                    </div>
                </div>
                <div className='right-column'>
                    <div className='total-invested-container card-container'>
                        <TotalInvested />
                    </div>
                    <div className='total-revenue-container card-container'>
                        <TotalRevenue />
                    </div>
                    <div className='realized-pl-container card-container'>
                        <ProfitLoss />
                    </div>
                    <div className='total-trades-container card-container'>
                        <TotalTrades />
                    </div>
                    <div className='risk-reward-container card-container'>
                        Risk Reward
                    </div>
                    <div className='position-sizes-container card-container'>
                        Position sizes bar chart
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
