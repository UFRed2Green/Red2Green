import { TbPigMoney } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuTrendingUpDown } from "react-icons/lu";
import { FaExchangeAlt } from "react-icons/fa";
import '@/app/styles/dashboard/side-bar-trackers.css';

export function TotalInvested() {
    return (
        <div className='total-invested-container'>
            <div className='invested-header-container'>
                < TbPigMoney size={40}/>
                <h1>Total Invested</h1>
            </div>
            <div className='invested-amount-container'>
                <h1>123,456</h1>
            </div>
        </div>
    );
}

export function TotalRevenue() {
    return (
        <div className='total-revenue-container'>
            <div className='revenue-header-container'>
                < FaArrowTrendUp size={40}/>
                <h1>Total Revenue</h1>
            </div>
            <div className='revenue-amount-container'>
                <h1>123,456</h1>
            </div>
        </div>
    );
}

export function ProfitLoss() {
    return (
        <div className='realized-container'>
            <div className='realized-header-container'>
                < LuTrendingUpDown size={40}/>
                <h1>Realized P&L</h1>
            </div>
            <div className='realized-amount-container'>
                <h1>123,456</h1>
            </div>
        </div>
    );
}

export function TotalTrades() {
    return (
        <div className='total-trades-container'>
            <div className='trades-header-container'>
                < FaExchangeAlt size={40}/>
                <h1>Total Trades</h1>
            </div>
            <div className='trades-amount-container'>
                <h1>123,456</h1>
            </div>
        </div>
    );
}


