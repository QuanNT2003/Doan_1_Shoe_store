import React from 'react';
import example from '~/assets/example.jpg'
import ProductList from '~/components/ProductList';

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
const optionsSL = [
    { label: '0 - 30', value: '0-30' },
    { label: '30 - 70', value: '30-70' },
    { label: '70 - 100', value: '70-100' },
    { label: '100 - Trở lên', value: '100-500' },
];
function BrandDetailPage() {
    return (
        <div >
            <div className='bg-white m-4 mb-10 rounded-lg pt-3'>
                <div className='flex m-5 ms-8 flex-[2] justify-center ssm:justify-normal'>
                    <div className='me-5'>
                        <img src={example} className='w-[80px] h-[80px] rounded-full' />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex-1 font-bold mb-3 text-[20px] mt-2'>
                            Nike
                        </div>
                        <div className='flex-1'>
                            Hoa kỳ
                        </div>
                    </div>
                </div>
                <hr className='mt-5' />
                <div className='md:flex justify-center items-center p-5'>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>5 năm</div>
                        <div>Thành lập</div>
                    </div>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>190 </div>
                        <div>Sản phẩm</div>
                    </div>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>hơn 590 </div>
                        <div>Đơn hàng đã giao</div>
                    </div>
                    <div className='mx-10 flex flex-col items-center py-2'>
                        <div className='font-bold text-[20px]'>Có mặt tại hơn 100 </div>
                        <div>Quốc gia</div>
                    </div>
                </div>
                <hr className='mt-5' />
                <div className='lg:grid lg:grid-cols-2 p-5'>
                    <div className='flex m-3'>
                        <div className='w-[150px] text-[16px] font-bold'>Số điện thoại</div>
                        <div className='w-[20px] text-[16px]'>:</div>
                        <div className='text-[16px]'>0345424535</div>
                    </div>
                    <div className='flex m-3'>
                        <div className='w-[150px] text-[16px] font-bold'>Email</div>
                        <div className='w-[20px] text-[16px]'>:</div>
                        <div className='text-[16px]'>123@gmail.com</div>
                    </div>
                    <div className='flex m-3'>
                        <div className='w-[150px] text-[16px] font-bold'>Website</div>
                        <div className='w-[20px] text-[16px]'>:</div>
                        <div className='text-[16px]'>123.com</div>
                    </div>

                </div>
                <div className='p-5 m-3 mt-0 pt-2'>
                    <div className='w-[150px] text-[16px] font-bold'>Giới thiệu :</div>
                    <div className='text-[16px]'>Nike là nhà cung cấp toàn cầu về giày, quần áo và dụng cụ thể thao số một thế giới. Được thành lập vào ngày 25 tháng 1 năm 1964 với tên Blue Ribbon Sports bởi Bill Bowerman và Phil Knight, sau đó chính thức có tên gọi là Nike vào ngày 30 tháng 5 năm 1971. Bên cạnh đó, Nike đã thiết lập một danh mục thương hiệu mạnh mẽ với một số công ty con bao gồm Cole Haan, Converse Inc., Hurley International LLC, NIKE Golf và Umbro Ltd.mHiện nay, Nike hoạt động tại hơn 160 quốc gia trên toàn cầuvới hơn 30.000 nhân viên của Nike trên khắp sáu châu lục, mỗi người trong số họ đóng góp sức lực của mình để hoàn thành sứ mệnh của nhãn hiệu: mang lại cảm hứng và sự đổi mới cho mọi vận động viên trên thế giới.</div>
                </div>
            </div>
            <div className='bg-white m-4 mb-10 rounded-lg p-5'>
                <div className='font-bold mb-3 text-[17px]'>
                    Sản phẩm của doanh nghiệp
                </div>
                <hr className='mt-5' />
                <ProductList list={listProduct} />

            </div >


        </div >

    );
}

export default BrandDetailPage;