import React from 'react';
import OrderList from '../../Shared/OrderList/OrderList';
import Charts from './Charts';
import DashboardStatus from './DashboardStatus';
import Pricing from './Pricing';
import './Dashboard.css';
import { useQuery } from "react-query";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import useMonthData from '../../Hooks/useAdminData/useMonthData';

const Dashboard = () => {

    const [user, loading] = useAuthState(auth);
    const [monthData, monthLoading] = useMonthData(user);
    const { isLoading, data, refetch } = useQuery('Todayorders', () =>
        fetch(`http://localhost:5000/today/order-info/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    );



    if (loading || isLoading || monthLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div>
            <h1 className='text-center md:text-left text-xl font-bold'>Dashboard Overview</h1>

            <div>
                <Pricing todayData={data} refetch={refetch}></Pricing>
            </div >
            <div className='mt-8'>
                <DashboardStatus user={user} monthData={monthData}></DashboardStatus>
            </div>
            <div className='mt-8'>
                <Charts monthData={monthData}></Charts>
            </div>
            <div className='mt-8'>
                <OrderList isLoading={isLoading} data={data} refetch={refetch}></OrderList>
            </div>
        </div >
    );
};

export default Dashboard;