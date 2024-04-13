import React from 'react';
import noImage from '~/assets/images/no-image.png';
import Rating from '@mui/material/Rating';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function Product_WC_item({ product }) {
    return (
        <div className='w-[190px] bg-white shadow-xl rounded-md p-2 hover:shadow-2xl m-2 select-none cursor-pointer'>
            <div className='h-[190px] bg-no-repeat bg-center bg-cover '

                style={{
                    backgroundImage: `url('${product.images[0] ? product.images[0].url : noImage}')`,
                }}>

            </div>
            <div className='text-wrap text-ellipsis line-clamp-2 mb-1'>
                {product.name}
            </div>
            <div className='flex text-red-500 mb-1'>
                {
                    product.discount === 0 ? <div>{addCommas(product.price)}</div> : <div>{addCommas(product.price * ((100 - product.discount) / 100))}</div>
                }
                đ
            </div>
            <div className='mb-1 min-h-[20px] hidden md:block'>
                {
                    product.discount === 0 ?
                        <div></div> :
                        <div className='flex'>
                            <div className='me-2 text-[13px] line-through'>{addCommas(product.price)} đ </div>
                            <div className='me-2 text-[13px]'> - {product.discount}% </div>
                        </div>
                }
            </div>
            <div className='md:flex items-center hidden'>
                <Rating name="size-large" value={4} readOnly size="large" className='me-2' />
                <div className='me-2 text-[13px]'>
                    (38)
                </div>
            </div>
        </div>
    );
}

export default Product_WC_item;