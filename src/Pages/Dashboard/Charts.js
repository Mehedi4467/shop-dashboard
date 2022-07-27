import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const Charts = ({ user }) => {
    const [dayAnylics, setDayAnylics] = useState([]);
    const [monthAnylics, setAnylics] = useState([]);
    const [updateAnsylics, setUpdateAnyLics] = useState(false);



    useEffect(() => {
        fetch(`http://localhost:5000/get/all-day-data/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setDayAnylics(data));

    }, [user, updateAnsylics]);

    // console.log(monthAnylics)

    useEffect(() => {
        fetch(`http://localhost:5000/get/all-month-data/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAnylics(data)
            })
    }, [user, updateAnsylics])



    const handelUpdate = () => {
        setUpdateAnyLics(true)
        fetch(`http://localhost:5000/anylics/dashboard/${user.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {

                    setUpdateAnyLics(false)
                }
                // console.log(result)
            });

        fetch(`http://localhost:5000/anylics/month/data/dashboard/${user.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    setUpdateAnyLics(false)
                }
                // console.log(result)
            });

        toast('Your data for today has been updated!');
    }


    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div>
                    <h1 className='text-center md:text-left my-2 text-xl font-bold'>Analyse This Month</h1>
                    <ResponsiveContainer width='100%' height={250}>
                        <BarChart data={dayAnylics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
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
                        <LineChart data={monthAnylics}
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
            <button onClick={() => handelUpdate()} className='btn btn-primary w-full mt-4'>{updateAnsylics ? 'Updating .....' : 'Update Analyse'}</button>
        </div>
    );
};

export default Charts;