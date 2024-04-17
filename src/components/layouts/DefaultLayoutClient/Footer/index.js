import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';
function Footer() {
    return (
        <div className='bg-slate-800 text-white space-x-10 py-10 select-none'>
            <div className='ssm:flex justify-between w-[60%] mx-auto   '>
                <div className='font-inter py-10 text-[12px] flex-col flex cursor-pointer'>
                    <div className='text-[15px] font-bold mb-3'>Về chúng tôi</div>
                    <div className='space-y-2'>
                        <div>Giới thiệu</div>
                        <div>Quy chế hoạt động</div>
                        <div>Chính sách bảo mật</div>
                        <div>Giao hàng và nhận hàng</div>
                        <div>Điều khoản sử dụng</div>
                    </div>

                </div>
                <div className='font-inter py-10 text-[12px] flex-col flex cursor-pointer'>
                    <div className='text-[15px] font-bold mb-3'>Giành cho người mua</div>
                    <div className='space-y-2'>
                        <div>Giải quyết khiếu nại</div>
                        <div>Hướng dẫn mua hàng</div>
                        <div>Chính sách hoàn trả</div>
                        <div>Chăm sóc khách hàng</div>
                    </div>

                </div>
                <div className='font-inter py-10 text-[12px] flex-col flex cursor-pointer'>
                    <div className='text-[15px] font-bold mb-3'>Follow chúng tôi</div>

                    <div className='space-x-3 flex'>
                        <FontAwesomeIcon icon={faFacebook} className='w-[25px] h-[25px]' />
                        <FontAwesomeIcon icon={faInstagram} className='w-[25px] h-[25px]' />
                        <FontAwesomeIcon icon={faLinkedin} className='w-[25px] h-[25px]' />
                        <FontAwesomeIcon icon={faTwitter} className='w-[25px] h-[25px]' />
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Footer;