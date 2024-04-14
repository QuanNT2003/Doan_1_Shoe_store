import React, { useState } from 'react';
import Categories from '~/components/Categories';
import ProductCarousel from '~/components/ProductCarousel';
import Product_WC_item from '~/components/Product_WC_Item';
import UtilityBar from '~/components/UtilityBar';


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
const listCategories = [
    {
        id: 1,
        name: 'Giày sandal',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày công sở ',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày sabo',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày mọi',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày tăng chiều cao',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày bốt',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày sneaker',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày cao rót',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày thể thao',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày trẻ em',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
]
function HomePage() {


    return (
        <div className='select-none'>
            <UtilityBar />
            <ProductCarousel title={'Siêu khuyến mãi'} listProduct={listProduct} path='/products' />
            <ProductCarousel title={'Sản phẩm mới'} listProduct={listProduct} path='/products' />
            <Categories list={listCategories} />
            <ProductCarousel title={'Siêu khuyến mãi'} listProduct={listProduct} path='/products' />
            <div className='bg-white m-5 mb-10 p-3 rounded-lg'>
                <div className='mb-2 ms-3 h-[40px] flex items-center justify-between'>
                    <div className='font-bold text-[16px]'>Just for you</div>
                </div>
                <div className='flex flex-wrap'>
                    {
                        listProduct.map((item, index) => (
                            <div key={index}>
                                <Product_WC_item product={item} />

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;