import React from 'react';
import { MultiSelect } from "react-multi-select-component";

const ProductPromo = ({ promo, setPromo }) => {

    const promodata = [
        { value: '7 Days Retuen', label: '7 Days Retuen' },
        { value: '10% Discount', label: '10% Discount' },
        { value: '100% Indian Product', label: '100% Indian Product' },
        { value: 'Made in Bangladesh', label: 'Made in Bangladesh' },
        { value: 'Made in Chaina', label: 'Made in Chaina' },
        { value: 'Made in India', label: 'Made in India' },
        { value: 'Made in Japan', label: 'Made in Japan' },
        { value: 'Made in USA', label: 'Made in USA' },
        { value: '100% Child Save', label: '100% Child Save' },
        { value: '100% Organic', label: '100% Organic' },
        { value: 'Warranty 60 Days', label: 'Warranty 60 Days' },
        { value: 'Pure Ayurvedic', label: 'Pure Ayurvedic' },

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