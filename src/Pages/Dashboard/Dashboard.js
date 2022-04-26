import React from 'react';
import DashboardStatus from './DashboardStatus';
import Pricing from './Pricing';

const Dashboard = () => {
    return (
        <div>
            <h1 className='text-xl font-bold'>Dashboard Overview</h1>

            <div>
                <Pricing></Pricing>
            </div >
            <div className='mt-8'>
                <DashboardStatus></DashboardStatus>
            </div>
        </div >
    );
};

export default Dashboard;