import React, { useState } from 'react';
import logo from '../../assets/images/logo.png'
import ModalComp from '~/components/ModalComp';
import SelectVersion from '../SelectVersion';
const sizelist = [
    {
        id: 1,
        name: '38',
        value: '38',
    },
    {
        id: 1,
        name: '39',
        value: '39',
    },
    {
        id: 1,
        name: '40',
        value: '40',
    },
    {
        id: 1,
        name: '41',
        value: '41',
    }
]
const colorlist = [
    {
        id: 1,
        name: 'Xanh - Viền nhạt',
    },
    {
        id: 2,
        name: 'Lục - Viền vàng'
    }
]
function Exchange_Return(props) {
    const [stype, setStype] = useState(true)

    const [day, setDay] = useState(new Date())
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
    };

    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [newProduct, setNewProduct] = useState(false)
    return (
        <div>
            <div className='flex justify-center my-8'>
                <div className={stype === true ? 'w-[40%] bg-cyan-500 border p-2 text-center rounded-l-full cursor-pointer text-white' : 'w-[40%] bg-slate-100 border p-2 text-center rounded-l-full cursor-pointer'} onClick={() => setStype(true)}>
                    Hoàn trả hàng
                </div>
                <div className={stype === false ? 'w-[40%] bg-cyan-500 border p-2 text-center rounded-r-full cursor-pointer text-white' : 'w-[40%] bg-slate-100 border p-2 text-center rounded-r-full cursor-pointer'} onClick={() => setStype(false)}>
                    Đổi hàng
                </div>
            </div>
            <div>
                <div className='p-2'>Sản phẩm cũ</div>
                <div className='flex mb-2'>
                    <div className='justify-center md:w-[120px] ssm:w-[30%] min-w-[50px] flex items-center'>
                        <img src={logo} className='md:w-[120px] md:h-[120px] w-[80px]' />
                    </div>
                    <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                        <div className=' font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                            Giày tây nam công sở da mềm đế khâu chắc chắn đóng hộp cẩn thận bao đổi trả nếu ko vừa hàng lỗi sản phẩm đóng hộp (MT04)
                        </div>
                        <div className=' line-clamp-2 text-ellipsis '>
                            Xanh - Vàng, Size : 40
                        </div>
                        <div className='mt-3  font-semibold md:hidden block'>
                            166.000 đ  x 3
                        </div>

                    </div>
                    <div className='w-[15%] font-semibold hidden md:block'>
                        Đơn giá : 166.000 đ
                    </div>
                    <div className='w-[15%] font-semibold hidden md:block'>
                        SL : 3 sản phẩm
                    </div>
                </div>
            </div>

            {
                stype === true ? (
                    <div> </div>
                ) : (

                    newProduct === false ? (
                        <div className='flex justify-center'>
                            <div className='w-[40%] bg-slate-100 border p-2 text-center cursor-pointer' onClick={() => setOpenModal(true)}>
                                Chọn sản phẩm đổi
                            </div>
                        </div>
                    ) : (<div>
                        <div className='p-2'>Sản phẩm mới</div>
                        <div className='flex mb-2'>
                            <div className='justify-center md:w-[120px] ssm:w-[30%] min-w-[50px] flex items-center'>
                                <img src={logo} className='md:w-[120px] md:h-[120px] w-[80px]' />
                            </div>
                            <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                <div className=' font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                    Giày tây nam công sở da mềm đế khâu chắc chắn đóng hộp cẩn thận bao đổi trả nếu ko vừa hàng lỗi sản phẩm đóng hộp (MT04)
                                </div>
                                <div className=' line-clamp-2 text-ellipsis '>
                                    {color.name}, Size : {size.name}
                                </div>
                                <div className='mt-3  font-semibold md:hidden block'>
                                    166.000 đ  x 3
                                </div>

                            </div>
                            <div className='w-[15%] font-semibold hidden md:block'>
                                Đơn giá : 166.000 đ
                            </div>
                            <div className='w-[15%] font-semibold hidden md:block'>
                                SL : 3 sản phẩm
                            </div>
                        </div>
                    </div>)


                )
            }

            <div className='lg:flex-1 rounded-lg bg-white p-3'>
                <div className='font-bold mb-4'>Tổng quan đơn</div>
                <div className='flex mb-2'>
                    <div className='w-[50%]'>Tổng phí</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>1.000.000đ</div>
                </div>

                <div className='flex mb-2'>
                    <div className='w-[50%]'>Phiếu giảm giá đơn hàng</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>- 300.000đ</div>
                </div>

                <div className='flex mb-5 font-semibold'>
                    <div className='w-[50%]'>Tổng phí hoàn trả</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>700.000đ</div>
                </div>


            </div>

            <hr className='mt-4' />
            <div className='p-3 mt-3 flex justify-end '>

                <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' >
                    Xác nhận
                </button>
            </div>
            <ModalComp
                open={openModal}
                handleClose={handleCloseModal}
                title="Chọn mẫu mã"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => {
                            handleCloseModal()
                            setNewProduct(true)

                        }}>
                            Chọn
                        </button>
                    </div>
                }
            >
                <div className='flex items-center justify-center'>
                    <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                        <img src={logo} className='md:w-[120px] md:h-[120px] w-[80px]' />
                    </div>
                    <div className='md:ms-4 mx-1 cursor-pointer w-[85%] md:me-3'>
                        <div className=' font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                            Giày tây nam công sở da mềm đế khâu chắc chắn đóng hộp cẩn thận bao đổi trả nếu ko vừa hàng lỗi sản phẩm đóng hộp (MT04)
                        </div>


                    </div>

                </div>
                <div className='p-2'>
                    <SelectVersion list={colorlist} title={'Màu sắc'} onclick={setColor} />
                    <SelectVersion list={sizelist} title={'Kích thước'} onclick={setSize} />
                </div>


            </ModalComp>
        </div>
    );
}

export default Exchange_Return;