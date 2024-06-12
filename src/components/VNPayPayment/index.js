import React, { useContext, useState } from 'react';
import axios from 'axios';
import ModalComp from '~/components/ModalComp';
import { ToastContext } from '~/components/ToastContext';
function VNPayPayment({ obj }) {
    const toastContext = useContext(ToastContext);
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {
        setOpenModal(false)

    };
    const handleClick = async (bankCode) => {
        try {
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const clientIp = ipResponse.data.ip;
            const response = await fetch('http://localhost:3001/api/vnpay/create_payment_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: obj.orderId,
                    amount: obj.amount,
                    clientIp: clientIp,
                    language: 'vn',
                    bankCode: bankCode
                }),
            });
            const data = await response.json();
            console.log(data);
            if (data.data) {
                console.log(data.data);
                toastContext.notify('info', 'Đã thanh toán, vui lòng đợi xác nhận từ quản trị viên');
                window.location.href = data.data;
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
    return (
        <div className='w-[100%] flex justify-center'>
            <button className='bg-orange-500 mx-auto p-3 rounded-lg w-[60%] text-white hover:bg-orange-400 cursor-pointer ' onClick={() => setOpenModal(true)}>
                Thanh toán VNPay
            </button>
            <ModalComp
                open={openModal}
                handleClose={handleCloseModal}
                title="Chọn ngân hàng"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                            Quay lại
                        </button>
                    </div>
                }
            >
                <div className='flex gap-8 flex-wrap p-2 justify-center'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_BIDV.svg/2560px-Logo_BIDV.svg.png' className='w-[100px] cursor-pointer border' onClick={() => handleClick('BIDV')} />
                    <img src='https://i.gyazo.com/e92f56ffc6813473826b66d9ccbe81e3.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('NCB')} />
                    <img src='https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VietinBank-CTG-Te.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('CTG')} />
                    <img src='https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('VCB')} />
                    <img src='https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo-Sacombank-new.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('STB')} />
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Logo_TPBank.svg/2560px-Logo_TPBank.svg.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('TPB')} />
                    <img src='https://upload.wikimedia.org/wikipedia/vi/thumb/e/e5/Logo-Ngan_hang_Phuong_Dong.png/640px-Logo-Ngan_hang_Phuong_Dong.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('OCB')} />
                    <img src='https://upload.wikimedia.org/wikipedia/commons/a/a0/Logo_ng%C3%A2n_h%C3%A0ng_Scb.png' className='w-[100px] cursor-pointer  border' onClick={() => handleClick('SCB')} />
                </div>


            </ModalComp>
        </div>
    );
}

export default VNPayPayment;