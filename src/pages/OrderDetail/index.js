import React from 'react';
import { useEffect, useState, useContext, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faCircleCheck,
    faPlus,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ModalLoading from '~/components/ModalLoading';
import ModalComp from '~/components/ModalComp';
import Input from '~/components/Input';
import Exchange_Return from '~/components/Exchange_Return';
import * as OrderServices from '~/apiServices/orderServices'
import { ToastContext } from '~/components/ToastContext';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function OrderDetail() {
    const navigate = useNavigate();
    const order = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date());

    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
        setFiles([])
    };

    const [desc, setDesc] = useState('');
    const onChangeDesc = (value) => {
        setDesc(value);
    };

    // URL IMAGE
    const [images, setImages] = useState([]);

    // IMAGES
    const [files, setFiles] = useState([]);

    const handleAddImages = (e) => {
        if (e.target.files.length + files.length < 4) {
            const arr = Array.from(e.target.files).map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend = () => {
                    files.push(reader.result)
                    setDay(new Date())
                }
            });



        }


    };
    const handleRemoveImage = (index) => {
        files.splice(index, 1)
        setDay(new Date())
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
                            <div className='font-semibold'>Đơn hàng đã giao hoàn tất</div>
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
                                                    item.comment === false && obj.status === "delivered" ? <button className='border p-4 ssm:w-[30%] w-[45%] border-solid border-slate-400 rounded-md mx-2 hover:bg-slate-100' onClick={() => setOpenModal(true)}>Viết đánh giá</button> : <div></div>
                                                }
                                                {
                                                    item.exchange_return === false && obj.status === "delivered" ? <button className='border p-4 ssm:w-[30%] w-[45%] border-solid border-slate-400 rounded-md mx-2 hover:bg-slate-100 ' onClick={() => setOpenModalReturn(true)}>Đổi /Trả hàng</button> : <div></div>
                                                }

                                            </div>

                                        </div>
                                    ))
                                }


                            </div>
                        </div>
                        <div className='lg:flex mt-5'>
                            <div className='lg:flex-[2] lg:me-3 mb-4 lg:mb-0 rounded-lg bg-white p-3'>
                                <div className='font-bold mb-4'>Đánh giá đơn hàng</div>
                                <Rating name="size-large" defaultValue={obj.star} size="large" className='mb-6' />
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
                                    <div className='w-[30%]'>{obj.payment.ramain === 0 ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                </div>
                                <div className='mb-2 '>
                                    <div >QR Thanh toán :</div>
                                    <div className='flex justify-center'>
                                        <img src={logo} className='lg:w-[60%] ssm:w-[40%] w-[60%]' />
                                    </div>

                                </div>

                            </div>
                            <ModalComp
                                open={openModal}
                                handleClose={handleCloseModal}
                                title="Đánh giá sản phẩm"
                                actionComponent={
                                    <div>
                                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                                            Quay lại
                                        </button>
                                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' >
                                            Thêm
                                        </button>
                                    </div>
                                }
                            >

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

                                <div className='mt-3'>
                                    <div className='font-bold mb-4'>Đánh giá sản phẩm</div>
                                    <Rating name="size-large" defaultValue={2} size="medium" className='mb-6' />
                                </div>
                                <Input
                                    title={'Viết đánh giá'}
                                    value={desc}
                                    onChange={onChangeDesc}
                                    textarea
                                    rows={5}
                                />
                                <div className='mt-2 p-1'>
                                    <div>
                                        Thêm hình ảnh
                                    </div>
                                    <div className='flex'>
                                        <input
                                            id="addImg"
                                            type="file"
                                            className='hidden'
                                            accept="image/png,image/gif,image/jpeg"
                                            multiple
                                            onChange={handleAddImages}
                                        />
                                        <label
                                            htmlFor="addImg"
                                            className='w-[90px] h-[90px] border-[1px] border-dashed border-[#d3d5d7] rounded-[3px] flex justify-center items-center m-[5px] hover:cursor-pointer'
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </label>
                                        {files.map((file, index) => (
                                            <div key={index} className='group w-[90px] h-[90px] rounded-[3px] m-[5px] relative select-none'>
                                                <div
                                                    className='absolute top-0 right-0 bg-white p-[5px] rounded-[999px] w-[20px] h-[20px] hidden justify-center items-center mt-[2px] mr-[2px] mb-[2px] ml-[2px] hover:cursor-pointer group-hover:flex'
                                                    onClick={() =>
                                                        handleRemoveImage(index)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        className='text-red-600'
                                                        icon={faXmark}
                                                    />
                                                </div>
                                                <img
                                                    className='w-[inherit] h-[inherit] rounded-[3px]'
                                                    src={file}
                                                    alt=""
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </ModalComp>

                            <ModalComp
                                open={openModalReturn}
                                handleClose={handleCloseModalReturn}
                                title="Hoàn đổi hàng"
                            >
                                <Exchange_Return />

                            </ModalComp>
                        </div>
                    </div>
                )}
        </div>

    );
}

export default OrderDetail;