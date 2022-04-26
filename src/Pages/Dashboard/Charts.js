import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Charts = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('orderSummery.json')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);


    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h1 className='my-2 text-xl font-bold'>Conversions This Year</h1>

                <BarChart width={450} height={250} data={orders}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sell" fill="#8884D8" />
                </BarChart>
            </div>
            <div className=''>
                <h1 className='my-2 text-xl font-bold'>Conversions This Year</h1>
                <LineChart width={450} height={250} data={orders}
                    margin={{ top: 5, right: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sell" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default Charts;