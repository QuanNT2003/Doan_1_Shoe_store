import React, { useState } from 'react';
import ProductCarousel from '~/components/ProductCarousel';
import Product_WC_item from '~/components/Product_WC_Item';

const listProduct = [
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        id: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
]
function HomePage() {


    return (
        <div>
            <ProductCarousel title={'Sản phẩm mới'} listProduct={listProduct} path='/products' />
        </div>
    );
}

export default HomePage;