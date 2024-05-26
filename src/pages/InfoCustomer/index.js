import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as UserServices from '~/apiServices/userServices';
import ModalLoading from '~/components/ModalLoading';
import { ToastContext } from '~/components/ToastContext';
import example from '~/assets/images/logo.png'
function Infocustomer() {
    const navigate = useNavigate();
    const user = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await UserServices.getUser(user.id)
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
                active: true,
            }

            const result = await UserServices.UpdateUser(user.id, newObj)
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
                active: false,
            }

            const result = await UserServices.UpdateUser(user.id, newObj)
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
    return (
        <div>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>)
                    :
                    (<div>
                        <div className='my-6 mx-auto min-h-20 lg:flex lg:w-[90%]'>
                            <div className='min-w-[300px] min-h-[200px] bg-white mt-5 p-5 mx-auto my-6 me-[5%] w-[90%] lg:w-[450px] rounded-lg'>
                                Ảnh đại diện
                                <hr />
                                <div className='flex justify-center items-center mt-9'>
                                    <img src={example} className='w-[250px] h-[250px] rounded-full' />
                                </div>
                            </div>
                            <div className='frame'>
                                Thông tin chung
                                <hr />
                                <div className='xl:grid xl:grid-cols-2 mt-8 gap-y-7'>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Tên khách hàng</div>
                                        <div className='text-[15px]'>: {obj.name}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Số điện thoại</div>
                                        <div className='text-[15px]'>: {obj.phone}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Email</div>
                                        <div className='text-[15px]'>: {obj.email}</div>
                                    </div>
                                    <div className='flex mb-5'>
                                        <div className='w-[150px] sm:w-[150px] text-[15px]'>Địa chỉ</div>
                                        <div className='text-[15px]'>: {obj.address}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='frame'>
                            Danh sách đơn hàng
                            <hr />
                        </div>
                        <div className='frame text-end'>
                            <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate(-1)}>
                                Quay lại
                            </button>
                            {
                                obj.active === true ? (<button className='bg-red-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#f97777fd] cursor-pointer' onClick={() => handleCancel()}>
                                    Cấm tài khoản
                                </button>) : (
                                    <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8 cursor-pointer' onClick={() => handleActive()}>
                                        Mở tài khoản
                                    </button>
                                )
                            }

                        </div>
                    </div>)
            }
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>

    );
}

export default Infocustomer;