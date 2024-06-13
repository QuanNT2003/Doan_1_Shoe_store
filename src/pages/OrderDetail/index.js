import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import ModalLoading from '~/components/ModalLoading';
import ModalComp from '~/components/ModalComp';
import Exchange_Return from '~/components/Exchange_Return';
import * as OrderServices from '~/apiServices/orderServices'
import * as OrderProgressServices from '~/apiServices/orderProgressServices'
import { ToastContext } from '~/components/ToastContext';
import Comment from '~/components/Comment';
import { format } from 'date-fns';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalPayMent from '~/components/PayPalPayment';
import VNPayPayment from '~/components/VNPayPayment';
import moment from 'moment';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const initialOptions = {
    "clientId": "ASHs_lxigQTAUBuJyKxaYO58uuXFh7_eK6o6e4za7WveNu1-R4zmHQC1kpryHHovvK2sjuWaIIt-o_6U",
    currency: "USD",
    intent: "capture",
    // "data-sdk-integration-source": "integrationbuilder_sc",
};
function OrderDetail() {
    const navigate = useNavigate();
    const order = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [progress, setProgress] = useState([])
    const [day, setDay] = useState(new Date());

    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);
    const now = moment()
    const handleCloseModal = () => {
        setOpenModal(false)
        setItem('')
        setIndex()
    };

    //Modal return 
    const [openModalReturn, setOpenModalReturn] = useState(false);

    const handleCloseModalReturn = () => {
        setOpenModalReturn(false)

    };

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
            const orderProgress = await OrderProgressServices.GetOrderProgressForOrder(order.id)
                .catch((err) => {
                    console.log(err);
                });

            if (orderProgress) {
                console.log(orderProgress);
                setProgress(orderProgress.data);
            }
        }

        fetchApi();
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    const [item, setItem] = useState('')
    const [index, setIndex] = useState()
    const handleOpenComment = (item, index) => {
        setOpenModal(true)
        setItem(item)
        setIndex(index)
    }

    const handleOpenReturn = (item, index) => {
        setOpenModalReturn(true)
        setItem(item)
        setIndex(index)
    }
    const update = () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;


            const result = await OrderServices.UpdateOrder(obj.orderId, obj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                setDay(new Date());
            }

        }

        fetchApi();

    }

    const cancel = () => {
        setLoading(true);
        const fetchApi = async () => {
            const newObj = {
                ...obj,
                status: 'cancelled'
            }


            const result = await OrderServices.UpdateOrder(obj.orderId, newObj)
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false);
                setDay(new Date());
                toastContext.notify('success', 'Đã hủy đơn thành công');
            }
        }

        fetchApi();
    }
    return (
        <div>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>) : (
                    <div className='lg:m-5 m-2 mb-10 p-3'>
                        <div className='font-bold text-[18px]'>Chi tiết đơn hàng</div>
                        <div className='p-3 rounded-lg bg-white'>
                            <div className='flex items-center text-[17px] font-medium'> Đơn hàng {
                                obj.status === 'receiving' ? 'đang chờ tiếp nhận'
                                    : obj.status === 'received' ? 'đã tiếp nhân'
                                        : obj.status === 'delivering' ? 'đang giao'
                                            : obj.status === 'delivered' ? 'đã giao'
                                                : 'đã hủy'
                            }</div>
                            <div className='flex items-center mt-4'>
                                <FontAwesomeIcon icon={faLocationDot} className='me-3' />
                                <div className='font-bold'>
                                    {obj.user.name}
                                </div>
                                <div className='ms-2'>
                                    ({obj.phone})
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div>email : {obj.email}</div>
                                <div>Địa chỉ: {obj.address}</div>
                            </div>
                            <div>
                                {
                                    obj.item.map((item, index) => (
                                        <div className=' mt-3 border rounded-md p-1' key={index}>
                                            <div className='flex mb-2'>
                                                <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                                                    <img src={item.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                                                </div>
                                                <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                                    <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                                        {item.product.name}
                                                    </div>
                                                    <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                                        {item.version.color.name}, Size : {item.version.size.name}
                                                    </div>
                                                    <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                                        {addCommas(item.product.price * (100 - item.product.discount) / 100)} đ  x {item.quantity}
                                                    </div>

                                                </div>
                                                <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                                    Đơn giá : {addCommas(item.product.price * (100 - item.product.discount) / 100)} đ
                                                </div>
                                                <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                                    SL : {item.quantity} sản phẩm
                                                </div>
                                            </div>
                                            <div className='flex justify-center my-3'>
                                                {
                                                    item.comment === false && obj.status === "delivered" ? <button className='border p-4 ssm:w-[30%] w-[45%] border-solid border-slate-400 rounded-md mx-2 hover:bg-slate-100' onClick={() => handleOpenComment(item, index)}>Viết đánh giá</button> : <div></div>
                                                }
                                                {
                                                    item.exchange_return === false && obj.status === "delivered" && now.diff(obj.updatedAt, 'days') < 7 ? <button className='border p-4 ssm:w-[30%] w-[45%] border-solid border-slate-400 rounded-md mx-2 hover:bg-slate-100 ' onClick={() => handleOpenReturn(item, index)}>Đổi /Trả hàng</button> : <div></div>
                                                }

                                            </div>

                                        </div>
                                    ))
                                }

                                <div className='flex justify-center my-3'>
                                    {
                                        obj.status === "receiving" ? <button className='border p-4 ssm:w-[30%] w-[45%] border-solid border-slate-400 rounded-md mx-2 hover:bg-slate-100' onClick={() => cancel()}>Hủy đơn</button> : <div></div>
                                    }
                                </div>

                            </div>
                        </div>
                        <div className='lg:flex mt-5'>
                            <div className='lg:flex-[2] lg:me-3 mb-4 lg:mb-0 rounded-lg bg-white p-3'>
                                <div className='font-bold mb-4'>Tiến độ đơn hàng</div>
                                {
                                    progress.map((item, index) => (
                                        <div className='flex min-h-[90px] items-center' key={index}>
                                            <div className='w-[30%]'>{format(new Date(item.createdAt), 'dd MMM yyyy - HH:mm')}</div>
                                            <FontAwesomeIcon icon={faCircleCheck} className='me-3 w-[10%] text-slate-400' />

                                            <div className='w-[60%]'>
                                                <div className='mb-2 font-semibold'>{item.title}</div>
                                                {item.note}
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                            <div className='lg:flex-1 rounded-lg bg-white p-3'>
                                <div className='font-bold mb-4'>Tổng quan đơn hàng</div>
                                <div className='flex mb-2'>
                                    <div className='w-[50%]'>Tổng phí</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>{addCommas(obj.payment.subTotal)}đ</div>
                                </div>
                                <div className='flex mb-2'>
                                    <div className='w-[50%]'>Vận chuyển</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>{addCommas(obj.ship.shipCost)}đ</div>
                                </div>
                                <div className='flex mb-2'>
                                    <div className='w-[50%]'>Phiếu giảm giá đơn hàng</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>- {addCommas(obj.saleOff.totalSaleOff)}đ</div>
                                </div>
                                <div className='flex mb-2'>
                                    <div className='w-[50%]'>Phiếu giảm phí vận chuyển</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>- {addCommas(obj.ship.shipCost - obj.ship.shipTotal)}đ</div>
                                </div>
                                <div className='flex mb-2'>
                                    <div className='w-[50%]'>Phiếu giảm phí than toán</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>- {addCommas(obj.payment.paymentTotal)}đ</div>
                                </div>
                                <div className='flex mb-5 font-semibold'>
                                    <div className='w-[50%]'>Tổng</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>{addCommas(obj.payment.total)}đ</div>
                                </div>
                                <div className='flex mb-2 font-semibold'>
                                    <div className='w-[50%]'>Hình thức thanh toán</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>{
                                        obj.payment.paymentType === 'cod' ? 'Thanh toán khi nhận hàng'
                                            : obj.payment.paymentType === 'vnpay' ? 'Chuyển khoản VNPay'
                                                : 'Chuyển khoản Paypal'
                                    }</div>
                                </div>
                                <div className='flex mb-2 font-semibold'>
                                    <div className='w-[50%]'>Trạng thái</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>{obj.payment.remain === 0 ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                </div>
                                <div className='mt-5'>
                                    {obj.payment.remain !== 0 && obj.payment.paymentType === 'paypal' ? (
                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalPayMent data={{
                                                obj: obj,
                                                cost: parseFloat(obj.payment.total * 0.000039).toFixed(2)
                                            }} />
                                            {/* <PayPalPayMent /> */}
                                        </PayPalScriptProvider>
                                    ) : (<div> </div>)}
                                    {obj.payment.remain !== 0 && obj.payment.paymentType === 'vnpay' ? (
                                        <VNPayPayment obj={{
                                            orderId: obj.orderId,
                                            amount: obj.payment.total

                                        }} />
                                    ) : (<div> </div>)}
                                </div>

                            </div>
                            <ModalComp
                                open={openModal}
                                handleClose={handleCloseModal}
                                title="Đánh giá sản phẩm"
                            >
                                <Comment item={item} handleCloseModal={handleCloseModal} update={update} />
                            </ModalComp>

                            <ModalComp
                                open={openModalReturn}
                                handleClose={handleCloseModalReturn}
                                title="Hoàn đổi hàng"
                            >
                                <Exchange_Return item={item} handleCloseModal={handleCloseModalReturn} update={update} orderId={obj.orderId} />

                            </ModalComp>
                        </div>
                    </div>

                )}
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>

    );
}

export default OrderDetail;