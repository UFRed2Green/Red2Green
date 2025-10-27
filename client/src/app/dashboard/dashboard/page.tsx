import '@/app/styles/dashboard/dashboard.css';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
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
                        Add new trade
                    </div>
                    <div className='trade-history-container card-container'>
                        Trade history / viewer
                    </div>
                </div>
                <div className='right-column'>
                    <div className='total-invested-container card-container'>
                        Total invested
                    </div>
                    <div className='total-revenue-container card-container'>
                        Total revenue
                    </div>
                    <div className='realized-pl-container card-container'>
                        Realized P&L
                    </div>
                    <div className='total-trades-container card-container'>
                        Total trades
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
