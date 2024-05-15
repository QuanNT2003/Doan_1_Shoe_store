import React from 'react';
import { useEffect, useState, useContext, useCallback } from 'react';
import { data } from './data';
import ListBillProduct from '~/components/ListBillProduct';
import { useNavigate, useParams } from 'react-router-dom';
import ModalComp from '~/components/ModalComp';
import Input from '~/components/Input';
import ListExchangeReturn from '~/components/ListExchangeReturn';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function InfoExchangeReturn() {
    const status = 'receiving'
    const navigate = useNavigate();

    // Hủy đơn
    const [titleModal, setTitleModal] = useState('');
    const [openModal1, setOpenModal1] = useState(false);
    const [reason, setReason] = useState('');


    const handleCloseModal1 = () => {
        setOpenModal1(false);
        setReason('')
        setErrorType('')
    };


    // Cập nhật tình trạng đơn hàng
    const [openModal2, setOpenModal2] = useState(false);
    const [location, setLocation] = useState('');
    const handleCloseModal2 = () => {
        setOpenModal2(false);
        setLocation('')
        setErrorType('')
    };

    // Submit Modal
    const [errorType, setErrorType] = useState('');
    const handleValidation = () => {
        if (reason === '' || location === '') setErrorType('Không được bỏ trống');
    }

    return (
        <div>
            <div className='my-6 mx-auto h-10 w-[90%] flex items-center'>
                <div className='me-5 font-bold text-[18px]'>
                    0rd00001
                </div>
                <div
                    className={status === 'receiving' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#fff7e7] text-[#e4a482] '
                        : status === 'delivering' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#fff7e7] text-[#e4a482]'
                            : status === 'delivered' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#ecfdf3] text-[#027948]'
                                : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#fef3f2] text-[#b32318]'}
                    data-tag="allowRowEvents"
                >
                    <div className='font-medium text-center' data-tag="allowRowEvents">
                        {status === 'receiving'
                            ? 'Đang tiếp nhận'
                            : status === 'delivering'
                                ? 'Đang giao'
                                : status === 'delivered' ? 'Đã giao' : 'Đã hủy đơn'}
                    </div>
                </div>
            </div>
            <div className='frame'>
                Thông tin khách hàng
                <hr />
                <div className='mt-5 text-blue-400'>
                    Ngô Trung Quân
                </div>
                <div className='mt-4 text-[18px]'>
                    Liên hệ
                    <div className='lg:grid lg:grid-cols-2 mt-4 gap-y-5'>
                        <div className='flex mb-3 me-3 bg-blue-50 p-2 rounded border-[1px] border-solid'>
                            <div className='w-[150px] text-[15px]'>Số điện thoại</div>
                            <div className='text-[15px]'>:</div>
                        </div>
                        <div className='flex mb-3 me-3 bg-blue-50 p-2 rounded border-[1px] border-solid'>
                            <div className='w-[150px] text-[15px]'>Email</div>
                            <div className='text-[15px]'>:</div>
                        </div>

                    </div>
                    <div className='flex mt-4 mb-3 me-3 bg-blue-50 p-2 rounded border-[1px] border-solid'>
                        <div className='w-[150px] text-[15px]'>Địa chỉ liên hệ</div>
                        <div className='text-[15px]'>:</div>
                    </div>
                    <div className=' mt-6 mb-3 me-3'>
                        <div className='w-[150px] text-[15px]'>Ghi chú : </div>
                        <div className='text-[15px]'></div>
                    </div>
                </div>
            </div>
            <div className='frame'>
                Thông tin sản phẩm
                <hr />


                <ListExchangeReturn item={data.itemOld} itemNew={data.itemNew} />

                <div className='me-[5%] mt-[20px]'>
                    <div className='flex sm:justify-end mb-4'>
                        <div className='min-w-[250px] text-[14px]'>Voucher giảm giá sản phẩm  </div>
                        <div className='text-[14px]'> {addCommas(1000000)} VND</div>
                    </div>
                    <div className='flex sm:justify-end mb-4'>
                        <div className='min-w-[250px] text-[14px] font-bold'>Phí hoàn trả  </div>
                        <div className='text-[14px]'> {addCommas(1000000)} VND</div>
                    </div>

                </div>
            </div>
            <div className='frame md:flex md:justify-end grid grid-cols-2 gap-y-3'>
                <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate(-1)}>
                    Quay lại
                </button>
                {
                    status === 'cancelled' ? <div></div> :
                        <button className='bg-red-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#f97777fd] cursor-pointer' onClick={() => { setOpenModal1(true); setTitleModal('Xóa đơn hàng') }}>
                            Hủy đơn
                        </button>
                }
                {
                    status === 'delivering' ? <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => { setOpenModal2(true); setTitleModal('Cập nhật hiện trạng đơn hàng') }}>
                        Cập nhật tình trạng đơn
                    </button> : <div> </div>
                }
                {
                    status === 'receiving' ?
                        <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer'>
                            Tiếp nhận đơn đổi/trả
                        </button>
                        : status === 'delivering' ?
                            <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer'>
                                Tiến hành đổi trả
                            </button>
                            : <div> </div>

                }

            </div>
            <ModalComp
                open={openModal1}
                handleClose={handleCloseModal1}
                title={titleModal}
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal1()}>
                            Quay lại
                        </button>
                        <button className='bg-red-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#f97777fd] cursor-pointer' onClick={() => handleValidation()}>
                            Xác nhận hủy đơn
                        </button>

                    </div>
                }
            >
                <Input
                    title={'Lý do hủy đơn'}
                    value={reason}
                    onChange={(value) => setReason(value)}
                    error={errorType}
                    required
                />
            </ModalComp>
            <ModalComp
                open={openModal2}
                handleClose={handleCloseModal2}
                title={titleModal}
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal2()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleValidation()}>
                            Cập nhật hiện trạng
                        </button>

                    </div>
                }
            >
                <Input
                    title={'Hiện trạng đơn hàng'}
                    value={location}
                    onChange={(value) => setLocation(value)}
                    error={errorType}
                    required
                />
            </ModalComp>
        </div>
    );
}

export default InfoExchangeReturn;