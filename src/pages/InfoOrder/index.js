import React from 'react';
import { useEffect, useState, useContext, useCallback } from 'react';
import ListBillProduct from '~/components/ListBillProduct';
import { useNavigate, useParams } from 'react-router-dom';
import ModalComp from '~/components/ModalComp';
import Input from '~/components/Input';
import * as OrderServices from '~/apiServices/orderServices'
import * as OrderProgressServices from '~/apiServices/orderProgressServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function InfoOrder() {
    const navigate = useNavigate();
    const order = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());
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
        if (location === '') setErrorType('Không được bỏ trống');
        else {
            const fetchApi = async () => {
                setLoading(true)
                let isSuccess = true;

                const newObj = {
                    title: "Vận chuyển",
                    note: location,
                    orderId: obj.orderId
                }

                const result = await OrderProgressServices.CreateOrderProgress(newObj)
                    .catch((err) => {
                        console.log(err);
                        isSuccess = false;
                        setLoading(false);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (isSuccess) {
                    setLoading(false);
                    toastContext.notify('success', 'Đã cập nhật đơn hàng');
                    setUpdatePage(new Date());
                    setOpenModal2(false)
                }
            }

            fetchApi()
            setLoading(false)
        }
    }

    const handleCancel = () => {
        if (reason === '') setErrorType('Không được bỏ trống');
        else {
            setLoading(true);
            const fetchApi = async () => {
                let isSuccess = true;

                const newObj = {
                    ...obj,
                    status: 'cancelled',
                    note: reason
                }

                const result = await OrderServices.UpdateOrder(order.id, newObj)
                    .catch((err) => {
                        console.log(err);
                        isSuccess = false;
                        setLoading(false);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (isSuccess) {
                    setLoading(false);
                    toastContext.notify('success', 'Đã cập nhật đơn hàng');
                    setUpdatePage(new Date());
                    setOpenModal1(false)
                }
            }

            fetchApi();
        }

    }
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await OrderServices.getOrder(order.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
            }
        }

        fetchApi();
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);

    const update = async (value) => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;

            const newObj = {
                ...obj,
                status: value
            }

            const result = await OrderServices.UpdateOrder(order.id, newObj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã cập nhật đơn hàng');
                setUpdatePage(new Date());
            }
        }

        fetchApi();
    }

    const submitPayment = async () => {
        let payment = obj.payment
        payment.remain = 0
        payment.paid = payment.total


        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;

            const newObj = {
                ...obj,
                payment: payment,
                paymentPending: false
            }

            const result = await OrderServices.UpdateOrder(order.id, newObj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã cập nhật đơn hàng');
                setUpdatePage(new Date());
            }
        }

        fetchApi();
    }
    return (
        <div>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>)
                    :
                    (<div>
                        <div className='my-6 mx-auto h-10 w-[90%] flex items-center'>
                            <div className='me-5 font-bold text-[18px]'>
                                {obj.orderId}
                            </div>
                            <div
                                className={obj.status === 'receiving' || obj.status === 'received' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#fff7e7] text-[#e4a482] '
                                    : obj.status === 'delivering' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#fff7e7] text-[#e4a482]'
                                        : obj.status === 'delivered' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#ecfdf3] text-[#027948]'
                                            : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#fef3f2] text-[#b32318]'}
                                data-tag="allowRowEvents"
                            >
                                <div className='font-medium text-center' data-tag="allowRowEvents">
                                    {obj.status === 'receiving'
                                        ? 'Đang tiếp nhận'
                                        : obj.status === 'received' ? 'Đã tiếp nhận'
                                            : obj.status === 'delivering'
                                                ? 'Đang giao'
                                                : obj.status === 'delivered' ? 'Đã giao' : 'Đã hủy đơn'}
                                </div>
                            </div>
                            <div className='mx-3'>
                                {
                                    obj.paymentPending && obj.paymentPending === true ? (
                                        <div className='flex justify-center items-center rounded-[20px] py-[5px] px-[10px] h-9 text-[15px] bg-[#ecfdf3] text-[#027948]'>
                                            Khách hàng đã thanh toán
                                        </div>) : (
                                        <div>

                                        </div>)
                                }
                            </div>
                        </div>

                        <div className='frame'>
                            Thông tin khách hàng
                            <hr />
                            <div className='mt-5 text-blue-400'>
                                {obj.user.name}
                            </div>
                            <div className='mt-4 text-[18px]'>
                                Liên hệ
                                <div className='lg:grid lg:grid-cols-2 mt-4 gap-y-5'>
                                    <div className='flex mb-3 me-3 bg-blue-50 p-2 rounded border-[1px] border-solid'>
                                        <div className='w-[150px] text-[15px]'>Số điện thoại</div>
                                        <div className='text-[15px]'>: {obj.phone}</div>
                                    </div>
                                    <div className='flex mb-3 me-3 bg-blue-50 p-2 rounded border-[1px] border-solid'>
                                        <div className='w-[150px] text-[15px]'>Email</div>
                                        <div className='text-[15px]'>: {obj.email}</div>
                                    </div>

                                </div>
                                <div className='flex mt-4 mb-3 me-3 bg-blue-50 p-2 rounded border-[1px] border-solid'>
                                    <div className='w-[150px] text-[15px]'>Địa chỉ liên hệ</div>
                                    <div className='text-[15px]'>: {obj.address}</div>
                                </div>
                                <div className=' mt-6 mb-3 me-3'>
                                    <div className='w-[150px] text-[15px]'>Ghi chú : </div>
                                    <div className='text-[15px]'>{obj.note}</div>
                                </div>
                            </div>
                        </div>
                        <div className='frame'>
                            Thông tin sản phẩm
                            <hr />
                            <ListBillProduct list={obj.item} />

                            <div className='me-[5%] mt-[20px]'>
                                <div className='flex sm:justify-end mb-4'>
                                    <div className='min-w-[200px] text-[14px]'>Tổng tiền  </div>
                                    <div className='text-[14px] min-w-[100px] text-end'> {addCommas(obj.payment.subTotal)} VND</div>
                                </div>
                                <div className='flex sm:justify-end mb-4'>
                                    <div className='min-w-[200px] text-[14px]'>Phí vận chuyển  </div>
                                    <div className='text-[14px] min-w-[100px] text-end' > {addCommas(obj.ship.shipCost)} VND</div>
                                </div>
                                <div className='flex sm:justify-end mb-4'>
                                    <div className='min-w-[200px] text-[14px]'>Voucher trợ giá sản phẩm </div>
                                    <div className='text-[14px] min-w-[100px] text-end'> {addCommas(obj.saleOff.totalSaleOff)} VND</div>
                                </div>
                                <div className='flex sm:justify-end mb-4'>
                                    <div className='min-w-[200px] text-[14px]'>Voucher vận chuyển  </div>
                                    <div className='text-[14px] min-w-[100px] text-end'> {addCommas(obj.ship.shipCost - obj.ship.shipTotal)} VND</div>
                                </div>
                                <div className='flex sm:justify-end mb-4'>
                                    <div className='min-w-[200px] text-[14px]'>Voucher thanh toán  </div>
                                    <div className='text-[14px] min-w-[100px] text-end'> {addCommas(obj.payment.paymentTotal)} VND</div>
                                </div>
                                <div className='flex sm:justify-end mb-4'>

                                </div>
                                <div className='flex sm:justify-end mb-4'>
                                    <div className='min-w-[200px] text-[14px] font-bold'>Khách phải trả  </div>
                                    <div className='text-[14px] min-w-[100px] text-end'> {addCommas(obj.payment.total)} VND</div>
                                </div>
                            </div>
                        </div>
                        <div className='frame md:flex md:justify-end grid grid-cols-2 gap-y-3'>
                            <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate(-1)}>
                                Quay lại
                            </button>
                            {
                                obj.status === 'cancelled' || obj.status === 'delivered' ? <div></div> :
                                    <button className='bg-red-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#f97777fd] cursor-pointer' onClick={() => { setOpenModal1(true); setTitleModal('Xóa đơn hàng') }}>
                                        Hủy đơn
                                    </button>
                            }
                            {
                                obj.status === 'delivering' ? <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => { setOpenModal2(true); setTitleModal('Cập nhật hiện trạng đơn hàng') }}>
                                    Cập nhật tình trạng đơn hàng
                                </button> : <div> </div>
                            }
                            {
                                obj.status === 'receiving' ?
                                    <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => update('received')}>
                                        Tiếp nhận đơn hàng
                                    </button>
                                    : obj.status === 'received' ?
                                        <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => update('delivering')}>
                                            Vận chuyển đơn hàng
                                        </button>
                                        : obj.status === 'delivering' ?
                                            <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => update('delivered')}>
                                                Tiến hành giao hàng
                                            </button>
                                            : <div> </div>

                            }
                            {
                                obj.payment.remain !== 0 ?
                                    <button className='bg-blue-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submitPayment()}>
                                        Xác nhận đã thanh toán
                                    </button> : (<div> </div>)
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
                                    <button className='bg-red-500 ms-5 py-4 px-2 rounded-lg min-w-[130px] text-white hover:bg-[#f97777fd] cursor-pointer' onClick={() => handleCancel()}>
                                        Xác nhận hủy đơn
                                    </button>

                                </div>
                            }
                        >
                            <Input
                                title={'Lý do hủy đơn'}
                                value={reason}
                                onChange={(value) => {
                                    setReason(value)
                                    setErrorType('')
                                }}
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
                                onChange={(value) => {
                                    setLocation(value)
                                    setErrorType('')
                                }}
                                error={errorType}
                                required
                            />
                        </ModalComp>
                    </div>)
            }
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>

    );
}

export default InfoOrder;