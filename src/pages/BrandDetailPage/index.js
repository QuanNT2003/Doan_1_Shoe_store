import React, { useState } from 'react';
import example from '~/assets/example.jpg'
import ProductList from '~/components/ProductList';
import MultiSelectComp from '~/components/MultiSelectComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter
} from '@fortawesome/free-solid-svg-icons';
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
const optionsGia = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const optionsLSP = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const optionsPL = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const optionsDG = [
    { label: '1 sao', value: '1' },
    { label: '2 sao', value: '2' },
    { label: '3 sao', value: '3' },
    { label: '4 sao', value: '4' },
    { label: '5 sao', value: '5' },
];
const sortlist = [
    {
        name: 'Đánh giá từ thấp tới cao',
    },
    {
        name: 'Đánh giá từ cao tới thấp',
    },
    {
        name: 'Giá từ cao tới thấp',
    },
    {
        name: 'Giá từ thấp tới cao',
    },
    {
        name: 'Lượt đánh giá',
    },
]
function BrandDetailPage() {

    const [selectedGia, setSelectedGia] = useState([]);
    const [selectedLSP, setSelectedLSP] = useState([]);
    const [selectedPL, setSelectedPL] = useState([]);
    const [selectedDG, setSelectedDG] = useState([]);
    const [sort, setSort] = useState('Không có')

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
                <ProductList
                    list={listProduct}
                    filter={<div className='flex flex-wrap mt-3'>
                        <div className='w-[250px] me-3'>
                            <MultiSelectComp
                                options={optionsGia}
                                placeholder={'Giá cả'}
                                selected={selectedGia}
                                setSelected={setSelectedGia}
                                hasSelectAll={true}
                                notShowTitle={true}
                            />
                        </div>
                        <div className='w-[250px] me-3'>
                            <MultiSelectComp
                                options={optionsLSP}
                                placeholder={'Loại sản phẩm'}
                                selected={selectedLSP}
                                setSelected={setSelectedLSP}
                                hasSelectAll={true}
                                notShowTitle={true}
                            />
                        </div>
                        <div className='w-[250px] me-3'>
                            <MultiSelectComp
                                options={optionsPL}
                                placeholder={'Phân loại'}
                                selected={selectedPL}
                                setSelected={setSelectedPL}
                                hasSelectAll={true}
                                notShowTitle={true}
                            />
                        </div>
                        <div className='w-[250px] me-3'>
                            <MultiSelectComp
                                options={optionsDG}
                                placeholder={'Đánh giá'}
                                selected={selectedDG}
                                setSelected={setSelectedDG}
                                hasSelectAll={true}
                                notShowTitle={true}
                            />
                        </div>
                    </div>}
                    sort={
                        <div className='ms-2 cursor-pointer flex items-center group relative'>
                            <div className='me-4 flex items-center justify-center'>
                                <div className='font-bold me-3'> Sắp xếp</div>

                                <FontAwesomeIcon icon={faFilter} className='h-[20px] w-[20px] me-4 text-gray-500' />

                                <div>:</div>
                            </div>
                            <div>{sort}</div>
                            <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                                <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                                    {sortlist.map((item, index) => (
                                        <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => setSort(item.name)}>{item.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    }
                />

            </div >


        </div >

    );
}

export default BrandDetailPage;