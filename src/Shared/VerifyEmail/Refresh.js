import React, { useState } from 'react';

const Refresh = () => {
    const [value, setValue] = useState();
    const refresh = () => {
        window.location.reload(value);
        setValue({});
    }

    return (
        <div className='mt-6'>
            <p className='text-orange-600'>Click here if you have verified the email</p>
            <button className='btn btn-primary mt-2' onClick={refresh}>Email Verification Complted?</button>
        </div>
    );
};

export default Refresh;




