import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Brand from '~/apiServices/brandServices';
import ModalLoading from '~/components/ModalLoading';
import { ToastContext } from '~/components/ToastContext';
function InfoBrand() {
    const navigate = useNavigate();
    const brand = useParams();
    const toastContext = useContext(ToastContext);



    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
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


            const result = await Brand.deleteBrand(brand.id)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã xóa thương hiệu');
                setUpdatePage(new Date());
                navigate('/brands')
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
                            <div className='min-w-[300px] min-h-[200px] font-semibold bg-white mt-5 p-5 mx-auto my-6 me-[5%] w-[90%] lg:w-[450px] rounded-lg'>
                                Ảnh đại diện
                                <hr />
                                <div className='flex justify-center items-center mt-9'>
                                    <img src={obj?.image[0]?.url} className=' h-fit rounded-lg w-fit max-h-[200px]' />
                                </div>
                            </div>


                            <div className='frame'>
                                <div className='font-semibold'>
                                    Thông tin chung
                                </div>

                                <hr />
                                <div className='xl:grid xl:grid-cols-2 mt-8 gap-y-7'>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Tên thương hiệu</div>
                                        <div className='text-[15px] w-[10px]'>:</div>
                                        <div className='text-[15px]'>{obj.name}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Email</div>
                                        <div className='text-[15px] w-[10px]'>:</div>
                                        <div className='text-[15px]'>{obj.email}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Số điện thoại</div>
                                        <div className='text-[15px] w-[10px]'>:</div>
                                        <div className='text-[15px]'>{obj.phone}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Quốc gia</div>
                                        <div className='text-[15px] w-[10px]'>:</div>
                                        <div className='text-[15px]'>{obj.nation}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Website chính thức</div>
                                        <div className='text-[15px] w-[10px]'>:</div>
                                        <div className='text-[15px]'>{obj.web}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='frame'>
                            <div className='font-semibold'>
                                Giới thiệu chung
                            </div>

                            <hr />
                            <div className='mt-6 text-[15px]'>
                                {obj.note}
                            </div>

                        </div>
                        <div className='frame text-end'>
                            <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer me-3' onClick={() => navigate('/brands/update/' + brand.id)}>
                                Sửa
                            </button>
                            <button className='bg-white py-4 px-3 me-3 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid' onClick={() => handleDelete()}>
                                Xóa
                            </button>
                        </div>
                    </div>)
            }
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default InfoBrand;