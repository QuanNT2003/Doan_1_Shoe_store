import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as VersionServices from '~/apiServices/versionServices'
import * as ProductServices from '~/apiServices/productServices'
import * as ImportServices from '~/apiServices/importServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import ImportItem from '~/components/ImportItem';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
function InfoImport() {
    const navigate = useNavigate();
    const importId = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date())

    useEffect(() => {
        const fetchApi = async () => {
            const result = await ImportServices.getImport(importId.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
            }

        }

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {
                obj === null ? (<ModalLoading open={true} title={'Đang tải'} />) : (
                    <div>
                        <div className='frame'>
                            <div className='font-semibold'>Thông tin sản phẩm </div>

                            <hr className='my-3' />
                            <div className='lg:grid lg:grid-cols-2'>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Mã sản phẩm
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {obj.product.productId}
                                    </div>
                                </div>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Tên sản phẩm
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {obj.product.name}
                                    </div>
                                </div>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Nhà cung cấp
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {obj.product.brand.name}
                                    </div>
                                </div>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Đơn giá sản phẩm
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {addCommas(obj.product.cost)} đ
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='frame'>
                            <div className='font-semibold mb-3'>Danh sách nhập hàng </div>
                            <div className=' overflow-auto mb-3'>
                                <div className='flex min-w-[100%] w-fit h-[60px] bg-slate-100'>
                                    <div className='min-w-[400px] flex justify-center items-center'>
                                        Mã phiên bản
                                    </div>
                                    <div className='min-w-[300px] flex justify-center items-center'>
                                        Màu sắc, kích thước
                                    </div>
                                    <div className='min-w-[300px] flex justify-center items-center'>
                                        Số lượng nhập
                                    </div>
                                </div>
                                {
                                    obj.item.map((item, index) => (
                                        <div className='flex min-w-[100%] w-fit h-[80px] border-b-[1px] border-t-[1px]' key={index}>
                                            <div className='min-w-[400px] flex justify-center items-center text-blue-600'>
                                                {item.version.versionId}
                                            </div>
                                            <div className='min-w-[300px] flex justify-center items-center'>
                                                {item.version.color.name} - size : {item.version.size.name}
                                            </div>
                                            <div className='min-w-[300px] flex justify-center items-center'>
                                                {item.quantity}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='my-5'>
                                <div className='flex lg:justify-end me-10 my-2'>
                                    <div className='text-[16px] w-[200px]'>Tổng số lượng nhập :</div>
                                    <div className='w-[150px] ms-3 text-[16px] text-end'>{obj.totalQuantity}</div>
                                </div>
                                <div className='flex lg:justify-end me-10 my-2'>
                                    <div className='text-[16px] w-[200px]'>Tổng phí :</div>
                                    <div className='w-[150px] ms-3 text-[16px] text-end'>{addCommas(obj.totalCost)} đ</div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default InfoImport;