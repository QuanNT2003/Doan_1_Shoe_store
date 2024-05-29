import React from 'react';
import Rating from '@mui/material/Rating';
import ListComment from '../ListComment';
import * as CommentServices from '~/apiServices/commentServices'
function Select_Rating({
    productId
}) {
    return (
        <div>
            <div className='md:flex items-center mb-4'>
                <div className='me-2 text-[17px] font-bold'>Đánh giá nhận xét về sản phẩm</div>
                <div className='flex'>
                    <span>( { }</span>
                    <div>10 lượt đánh giá )</div>
                </div>
            </div>
            <div className='md:flex'>
                <div className='md:w-[50%] mb-3 flex justify-center items-center md:border-r-2 md:border-gray-400'>
                    <div className='md:text-[50px] text-[30px] me-3'>4.5</div>
                    <div className='md:text-[40px] text-[25px] me-5 text-zinc-500'>/5</div>
                    <Rating name="size-large" value={4.5} precision={0.5} readOnly size="large" />
                </div>
                <div className='md:w-[50%] ps-7 justify-center'>
                    <div className='flex items-center mb-3'>
                        <Rating value={1} readOnly />
                        <div className='ms-7 text-[13px]'>30</div>
                    </div>
                    <div className='flex items-center mb-3'>
                        <Rating value={2} readOnly />
                        <div className='ms-7 text-[13px]'>30</div>
                    </div>
                    <div className='flex items-center mb-3'>
                        <Rating value={3} readOnly />
                        <div className='ms-7 text-[13px]'>30</div>
                    </div>
                    <div className='flex items-center mb-3'>
                        <Rating value={4} readOnly />
                        <div className='ms-7 text-[13px]'>30</div>
                    </div>
                    <div className='flex items-center mb-3'>
                        <Rating value={5} readOnly />
                        <div className='ms-7 text-[13px]'>30</div>
                    </div>
                </div>


            </div>
            <hr className='my-5' />
            <ListComment productId={productId} />
        </div>
    );
}

export default Select_Rating;