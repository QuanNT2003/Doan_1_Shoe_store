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
function Import() {
    const navigate = useNavigate();
    const product = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date())
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const fetchApi = async () => {
            const result = await ProductServices.getProduct(product.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
            }
            const response = await VersionServices.getAllVersions({
                productId: product.id
            })
                .catch((error) => {

                    if (error?.response?.status === 404) {

                    } else {
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    }
                });

            if (response) {
                console.log(response);
                setList(response.data.map((version) => ({ version: version, quantity: 0 })));
                // console.log(data);
                // setList(data)
                // console.log(list);
            }
        }

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const update = () => {
        let newTotal = 0;

        list.map(item => {
            newTotal += item.quantity
        })
        setTotal(newTotal)
    }

    const addImport = async () => {
        const fetchApi = async () => {
            setLoading(true)
            const importObj = {
                product: obj,
                item: list,
                totalQuantity: total,
                totalCost: total * obj.cost
            }
            console.log(importObj);
            const result = await ImportServices.CreateImport(importObj)
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false)
                console.log(result);
                toastContext.notify('success', 'Tạo đơn nhập hàng thành công');
                navigate('/imports/detail/' + result.data.importId)
            }

        }

        fetchApi();
    }
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
                                        {obj.productId}
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
                                        {obj.name}
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
                                        {obj.brand.name}
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
                                        {addCommas(obj.cost)} đ
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
                                    list.map((item, index) => (
                                        <ImportItem key={index} item={item} total={update} />
                                    ))
                                }
                            </div>
                            <div className='my-5'>
                                <div className='flex lg:justify-end me-10 my-2'>
                                    <div className='text-[16px] w-[200px]'>Tổng số lượng nhập :</div>
                                    <div className='w-[150px] ms-3 text-[16px] text-end'>{total}</div>
                                </div>
                                <div className='flex lg:justify-end me-10 my-2'>
                                    <div className='text-[16px] w-[200px]'>Tổng phí :</div>
                                    <div className='w-[150px] ms-3 text-[16px] text-end'>{addCommas(total * obj.cost)} đ</div>
                                </div>
                            </div>
                            <div className='w-[90%] mx-auto text-end'>
                                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => {
                                    addImport()
                                }}>
                                    Nhập hàng
                                </button>
                            </div>
                        </div>
                        <ModalLoading open={loading} title={'Đang tải'} />
                    </div>
                )
            }
        </div >
    );
}

export default Import;