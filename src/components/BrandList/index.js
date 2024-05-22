import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Brand_WC_Item from '../Brand_WC_Item';

function BrandList({
    list,
    filter,
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
            </div>
            <hr className='mt-5' />
            <div className='mb-7 ms-5'>
                {
                    list.map((item, index) => (
                        <div key={index}>
                            <Brand_WC_Item brand={item} />

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

export default BrandList;