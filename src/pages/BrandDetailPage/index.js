import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Brand from '~/apiServices/brandServices';
import * as ProductServices from '~/apiServices/productServices'
import ModalLoading from '~/components/ModalLoading';
import ProductCarousel from '~/components/ProductCarousel';
import { ToastContext } from '~/components/ToastContext';

function BrandDetailPage() {
    const navigate = useNavigate();
    const brand = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [productList, setProductList] = useState([]);
    const [updatePage, setUpdatePage] = useState(new Date());

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await Brand.getBrand(brand.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
                let brand = ([])
                brand.push(
                    {
                        value: result.data._id
                    }
                )
                const response = await ProductServices.getAllProducts({
                    limit: 12,
                    page: 1,
                    brand: brand
                })
                    .catch((error) => {


                        if (error?.response?.status === 404) {
                            setProductList([]);
                        } else {
                            toastContext.notify('error', 'Có lỗi xảy ra');
                        }
                    });

                if (response) {
                    setProductList(response.data);
                }
            }
        }

        fetchApi();
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);
    return (
        <div>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>)
                    :
                    (
                        <div >
                            <div className='bg-white m-4 mb-10 rounded-lg pt-3'>
                                <div className='flex m-5 ms-8 flex-[2] justify-center ssm:justify-normal'>
                                    <div className='me-5'>
                                        <img src={obj.image[0].url} className='w-[80px] h-[80px] rounded-full' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex-1 font-bold mb-3 text-[20px] mt-2'>
                                            {obj.name}
                                        </div>
                                        <div className='flex-1'>
                                            {obj.nation}
                                        </div>
                                    </div>
                                </div>
                                <hr className='mt-5' />
                                <div className='md:flex justify-center items-center p-5'>
                                    <div className='mx-10 flex flex-col items-center py-2'>
                                        <div className='font-bold text-[20px]'>5 năm</div>
                                        <div>Thành lập</div>
                                    </div>
                                    <div className='mx-10 flex flex-col items-center py-2'>
                                        <div className='font-bold text-[20px]'>190 </div>
                                        <div>Sản phẩm</div>
                                    </div>
                                    <div className='mx-10 flex flex-col items-center py-2'>
                                        <div className='font-bold text-[20px]'>hơn 590 </div>
                                        <div>Đơn hàng đã giao</div>
                                    </div>
                                    <div className='mx-10 flex flex-col items-center py-2'>
                                        <div className='font-bold text-[20px]'>Có mặt tại hơn 100 </div>
                                        <div>Quốc gia</div>
                                    </div>
                                </div>
                                <hr className='mt-5' />
                                <div className='lg:grid lg:grid-cols-2 p-5'>
                                    <div className='flex m-3'>
                                        <div className='w-[150px] text-[16px] font-bold'>Số điện thoại</div>
                                        <div className='w-[20px] text-[16px]'>:</div>
                                        <div className='text-[16px]'>{obj.phone}</div>
                                    </div>
                                    <div className='flex m-3'>
                                        <div className='w-[150px] text-[16px] font-bold'>Email</div>
                                        <div className='w-[20px] text-[16px]'>:</div>
                                        <div className='text-[16px]'>{obj.email}</div>
                                    </div>
                                    <div className='flex m-3'>
                                        <div className='w-[150px] text-[16px] font-bold'>Website</div>
                                        <div className='w-[20px] text-[16px]'>:</div>
                                        <div className='text-[16px]'>{obj.web}</div>
                                    </div>

                                </div>
                                <div className='p-5 m-3 mt-0 pt-2'>
                                    <div className='w-[150px] text-[16px] font-bold'>Giới thiệu :</div>
                                    <div className='text-[16px]'>{obj.note}</div>
                                </div>
                            </div>
                            <div className='bg-white m-4 mb-10 rounded-lg'>

                                <ProductCarousel title={'Sản phẩm của thương hiệu'} listProduct={productList} path={'/collection/' + 'brand' + '&' + obj._id} />

                            </div >


                        </div >)}
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>

    );
}

export default BrandDetailPage;