import React from 'react';
import OrderList from '../../Shared/OrderList/OrderList';
import Charts from './Charts';
import DashboardStatus from './DashboardStatus';
import Pricing from './Pricing';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <h1 className='text-center md:text-left text-xl font-bold'>Dashboard Overview</h1>

            <div>
                <Pricing></Pricing>
            </div >
            <div className='mt-8'>
                <DashboardStatus></DashboardStatus>
            </div>
            <div className='mt-8'>
                <Charts></Charts>
            </div>

            <div className='mt-8'>
                <OrderList></OrderList>
            </div>
        </div >
    );
};

export default Dashboard;