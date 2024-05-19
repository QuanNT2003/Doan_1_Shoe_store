import React from 'react';
import noImage from '~/assets/images/no-image.png';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function Product_WC_item({ product }) {
    const navigate = useNavigate();
    const onclick = () => {
        navigate('/product_collection/' + product.productId)
    }
    return (
        <div className='w-[120px] sm:w-[170px] bg-white shadow-xl rounded-md p-2 hover:shadow-2xl m-2 select-none cursor-pointer' onClick={() => onclick()}>
            <div className='h-[100px] sm:h-[160px] bg-no-repeat bg-cover '
                style={{
                    backgroundImage: `url('${product.images[0] ? product.images[0].url : noImage}')`,
                }}>

            </div>
            <div className='ssm:text-wrap mt-2 h-[42px] text-ellipsis line-clamp-1 ssm:line-clamp-2 mb-1 ssm:text-[14px] text-[11px]'>
                {product.name}
            </div>
            <div className='flex text-red-500 mb-1'>
                {
                    product.discount === 0 ? <div className='ssm:text-[14px] text-[11px]'>{addCommas(product.price)}đ</div> : <div className='ssm:text-[14px] text-[11px]'>{addCommas(product.price * ((100 - product.discount) / 100))}đ</div>
                }

            </div>
            <div className='mb-1 min-h-[20px] hidden md:block'>
                {
                    product.discount === 0 ?
                        <div></div> :
                        <div className='flex'>
                            <div className='me-2 ssm:text-[13px] line-through text-[11px]'>{addCommas(product.price)} đ </div>
                            <div className='me-2 ssm:text-[13px] text-[11px]'> - {product.discount}% </div>
                        </div>
                }
            </div>
            <div className='md:flex items-center'>
                <Rating name="size-large" value={product.star} readOnly size="small" className='me-2' />
                <div className='me-2 text-[11px] ssm:text-[13px]'>
                    (38)
                </div>
            </div>
        </div>
    );
}

export default Product_WC_item;