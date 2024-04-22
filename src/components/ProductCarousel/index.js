import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product_WC_item from '../Product_WC_Item';
import { useNavigate } from 'react-router-dom';
const responsive = {
    display_6: {
        breakpoint: { max: 3000, min: 1700 },
        items: 6
    },
    display_5: {
        breakpoint: { max: 1700, min: 1450 },
        items: 5
    },
    display_4: {
        breakpoint: { max: 1450, min: 1150 },
        items: 4
    },
    display_3: {
        breakpoint: { max: 1150, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 800 },
        items: 4
    },
    tablet_2: {
        breakpoint: { max: 800, min: 600 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 600, min: 400 },
        items: 3
    },
    mobile_2: {
        breakpoint: { max: 400, min: 0 },
        items: 2
    },

};

function ProductCarousel({ title, listProduct, path }) {
    const navigate = useNavigate();
    const onclick = () => {
        navigate(path)
    }
    return (
        <div className='bg-white m-5 mb-10 p-3 rounded-lg'>
            <div className='mb-2 ms-3 h-[40px] flex items-center justify-between'>
                <div className='font-bold text-[18px]'>{title}</div>
                <div className='text-blue-500 me-4 select-none cursor-pointer' onClick={() => onclick()}>
                    Xem tất cả
                </div>
            </div>
            <div>
                <Carousel
                    responsive={responsive}
                    className='z-0'
                >
                    {
                        listProduct.map((item, index) => (
                            <div key={index}>
                                <Product_WC_item product={item} />

                            </div>
                        ))}
                </Carousel>
            </div>
        </div>
    );
}

export default ProductCarousel;