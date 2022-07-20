import React from 'react';
import { MultiSelect } from "react-multi-select-component";

const ProductPromo = ({ promo, setPromo }) => {

    const promodata = [
        { value: 'https://i.ibb.co/Fqv6q2R/return.jpg', label: '7 Days Return' },
        { value: 'https://i.ibb.co/gZV9ZKs/ezgif-com-gif-maker.jpg', label: '10% Discount' },
        { value: 'https://i.ibb.co/zxRWf5c/made-in-india.jpg', label: '100% Indian Product' },
        { value: 'https://i.ibb.co/JnHTqk6/made-in-bangladesh.jpg', label: 'Made in Bangladesh' },
        { value: 'https://i.ibb.co/R6pp6Lh/made-in-china.jpg', label: 'Made in Chaina' },
        { value: 'https://i.ibb.co/zxRWf5c/made-in-india.jpg', label: 'Made in India' },
        { value: 'https://i.ibb.co/3mrTffZ/made-in-japan.jpg', label: 'Made in Japan' },
        { value: 'https://i.ibb.co/Wx2zytn/usa.jpg', label: 'Made in USA' },
        { value: 'https://i.ibb.co/31MqTvZ/Child-Save.jpg', label: '100% Child Save' },
        { value: 'https://i.ibb.co/dJ3HRjg/organic.jpg', label: '100% Organic' },
        { value: 'https://i.ibb.co/G9vWgg1/warranty.jpg', label: 'Warranty 60 Days' },
        { value: 'https://i.ibb.co/gFXLpYm/pure-ayurvedic.jpg', label: 'Pure Ayurvedic' },

    ]

    return (


        <div className='my-2'>
            <h1 className='label-text font-semibold mb-2'>Product Promo <span className='text-sm text-orange-500'>(Make a maximum of 5 options)</span></h1>
            <MultiSelect
                className="select-primary border-primary border-[1px] rounded-lg w-full"
                options={promodata}
                value={promo}
                onChange={setPromo}
                labelledBy="Select Main Category"
            />
        </div>

    );
};

export default ProductPromo;