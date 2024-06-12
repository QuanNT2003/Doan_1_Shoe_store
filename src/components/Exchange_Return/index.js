import React, { useState, useContext, useEffect } from 'react';
import logo from '../../assets/images/logo.png'
import ModalComp from '~/components/ModalComp';
import SelectVersion from '../SelectVersion';
import ModalLoading from '~/components/ModalLoading';
import { ToastContext } from '~/components/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import * as VersionServices from '~/apiServices/versionServices'
import * as ReturnServices from '~/apiServices/returnServices'

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function Exchange_Return({ item, update, handleCloseModal, orderId }) {
    const [stype, setStype] = useState(false)

    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date());

    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModalVersion = () => {
        setOpenModal(false)

    };

    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [newProduct, setNewProduct] = useState('')
    const [colorList, setColorList] = useState([])
    const [sizeList, setSizeList] = useState([])

    const getVersion = async () => {
        const fetchApi = async () => {
            setLoading(true)
            let sizeL = []
            let colorL = []
            sizeL.push({ value: size._id })
            colorL.push({ value: color._id })
            const result = await VersionServices.getAllVersions({
                productId: item.product.productId,
                size: sizeL,
                color: colorL
            })
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result.data[0]);
                if (result.data[0]._id === item.version._id) {
                    toastContext.notify('warning', 'Phiên bản sản phẩm không đổi');
                }
                else {
                    setNewProduct({
                        product: item.product,
                        version: result.data[0],
                        quantity: item.quantity,
                        total: item.total
                    })
                    if (result.data[0].inStock < item.quantity) toastContext.notify('warning', 'Số lượng sản phẩm còn dưới ' + item.quantity);
                }

            }

        }

        fetchApi();
        setLoading(false)
    }
    useEffect(() => {
        const fetchApi = async () => {
            setObj(item)

            const resultSize = await VersionServices.getVersionSize(item.product.productId)
                .catch((err) => {
                    console.log(err);
                });

            if (resultSize) {
                const data = await resultSize.data.map((cate) => ({ name: cate.name, value: cate }));
                setSizeList(data)

            }
            const resultColor = await VersionServices.getVersionColor(item.product.productId)
                .catch((err) => {
                    console.log(err);
                });

            if (resultColor) {
                const data = await resultColor.data.map((cate) => ({ name: cate.name, value: cate }));
                setColorList(data)

            }
        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    const submitReturn = () => {
        let newObj = obj;
        newObj['exchange_return'] = true;
        setObj(newObj)

        const fetchApi = async () => {
            setLoading(true)
            const returnObj = {
                user: JSON.parse(window.localStorage.getItem('user')),
                returnItem: {
                    product: item.product,
                    version: item.version,
                    quantity: item.quantity,
                    total: item.total
                },
                exchange: stype,
                exchangeItem: stype === true ? newProduct : {},
                status: 'receiving',
                orderId: orderId
            }

            const result = await ReturnServices.CreateReturn(returnObj)
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false);
                console.log(result)
                update()
                toastContext.notify('success', 'Đã tạo đơn trả hàng');
                handleCloseModal()
            }


        }

        fetchApi();



    }
    return (
        <div>
            <div className='flex justify-center my-8'>
                <div className={stype === false ? 'w-[40%] bg-cyan-500 border p-2 text-center rounded-l-full cursor-pointer text-white' : 'w-[40%] bg-slate-100 border p-2 text-center rounded-l-full cursor-pointer'} onClick={() => setStype(false)}>
                    Hoàn trả hàng
                </div>
                <div className={stype === true ? 'w-[40%] bg-cyan-500 border p-2 text-center rounded-r-full cursor-pointer text-white' : 'w-[40%] bg-slate-100 border p-2 text-center rounded-r-full cursor-pointer'} onClick={() => setStype(true)}>
                    Đổi hàng
                </div>
            </div>
            <div>
                <div className='p-2'>Sản phẩm cũ</div>
                {
                    item === '' ? (<div></div>) : (
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
                    )
                }
            </div>

            {
                stype === false ? (
                    <div> </div>
                ) : (

                    newProduct === '' ? (
                        <div className='flex justify-center'>
                            <div className='w-[40%] bg-slate-100 border p-2 text-center cursor-pointer mt-5' onClick={() => setOpenModal(true)}>
                                Chọn sản phẩm đổi
                            </div>
                        </div>
                    ) : (<div>
                        <div className='p-2'>Sản phẩm mới</div>
                        {
                            newProduct === '' ? (<div></div>) : (
                                <div className='flex mb-2'>
                                    <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                                        <img src={newProduct.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                                    </div>
                                    <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                        <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                            {newProduct.product.name}
                                        </div>
                                        <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                            {newProduct.version.color.name}, Size : {newProduct.version.size.name}
                                        </div>
                                        <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                            {addCommas(newProduct.product.price * (100 - newProduct.product.discount) / 100)} đ  x {newProduct.quantity}
                                        </div>

                                    </div>
                                    <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                        Đơn giá : {addCommas(newProduct.product.price * (100 - newProduct.product.discount) / 100)} đ
                                    </div>
                                    <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                        SL : {newProduct.quantity} sản phẩm
                                    </div>
                                </div>
                            )
                        }
                    </div>)


                )
            }

            <div className='lg:flex-1 rounded-lg bg-white p-3'>
                <div className='font-bold mb-4'>Tổng quan đơn</div>

                <div className='flex mb-5 font-semibold'>
                    <div className='w-[50%]'>Tổng phí hoàn trả</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>{
                        newProduct === '' ?
                            addCommas(item.total) :
                            addCommas(item.total - newProduct.total)
                    } đ</div>
                </div>


            </div>

            <hr className='mt-4' />
            <div className='p-3 mt-3 flex justify-end '>

                <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submitReturn()}>
                    Xác nhận
                </button>
            </div>
            <ModalComp
                open={openModal}
                handleClose={handleCloseModalVersion}
                title="Chọn mẫu mã"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModalVersion()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => {
                            handleCloseModalVersion()
                            getVersion()
                        }}>
                            Chọn
                        </button>
                    </div>
                }
            >
                <div className='flex items-center justify-center'>
                    <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                        <img src={item.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                    </div>
                    <div className='md:ms-4 mx-1 cursor-pointer w-[85%] md:me-3'>
                        <div className=' font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                            {item.product.name}
                        </div>


                    </div>

                </div>
                <div className='p-2'>
                    <SelectVersion list={colorList} title={'Màu sắc'} onclick={setColor} />
                    <SelectVersion list={sizeList} title={'Kích thước'} onclick={setSize} />
                </div>


            </ModalComp>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default Exchange_Return;