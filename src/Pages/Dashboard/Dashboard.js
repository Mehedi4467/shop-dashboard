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

const Dashboard = () => {

    const [user, loading] = useAuthState(auth);


    const { isLoading, data, refetch } = useQuery('Todayorders', () =>
        fetch(`http://localhost:5000/today/order-info/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    );
    if (loading || isLoading) {
        return <Spinner></Spinner>
    }
    console.log(data)

    return (
        <div>
            <h1 className='text-center md:text-left text-xl font-bold'>Dashboard Overview</h1>

            <div>
                <Pricing data={data} refetch={refetch}></Pricing>
            </div >
            <div className='mt-8'>
                <DashboardStatus></DashboardStatus>
            </div>
            <div className='mt-8'>
                <Charts></Charts>
            </div>
            <div className='mt-8'>
                <OrderList isLoading={isLoading} data={data} refetch={refetch}></OrderList>
            </div>
        </div >
    );
};

export default Dashboard;