import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContext } from '~/components/ToastContext';
import * as ReturnServices from '~/apiServices/returnServices'
import * as OrderProgressServices from '~/apiServices/orderProgressServices'
import ModalLoading from '~/components/ModalLoading';
import { format } from 'date-fns';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function ReturnDetail() {
    const navigate = useNavigate();
    const order = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date());

    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);
    const [progress, setProgress] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await ReturnServices.GetDetailReturn(order.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
            }

            const orderProgress = await OrderProgressServices.getOrderProgressForReturn(order.id)
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
                                    ({obj.user.phone})
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div>email : {obj.user.email}</div>
                                <div>Địa chỉ: {obj.user.address}</div>
                            </div>
                            <div>
                                <div className='flex mt-3 border rounded-md p-1' >
                                    <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                                        <img src={obj.returnItem.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                                    </div>
                                    <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                        <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                            {obj.returnItem.product.name}
                                        </div>
                                        <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                            {obj.returnItem.version.color.name}, Size : {obj.returnItem.version.size.name}
                                        </div>
                                        <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                            {addCommas(obj.returnItem.product.price * (100 - obj.returnItem.product.discount) / 100)} đ  x {obj.returnItem.quantity}
                                        </div>

                                    </div>
                                    <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                        Đơn giá : {addCommas(obj.returnItem.product.price * (100 - obj.returnItem.product.discount) / 100)} đ
                                    </div>
                                    <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                        SL : {obj.returnItem.quantity} sản phẩm
                                    </div>

                                </div>
                                {
                                    obj.exchangeItem ? (<div className='mt-4 font-semibold'> Sản phẩm hoàn trà</div>) : (<div> </div>)
                                }
                                {
                                    obj.exchangeItem ? (<div className='flex mt-3 border rounded-md p-1' >
                                        <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                                            <img src={obj.exchangeItem.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                                        </div>
                                        <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                            <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                                {obj.exchangeItem.product.name}
                                            </div>
                                            <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                                {obj.exchangeItem.version.color.name}, Size : {obj.exchangeItem.version.size.name}
                                            </div>
                                            <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                                {addCommas(obj.exchangeItem.product.price * (100 - obj.exchangeItem.product.discount) / 100)} đ  x {obj.exchangeItem.quantity}
                                            </div>

                                        </div>
                                        <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                            Đơn giá : {addCommas(obj.exchangeItem.product.price * (100 - obj.exchangeItem.product.discount) / 100)} đ
                                        </div>
                                        <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                            SL : {obj.exchangeItem.quantity} sản phẩm
                                        </div>

                                    </div>) : (<div></div>)
                                }
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
                                <div className='flex mb-5 font-semibold'>

                                    <div className='w-[50%]'>Phí hoàn trả</div>
                                    <div className='w-[10%]'>:</div>
                                    <div className='w-[30%]'>{obj.exchangeItem ?
                                        addCommas(obj.returnItem.total - obj.exchangeItem.total)
                                        : addCommas(obj.returnItem.total)}đ</div>
                                </div>


                            </div>

                        </div>
                    </div>
                )}
        </div>
    );
}

export default ReturnDetail;