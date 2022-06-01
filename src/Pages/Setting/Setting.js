
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import AddSliderModal from './AddSliderModal';
import SliderDeleteModal from './SliderDeleteModal';
import SliderUpdate from './SliderUpdate';

const Setting = () => {
    const [sliderModal, setSliderMoodal] = useState(null);
    const [user, loading] = useAuthState(auth);
    const [sliders, setSliders] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/slider/${user?.email}?name=${search}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSliders(data)
            })
    }, [user, search, sliderModal])

    const handelSliderStatus = (id, value) => {
        fetch(`http://localhost:5000/slider/status/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ value })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.modifiedCount > 0) {
                    toast(`Slider Status ${value}`);
                }
            })
    }


    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <h2 className='text-xl text-center text-orange-500 font-bold'>Setting</h2>


            <div className='md:grid grid-cols-2 gap-4 justify-center  mt-5 items-center '>
                <div className='md:flex justify-between hidden  order-1 md:order-2 gap-4 mb-8 md:mb-0'>

                    <label onClick={(e) => setSliderMoodal(true)} htmlFor="slider-add-modal" className='bg-green-400 btn hover:bg-green-500 h-12 w-52 text-white font-bold rounded-full '>Add Slider</label>
                </div>

                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input onChange={(e) => setSearch(e.target.value)} className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search slider Title' />
                </div>
            </div>


            <div className="overflow-x-auto mt-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Link</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sliders?.map((slider, index) => <tr key={slider._id}>
                                <th>{index + 1}</th>
                                <td>{slider.title}</td>
                                <td>{slider.description.slice(0, 20) + "..."}</td>
                                <td>
                                    <a className='btn' href={slider.link} rel="noopener noreferrer" target='_blank'>Link</a>
                                </td>
                                <td>
                                    <div class="form-control">
                                        <label class="label cursor-pointer">
                                            <input onClick={(e) => handelSliderStatus(slider._id, e.target.checked)} type="checkbox" className="toggle toggle-primary" defaultChecked={slider.status} />
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-between'>
                                        <label htmlFor="slider-update"> <i onClick={() => setSliderMoodal(slider)} className=" cursor-pointer fa-solid fa-pen-to-square"></i></label>

                                        <label htmlFor="slider-delete-modal"> <i onClick={() => setSliderMoodal(slider)} className="cursor-pointer fa-solid fa-trash-can"></i></label>

                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                sliderModal && <SliderUpdate sliderModal={sliderModal} setSliderMoodal={setSliderMoodal}></SliderUpdate>
            }

            {
                sliderModal && <SliderDeleteModal sliderModal={sliderModal} setSliderMoodal={setSliderMoodal}></SliderDeleteModal>
            }

            {
                sliderModal && <AddSliderModal sliderModal={sliderModal} setSliderMoodal={setSliderMoodal}></AddSliderModal>
            }


        </div>
    );
};

export default Setting;