import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faCartShopping,
    faMoneyBill
} from '@fortawesome/free-solid-svg-icons';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function InfoPromotion() {
    const navigate = useNavigate();
    const promotionId = useParams();
    return (
        <div className='container'>
            <div className='my-6 mx-auto min-h-20 lg:flex lg:w-[90%]'>
                <div className={"my-6 ms-[5%] me-[5%] lg:ms-0 text-wrap min-w-[300px] max-w-[350px] min-h-28 rounded-xl flex " + "bg-green-400"}>
                    <div className='w-[120px] border-r-2 border-white border-dashed flex items-center justify-center flex-col'>
                        <FontAwesomeIcon icon={faMoneyBill} className='w-[40px] h-[40px] mb-[20px]' />
                        <div className='text-[14px]'>Payment</div>
                    </div>
                    <div className='flex flex-col justify-center ps-3'>
                        <div className='text-[17px] font-bold'>200.000đ giảm giá</div>
                        <div className='text-[13px]'>Giảm phí vận chuyển</div>
                        <div className='text-[13px]'>Ngày hết hạn : 24/3/2024</div>

                    </div>
                </div>
                <div className='frame'>
                    Hiệu lực
                    <hr />
                    <div className='lg:grid lg:grid-cols-2 mt-8 gap-y-7 '>
                        <div className='flex mb-5 '>
                            <div className='w-[150px] sm:w-[200px] text-[14px]'>Từ ngày</div>
                            <div className='text-[14px]'>:</div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='w-[150px] sm:w-[200px] text-[14px]'>Đến ngày</div>
                            <div className='text-[14px]'>:</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='frame'>
                Thông tin chung
                <hr />
                <div className='lg:grid lg:grid-cols-2 mt-8 gap-y-7'>
                    <div className='flex mb-5'>
                        <div className='w-[150px] sm:w-[200px] text-[14px]'>Tên khuyến mãi</div>
                        <div className='text-[14px]'>:</div>
                    </div>
                    <div className='flex mb-5'>
                        <div className='w-[150px] sm:w-[200px] text-[14px]'>Mã khuyến mãi</div>
                        <div className='text-[14px]'>:</div>
                    </div>
                    <div className='flex mb-5'>
                        <div className='w-[150px] sm:w-[200px] text-[14px]'>Loại khuyến mãi</div>
                        <div className='text-[14px]'>:</div>
                    </div>
                    <div className='flex mb-5'>
                        <div className='w-[150px] sm:w-[200px] text-[14px]'>Trạng thái</div>
                        <div className='text-[14px]'>:</div>
                    </div>
                </div>
                <div className='mb-5 mt-8 '>
                    <div className='w-[150px] sm:w-[200px] text-[14px]'>Mô tả</div>
                    <div className='text-[14px] mt-3'>123</div>
                </div>
            </div>
            <div className='frame'>
                Điều kiện khuyến mãi
                <hr />
                <div className='lg:grid lg:grid-cols-2 mt-8 gap-y-7'>
                    <div className='flex mb-5'>
                        <div className='w-[200px] text-[14px]'>Áp dụng từ</div>
                        <div className='text-[14px]'>:</div>
                    </div>
                    <div className='flex mb-5'>
                        <div className='w-[200px] text-[14px]'>Giá trị</div>
                        <div className='text-[14px]'>:</div>
                    </div>
                </div>
            </div>
            <div className='frame grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row-reverse'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer'>
                    Kích hoạt
                </button>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer'>
                    Tạm ngưng
                </button>
                <button className='bg-white py-4 px-3 rounded-lg min-w-[130px] text-blue-500 hover:bg-[#f8f8f9] cursor-pointer border-blue-500 border-[1px] border-solid' onClick={() => navigate('/promotions/update/' + promotionId.id)}>
                    Sửa
                </button>
                <button className='bg-white py-4 px-3 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid'>
                    Hủy
                </button>
            </div>
        </div>
    );
}

export default InfoPromotion;