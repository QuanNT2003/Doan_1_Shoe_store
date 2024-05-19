import React, { useState } from 'react';
import Product_WC_item from '../Product_WC_Item';
import Pagination from '@mui/material/Pagination';
import ModalLoading from '../ModalLoading';

function ProductList({
    list,
    filter,
    sort,
    totalPage,
    changePage,
}) {
    const handleChange = (event, value) => {
        changePage(value)
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
                <Pagination count={totalPage} color="primary" onChange={handleChange} />
            </div>
        </div>
    );
}

export default ProductList;