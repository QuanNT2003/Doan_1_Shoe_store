import React, { useState } from 'react';
import Product_WC_item from '../Product_WC_Item';
import Pagination from '@mui/material/Pagination';
import MultiSelectComp from '~/components/MultiSelectComp';


function ProductList({
    list,
    filter,
    sort
}) {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
            <div className='m-3 p-3'>
                <div className='font-bold'>
                    Chọn tiêu chí lọc
                </div>
                {filter}

            </div>
            <div className='m-3 p-3'>
                {sort}
            </div>
            <hr className='mt-5' />
            <div className='flex flex-wrap mb-7 ms-5'>
                {
                    list.map((item, index) => (
                        <div key={index}>
                            <Product_WC_item product={item} />

                        </div>
                    ))
                }
            </div>
            <div className='flex justify-end pb-4 me-4'>
                <Pagination count={10} color="primary" onChange={handleChange} />
            </div>
        </div>
    );
}

export default ProductList;