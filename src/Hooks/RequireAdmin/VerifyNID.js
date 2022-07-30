import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ButtonSpinner from '../../Shared/Spinner/ButtonSpinner';
import Spinner from '../../Shared/Spinner/Spinner';

const VerifyNID = ({ setNidModal }) => {
    const [error, setError] = useState('');
    const [loadings, setLoading] = useState(false);
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Spinner></Spinner>
    }

    const handelUpload = (event) => {
        setLoading(true);
        event.preventDefault();
        const logo = event.target.logo.files[0];
        const nid = event.target.nid.files[0];
        const bin = event.target.bin.files[0];

        let formData = new FormData();
        formData.append('logo', logo);
        formData.append('nid', nid);
        formData.append('bin', bin);
        const imgType = ['image/jpeg', 'image/png', 'image/jpg', 'image/PNG'];

        if (imgType.includes(logo.type) && imgType.includes(nid.type) && imgType.includes(bin.type)) {

            setError('')
            if (logo.size < 1000000 && nid.size < 1000000 && bin.size < 1000000) {
                setError('')
                fetch(`http://localhost:5000/adminUser/nid/upload/${user?.email}`, {
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: formData,
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.result.acknowledged && result.result.modifiedCount > 0) {
                            setLoading(false);
                            setNidModal(null);
                            setError('')
                        }

                    });
            }
            else {
                setError("You can upload only jpg,jpeg,png and size 300 KB")
            }
        }
        else {
            setError('You can upload only jpg, jpeg, png and size 300 KB')
        }

    }
    return (
        <div>

            <input type="checkbox" id="verify-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-orange-500">Please Upload Your NID and BIN Certificate image</h3>

                    {
                        error && <p className='mt-6 text-orange-500 text-center'>{error}</p>
                    }
                    <div className='mt-6'>
                        <form onSubmit={handelUpload}>
                            <div className="flex items-center space-x-6">
                                <div className="shrink-0 my-6">
                                    <h2>{"LOGO ==> "}</h2>
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose Shop Logo</span>
                                    <input
                                        name="logo"
                                        type="file"
                                        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                                        required
                                    />
                                </label>
                            </div>


                            <div className="flex items-center space-x-6">
                                <div className="shrink-0 my-6">
                                    <h2>{"NID ==> "}</h2>
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose Your NID</span>
                                    <input
                                        name="nid"
                                        type="file"
                                        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                                        required
                                    />
                                </label>
                            </div>


                            <div className="flex items-center space-x-6">
                                <div className="shrink-0 my-6">
                                    <h2>{"BIN ==> "}</h2>
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose Your BIN</span>
                                    <input
                                        name="bin"
                                        type="file"
                                        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                                        required
                                    />
                                </label>
                            </div>
                            <div className="modal-action">
                                {
                                    loadings && !error ? <ButtonSpinner></ButtonSpinner> : <button className='btn btn-primary'>Upload</button>
                                }

                                <label htmlFor="verify-modal" className="btn">Cancel</label>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VerifyNID;