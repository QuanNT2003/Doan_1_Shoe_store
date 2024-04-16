import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import example from '~/assets/example.jpg'
function Infocustomer() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='my-6 mx-auto min-h-20 lg:flex lg:w-[90%]'>
                <div className='min-w-[300px] min-h-[200px] bg-white mt-5 p-5 mx-auto my-6 me-[5%] w-[90%] lg:w-[450px] rounded-lg'>
                    Ảnh đại diện
                    <hr />
                    <div className='flex justify-center items-center mt-9'>
                        <img src={example} className='w-[250px] h-[250px] rounded-full' />
                    </div>
                </div>
                <div className='frame'>
                    Thông tin chung
                    <hr />
                    <div className='xl:grid xl:grid-cols-2 mt-8 gap-y-7'>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Tên khách hàng</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Năm sinh</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Số điện thoại</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Email</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[150px] text-[15px]'>Địa chỉ</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='frame'>
                Danh sách đơn hàng
                <hr />
            </div>
            <div className='frame text-end'>
                <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate(-1)}>
                    Quay lại
                </button>
                <button className='bg-red-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#f97777fd] cursor-pointer'>
                    Cấm tài khoản
                </button>
            </div>
        </div>
    );
}

export default Infocustomer;