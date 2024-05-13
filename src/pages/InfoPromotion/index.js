import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faCartShopping,
    faMoneyBill
} from '@fortawesome/free-solid-svg-icons';
import * as PromotionsServices from '~/apiServices/promotionServices';
import ModalLoading from '~/components/ModalLoading';
import format from 'date-fns/format'
import { ToastContext } from '~/components/ToastContext';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function InfoPromotion() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const promotionId = useParams();


    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await PromotionsServices.getPromotion(promotionId.id)
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

    const handleActive = () => {
        setLoading(true);

        const fetchApi = async () => {
            let isSuccess = true;

            const newObj = {
                ...obj,
                status: true,
            }

            const result = await PromotionsServices.UpdatePromotion(promotionId.id, newObj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã kích hoạt khuyến mãi');
                setUpdatePage(new Date());
            }
        }

        fetchApi();
    }

    const handleCancel = () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;

            const newObj = {
                ...obj,
                status: false,
            }

            const result = await PromotionsServices.UpdatePromotion(promotionId.id, newObj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã hủy khuyến mãi');
                setUpdatePage(new Date());
            }
        }

        fetchApi();
    }

    const handleDelete = () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;


            const result = await PromotionsServices.deletePromotion(promotionId.id)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã xóa khuyến mãi');
                setUpdatePage(new Date());
                navigate('/promotions')
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
                        <div className='my-6 mx-auto min-h-20 lg:flex lg:w-[90%]'>
                            {
                                obj.classify === 'ship' ?
                                    <div className={"my-6 ms-[5%] me-[5%] lg:ms-0 text-wrap min-w-[300px] max-w-[350px] min-h-28 rounded-xl flex " + "bg-green-400"}>
                                        <div className='w-[120px] border-r-2 border-white border-dashed flex items-center justify-center flex-col'>
                                            <FontAwesomeIcon icon={faTruckFast} className='w-[40px] h-[40px] mb-[20px]' />
                                            <div className='text-[15px]'>Shipment</div>
                                        </div>
                                        <div className='flex flex-col justify-center ps-3 pe-3'>
                                            <div className='text-[17px] font-bold'>{
                                                obj.typeDiscount === true ? obj.value + '%' : addCommas(obj.value) + 'đ'
                                            } giảm giá</div>
                                            <div className='text-[13px]'>Giảm phí vận chuyển</div>
                                            <div className='text-[13px]'>Ngày hết hạn : {format(new Date(obj.endDay), 'dd/MM/yyyy')}</div>

                                        </div>
                                    </div>
                                    :
                                    obj.classify === 'pay' ?
                                        <div className={"my-6 ms-[5%] me-[5%] lg:ms-0 text-wrap min-w-[300px] max-w-[350px] min-h-28 rounded-xl flex " + "bg-blue-400"}>
                                            <div className='w-[120px] border-r-2 border-white border-dashed flex items-center justify-center flex-col'>
                                                <FontAwesomeIcon icon={faMoneyBill} className='w-[40px] h-[40px] mb-[20px]' />
                                                <div className='text-[15px]'>Payment</div>
                                            </div>
                                            <div className='flex flex-col justify-center ps-3 pe-3'>
                                                <div className='text-[17px] font-bold'>{
                                                    obj.typeDiscount === true ? obj.value + '%' : addCommas(obj.value) + 'đ'
                                                } giảm giá</div>
                                                <div className='text-[13px]'>Giảm phí thanh toán</div>
                                                <div className='text-[13px]'>Ngày hết hạn : {format(new Date(obj.endDay), 'dd/MM/yyyy')}</div>

                                            </div>
                                        </div>
                                        :
                                        <div className={"my-6 ms-[5%] me-[5%] lg:ms-0 text-wrap min-w-[300px] max-w-[350px] min-h-28 rounded-xl flex " + "bg-red-400"}>
                                            <div className='w-[120px] border-r-2 border-white border-dashed flex items-center justify-center flex-col'>
                                                <FontAwesomeIcon icon={faCartShopping} className='w-[40px] h-[40px] mb-[20px]' />
                                                <div className='text-[15px]'>Sale of</div>
                                            </div>
                                            <div className='flex flex-col justify-center ps-3 pe-3'>
                                                <div className='text-[17px] font-bold'>{
                                                    obj.typeDiscount === true ? obj.value + '%' : addCommas(obj.value) + 'đ'
                                                } giảm giá</div>
                                                <div className='text-[13px]'>Giảm phí sản phẩm</div>
                                                <div className='text-[13px]'>Ngày hết hạn : {format(new Date(obj.endDay), 'dd/MM/yyyy')}</div>

                                            </div>
                                        </div>
                            }

                            <div className='frame'>
                                Hiệu lực
                                <hr />
                                <div className='lg:grid lg:grid-cols-2 mt-8 gap-y-7 '>
                                    <div className='flex mb-5 '>
                                        <div className='w-[150px] text-[14px]'>Từ ngày</div>
                                        <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                        <div className='text-[14px]'> {format(new Date(obj.startDay), 'dd/MM/yyyy')}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] text-[14px]'>Đến ngày</div>
                                        <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                        <div className='text-[14px]'> {format(new Date(obj.endDay), 'dd/MM/yyyy')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='frame'>
                            Thông tin chung
                            <hr />
                            <div className='lg:grid lg:grid-cols-2 mt-8 gap-y-7'>
                                <div className='flex mb-5'>
                                    <div className='w-[150px] sm:w-[200px] text-[15px]'>Tên khuyến mãi</div>
                                    <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                    <div className='text-[15px]'>{obj.name}</div>
                                </div>
                                <div className='flex mb-5'>
                                    <div className='w-[150px] sm:w-[200px] text-[15px]'>Mã khuyến mãi </div>
                                    <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                    <div className='text-[15px]'>{obj.discountId}</div>
                                </div>
                                <div className='flex mb-5'>
                                    <div className='w-[150px] sm:w-[200px] text-[15px]'>Loại khuyến mãi</div>
                                    <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                    <div className='text-[15px]'>
                                        {obj.classify === "pay" ? "Giảm phí thanh toán" :
                                            obj.classify === "ship" ? "Giảm phí vận chuyển" : "Giảm giá"
                                        }
                                    </div>
                                </div>
                                <div className='flex mb-5'>
                                    <div className='w-[150px] sm:w-[200px] text-[15px]'>Trạng thái</div>
                                    <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                    <div className='text-[15px]'>{obj.status === true ? "Đang chạy" : "Đã ngừng"}</div>
                                </div>
                            </div>
                            <div className='mb-5 mt-8 '>
                                <div className='w-[150px] sm:w-[200px] text-[15px]'>Mô tả</div>
                                <div className='text-[15px] mt-3'>{obj.note}</div>
                            </div>
                        </div>
                        <div className='frame'>
                            Điều kiện khuyến mãi
                            <hr />
                            <div className='lg:grid lg:grid-cols-2 mt-8 gap-y-7'>
                                <div className='flex mb-5'>
                                    <div className='w-[200px] text-[15px]'>Áp dụng từ </div>
                                    <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                    <div className='text-[15px]'> {addCommas(obj.apply)} đ</div>
                                </div>
                                <div className='flex mb-5'>
                                    <div className='w-[200px] text-[15px]'>Giá trị :</div>
                                    <div className='w-[10px] sm:w-[20px] text-[15px]'> :</div>
                                    <div className='text-[15px]'>{
                                        obj.typeDiscount === true ? obj.value + '%' : addCommas(obj.value) + 'đ'
                                    }</div>
                                </div>
                            </div>
                        </div>
                        <div className='frame flex flex-wrap justify-center ssm:grid ssm:grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row-reverse lg:justify-start'>
                            {
                                obj.status === true ? (
                                    <button className='bg-white py-4 px-3 me-3 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid' onClick={() => handleCancel()}>
                                        Hủy
                                    </button>
                                ) : (
                                    <button className='bg-white py-4 px-3 me-3 rounded-lg min-w-[130px] text-green-500 hover:bg-[#f8f8f9] cursor-pointer border-green-500 border-[1px] border-solid' onClick={() => handleActive()}>
                                        Kích hoạt
                                    </button>
                                )
                            }
                            <button className='bg-white py-4 px-3 me-3 rounded-lg min-w-[130px] text-blue-500 hover:bg-[#f8f8f9] cursor-pointer border-blue-500 border-[1px] border-solid' onClick={() => navigate('/promotions/update/' + promotionId.id)}>
                                Sửa
                            </button>
                            <button className='bg-white py-4 px-3 me-3 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid' onClick={() => handleDelete()}>
                                Xóa
                            </button>

                        </div>
                        <ModalLoading open={loading} title={'Đang tải'} />
                    </div>)
            }
        </div>


    );
}

export default InfoPromotion;