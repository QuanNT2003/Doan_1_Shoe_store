import React from 'react';
import example from '~/assets/example.jpg'
import ProductCarousel from '../ProductCarousel';
import { useNavigate } from 'react-router-dom';
const listProduct = [
    {
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
        productID: 1,
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
function Brand_WC_Item({
    brand
}) {
    const navigate = useNavigate();
    const onclick = () => {
        navigate('/brand_collection/' + brand.brand.brandId)
    }
    return (
        <div className='my-7 mx-2 bg-white ssm:p-3 rounded-lg select-none border'>
            <div className='ssm:flex items-center hover:shadow cursor-pointer py-2' onClick={() => onclick()}>
                <div className='flex m-5 ms-8 flex-[2] justify-center ssm:justify-normal'>
                    <div className='me-5'>
                        <img src={brand.brand.image[0].url} className='w-[80px] h-[80px] rounded-full' />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex-1 font-bold mb-3 text-[20px] mt-2'>
                            {brand.brand.name}
                        </div>
                        <div className='flex-1'>
                            {brand.brand.nation}
                        </div>
                    </div>
                </div>
                <div className='ssm:flex flex-[4] hidden'>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>5 năm</div>
                        <div>Thành lập</div>
                    </div>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>{brand.item.length} </div>
                        <div>Sản phẩm</div>
                    </div>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>Có mặt tại hơn 100 </div>
                        <div>Quốc gia</div>
                    </div>
                </div>

            </div>

            <div>
                <ProductCarousel title={'Sản phẩm của thương hiệu'} listProduct={brand.item} path={'/collection/' + 'brand' + '&' + brand.brand._id} />
            </div>
        </div>
    );
}

export default Brand_WC_Item;