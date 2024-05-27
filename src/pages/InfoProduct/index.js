import React, { useState, useCallback, useContext, useEffect } from 'react';
import ImageCarousel from '~/components/ImageCarousel';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import * as ProductServices from '~/apiServices/productServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';

const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function InfoProduct() {
    const navigate = useNavigate();
    const productID = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await ProductServices.getProduct(productID.id)
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

    const handleDelete = () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;
            const result = await ProductServices.deleteProduct(productID.id)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã xóa sản phẩm');
                setUpdatePage(new Date());
                navigate('/products')
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
                        <div className='mt-6 lg:w-[96%] mx-auto lg:grid lg:grid-cols-3'>
                            <div className='frame lg:col-span-2 '>
                                Thông tin sản phẩm
                                <hr />
                                <div className='lg:grid lg:grid-cols-5 mt-5'>
                                    <div className='lg:col-span-3 lg:ms-2'>
                                        <ImageCarousel images={obj.images} showThumbnails={true} />
                                    </div>
                                    <div className='lg:col-span-2 lg:ms-10'>
                                        <div className='font-bold mb-3'>{obj.name}</div>
                                        <div className='font-bold mb-3'>Mã sản phẩm :  {obj.productId}</div>
                                        <div className='font-bold mb-3 '>{addCommas(obj.price)} <sup>đ</sup> -<span className='text-[14px] ms-1'> {addCommas(obj.discount)} %</span> </div>
                                        <div className='mb-3 flex flex-wrap'><div className='min-w-[130px]'>Loại sản phẩm</div> : <div className='ms-2 type'>{obj.category.name}</div></div>
                                        <div className='mb-3 flex flex-wrap'><div className='min-w-[130px]'>Tag
                                        </div>
                                            :
                                            <span className='type mb-2'>{obj.classify} </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='frame lg:col-span-1 '>
                                Mô tả sản phẩm
                                <hr />
                                <div className='mt-4 text-[14px]'>
                                    {obj.description}
                                </div>

                            </div>
                            <div className='frame lg:col-span-2  mt-5'>
                                Giá bán
                                <hr />
                                <div className='lg:grid lg:grid-cols-2 mt-5'>
                                    <div className='lg:col-span-1 flex my-3'>
                                        <div className='min-w-[120px]'>Giá nhập</div>
                                        <div className='min-w-[30px]'> : </div>
                                        <div > {addCommas(obj.cost)}đ</div>
                                    </div>
                                    <div className='lg:col-span-1 flex my-3'>
                                        <div className='min-w-[120px]'>Giá bán</div>
                                        <div className='min-w-[30px]'> : </div>
                                        <div > {addCommas(obj.price)}đ</div>
                                    </div>
                                </div>

                            </div>
                            <div className='frame lg:col-span-1 '>
                                Thông tin bổ sung
                                <hr className='mb-3' />
                                <div className='flex my-3 flex-wrap'>
                                    <div className='min-w-[220px]'>Số lượng sản phẩm còn</div>
                                    <div className='min-w-[30px]'> : </div>
                                    <div > 40</div>
                                </div>
                                <div className='flex my-3 flex-wrap'>
                                    <div className='min-w-[220px]'>Đánh giá sản phẩm</div>
                                    <div className='min-w-[30px]'> : </div>
                                    <div > <Rating name="size-large" value={obj.star} readOnly size="small" /> </div>
                                </div>
                            </div>
                        </div>
                        <div className='frame grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 lg:flex lg:flex-row-reverse'>
                            <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate('/products/version/' + productID.id)}>
                                Quản lý phiên bản
                            </button>
                            <button className='bg-white py-4 px-3 rounded-lg min-w-[130px] text-blue-500 hover:bg-[#f8f8f9] cursor-pointer border-blue-500 border-[1px] border-solid' onClick={() => navigate('/products/update/' + productID.id)}>
                                Sửa
                            </button>
                            <button className='bg-white py-4 px-3 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid' onClick={() => handleDelete()}>
                                Xóa
                            </button>
                            <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate('/products/import/' + productID.id)}>
                                Nhập hàng
                            </button>
                        </div>
                        <ModalLoading open={loading} title={'Đang tải'} />
                    </div>)
            }


        </div >
    );
}

export default InfoProduct;