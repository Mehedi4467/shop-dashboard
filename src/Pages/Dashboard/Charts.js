import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const Charts = ({ monthData }) => {
    const [orders, setOrders] = useState([]);



    const monthAnalyse = [];
    console.log(monthData)
    for (let x of monthData) {

    }


    useEffect(() => {
        fetch('orderSummery.json')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);




    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h1 className='text-center md:text-left my-2 text-xl font-bold'>Analyse This Month</h1>
                <ResponsiveContainer width='100%' height={250}>
                    <BarChart data={orders}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sell" fill="#8884D8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className=''>
                <h1 className='text-center md:text-left my-2 text-xl font-bold'>Analyse This Year</h1>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={orders}
                        margin={{ top: 5, right: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sell" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;