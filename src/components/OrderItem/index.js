import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
function OrderItem({

}) {
    const navigate = useNavigate();
    return (
        <div className='bg-white ssm:m-5 mb-4 p-3 rounded-lg select-none border cursor-pointer' onClick={() => navigate('/order_colection/detail/' + 123)}>
            <div className='flex items-center text-[17px] font-medium'> Đơn hàng đã được giao</div>
            <div className=' bg-slate-200 flex items-center p-3 my-3 rounded-md justify-between'>
                <div className='flex items-center me-4'>
                    <FontAwesomeIcon icon={faTruckFast} className='ssm:me-10 me-3 ssm:h-[40px] h-[25px]' />
                    <div>
                        <div className=' font-semibold ssm:text-[18px] text-[14px]'>May 4 đã giao</div>
                        <div className='ssm:text-[15px] text-[12px]'>Kiện hàng của bạn đã giao</div>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faAngleRight} className='ssm:me-10 h-[20px]' />
                </div>

            </div>
            <div className='flex mt-3 border rounded-md p-1'>
                <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                    <img src={logo} className='md:w-[120px] md:h-[120px] w-[80px]' />
                </div>
                <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                    <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                        Giày tây nam công sở da mềm đế khâu chắc chắn đóng hộp cẩn thận bao đổi trả nếu ko vừa hàng lỗi sản phẩm đóng hộp (MT04)
                    </div>
                    <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                        Xanh - Vàng, Size : 40
                    </div>
                    <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                        166.000 đ  x 3
                    </div>

                </div>
                <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                    Đơn giá : 166.000 đ
                </div>
                <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                    SL : 3 sản phẩm
                </div>

            </div>
            <div className='flex mt-3 border  rounded-md p-1'>
                <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                    <img src={logo} className='md:w-[120px] md:h-[120px] w-[80px]' />
                </div>
                <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                    <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                        Giày tây nam công sở da mềm đế khâu chắc chắn đóng hộp cẩn thận bao đổi trả nếu ko vừa hàng lỗi sản phẩm đóng hộp (MT04)
                    </div>
                    <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                        Xanh - Vàng, Size : 40
                    </div>
                    <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                        166.000 đ  x 3
                    </div>

                </div>
                <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                    Đơn giá : 166.000 đ
                </div>
                <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                    SL : 3 sản phẩm
                </div>

            </div>
            <div className='mt-3 flex justify-end me-3 font-semibold'>
                Tổng cộng 5 sản phẩm : 3000,000đ
            </div>
        </div>
    );
}

export default OrderItem;