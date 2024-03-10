import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import example from '~/assets/example.jpg'
function InfoBrand() {
    const navigate = useNavigate();
    const brand = useParams();
    return (
        <div className='container'>
            <div className='my-6 mx-auto min-h-20 lg:flex lg:w-[90%]'>
                <div className='min-w-[300px] min-h-[200px] bg-white p-5 mx-auto my-6 me-[5%] w-[90%] lg:w-[450px] flex justify-center items-center rounded-lg'>
                    <img src={example} className='w-[250px] h-[250px] rounded-full' />
                </div>
                <div className='frame'>
                    Thông tin chung
                    <hr />
                    <div className='xl:grid xl:grid-cols-2 mt-8 gap-y-7'>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Tên thương hiệu</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Email</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Số điện thoại</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Quốc gia</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Website chính thức</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='frame'>
                Giới thiệu chung
                <hr />
                <div className='mt-6 text-[15px]'>
                    Nike là một trong những thương hiệu thời trang thể thao cao cấp lớn nhất thế giới hiện nay. Cùng với các thiết bị thể thao danh tiếng, địa vị của thương hiệu Nike trên thị trường thế giới khó có thể lung lay trong tương lai.

                    Nike là một tập đoàn đa quốc gia của Mỹ

                    Trên thực tế, Nike là một tập đoàn đa quốc gia của Mỹ. Thương hiệu này phát triển đa dạng trong nhiều lĩnh vực như: Trang thiết bị thể thao, quần áo và giày dép phục vụ các môn thể thao, dịch vụ tương tác liên quan đến thể thao. Đặc biệt, Nike luôn ứng dụng khoa học công nghệ cao vào các sản phẩm của hãng.
                </div>

            </div>
            <div className='frame text-end'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate('/brands/update/' + brand.id)}>
                    Sửa
                </button>
            </div>
        </div>
    );
}

export default InfoBrand;