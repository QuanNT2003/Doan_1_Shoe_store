import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png'
import Rating from '@mui/material/Rating';
function OrderDetail() {
    return (
        <div className='lg:m-5 m-2 mb-10 p-3'>
            <div className='font-bold text-[18px]'>Chi tiết đơn hàng</div>
            <div className='p-3 rounded-lg bg-white'>
                <div className='font-semibold'>Đơn hàng đã giao hoàn tất</div>
                <div className='flex items-center mt-4'>
                    <FontAwesomeIcon icon={faLocationDot} className='me-3' />
                    <div className='font-bold'>
                        Ngô Trung Quân
                    </div>
                    <div className='ms-2'>
                        (03656245644)
                    </div>
                </div>
                <div className='mt-2'>
                    <div>email : 123@gmail.com</div>
                    <div>Địa chỉ: Ký túc xá khu A DH quốc gia TP Hồ Chí Minh, Đường Tạ Quang Bửu</div>
                </div>
                <div>
                    <div className=' mt-3 border rounded-md p-1'>
                        <div className='flex mb-2'>
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
                        <div className='flex justify-center mt-3'>
                            <button className='border p-4 w-[50%] border-solid border-slate-400 rounded-md '>Viết đánh giá</button>
                        </div>

                    </div>
                    <div className=' mt-3 border rounded-md p-1'>
                        <div className='flex mb-2'>
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
                        <div className='flex justify-center mt-3'>
                            <button className='border p-4 w-[50%] border-solid border-slate-400 rounded-md '>Viết đánh giá</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='lg:flex mt-5'>
                <div className='lg:flex-[2] lg:me-3 mb-4 lg:mb-0 rounded-lg bg-white p-3'>
                    <div className='font-bold mb-4'>Đánh giá đơn hàng</div>
                    <Rating name="size-large" defaultValue={2} size="large" className='mb-6' />
                    <div className='font-bold mb-4'>Tiến độ đơn hàng</div>
                    <div className='flex min-h-[90px] items-center'>
                        <div className='w-[30%]'>thứ 4 - 04/05/2024 10:53 AM</div>
                        <FontAwesomeIcon icon={faCircleCheck} className='me-3 w-[10%] text-slate-400' />

                        <div className='w-[60%]'>
                            <div className='mb-2 font-semibold'>Đã giao</div>
                            Kiện hàng đã được giao bởi người giao
                        </div>
                    </div>
                    <div className='flex min-h-[90px] items-center'>
                        <div className='w-[30%]'>thứ 4 - 04/05/2024 10:53 AM</div>
                        <FontAwesomeIcon icon={faCircleCheck} className='me-3 w-[10%] text-slate-400' />
                        <div className='w-[60%]'>
                            <div className='mb-2 font-semibold'>Đã giao</div>
                            Kiện hàng đã được giao bởi người giao
                        </div>
                    </div>
                    <div className='flex min-h-[90px] items-center'>
                        <div className='w-[30%]'>thứ 4 - 04/05/2024 10:53 AM</div>
                        <FontAwesomeIcon icon={faCircleCheck} className='me-3 w-[10%] text-slate-400' />
                        <div className='w-[60%]'>
                            <div className='mb-2 font-semibold'>Đã giao</div>
                            Kiện hàng đã được giao bởi người giao
                        </div>
                    </div>
                </div>
                <div className='lg:flex-1 rounded-lg bg-white p-3'>
                    <div className='font-bold mb-4'>Tổng quan đơn hàng</div>
                    <div className='flex mb-2'>
                        <div className='w-[50%]'>Tổng phí</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>1.000.000đ</div>
                    </div>
                    <div className='flex mb-2'>
                        <div className='w-[50%]'>Vận chuyển</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>60.000đ</div>
                    </div>
                    <div className='flex mb-2'>
                        <div className='w-[50%]'>Phiếu giảm giá đơn hàng</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>- 300.000đ</div>
                    </div>
                    <div className='flex mb-2'>
                        <div className='w-[50%]'>Phiếu giảm phí vận chuyển</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>- 50.000đ</div>
                    </div>
                    <div className='flex mb-2'>
                        <div className='w-[50%]'>Phiếu giảm phí than toán</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>- 0đ</div>
                    </div>
                    <div className='flex mb-5 font-semibold'>
                        <div className='w-[50%]'>Tổng</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>700.000đ</div>
                    </div>
                    <div className='flex mb-2 font-semibold'>
                        <div className='w-[50%]'>Hình thức thanh toán</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>Chuyển khoản</div>
                    </div>
                    <div className='flex mb-2 font-semibold'>
                        <div className='w-[50%]'>Trạng thái</div>
                        <div className='w-[10%]'>:</div>
                        <div className='w-[30%]'>Đã thanh toán</div>
                    </div>
                    <div className='mb-2 '>
                        <div >QR Thanh toán :</div>
                        <div className='flex justify-center'>
                            <img src={logo} className='lg:w-[60%] ssm:w-[40%] w-[60%]' />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;