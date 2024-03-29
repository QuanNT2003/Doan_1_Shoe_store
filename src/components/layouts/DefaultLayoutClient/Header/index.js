import React from 'react';
import image from '~/assets/images/image.png'
import SearchBar from '~/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCartShopping,
    faUser
} from '@fortawesome/free-solid-svg-icons';
function Header() {
    return (
        <div className='flex h-[100px] justify-center items-center bg-blue-500'>
            <div className='flex-1 flex items-center lg:justify-center justify-start ms-4'>
                <img src={image} className='h-[50px] w-[150px] rounded-md me-6' />
            </div>

            <div className='justify-center items-center me-20 flex-[2] hidden lg:flex'>
                <SearchBar placeholder={'Tim kiếm sản phẩm'} />
            </div>
            <div className='flex justify-end items-center flex-1'>
                <div className='me-5 hover:cursor-pointer group relative '>
                    <div className='flex justify-center items-center text-white group-hover:scale-110'>
                        <FontAwesomeIcon icon={faBell} className='me-4 w-[25px] h-[25px]  md:w-[30px] md:h-[30px] text-white' />
                        <div className='text-[12px] hidden md:block'>
                            Thông báo
                        </div>
                    </div>

                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 origin-top inset-y-7 right-0'>
                        <div className='flex justify-end'>
                            <div className='triangle-up'></div>
                        </div>
                        <div className='min-w-[300px] min-h-[400px] bg-white rounded-md rounded-tr-[0] p-2 '>
                            123
                        </div>
                    </div>
                </div>
                <div className='me-5 hover:cursor-pointer group relative '>
                    <div className='flex justify-center items-center text-white group-hover:scale-110'>
                        <FontAwesomeIcon icon={faCartShopping} className='me-4 w-[25px] h-[25px]  md:w-[30px] md:h-[30px] text-white ' />
                        <div className='text-[12px] hidden md:block'>
                            Giỏ hàng
                        </div>
                    </div>

                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 origin-top inset-y-7 right-0'>
                        <div className='flex justify-end'>
                            <div className='triangle-up'></div>
                        </div>
                        <div className='min-w-[300px] min-h-[400px] bg-white rounded-md rounded-tr-[0] p-2'>
                            123
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center text-white me-5 hover:cursor-pointer'>
                    <FontAwesomeIcon icon={faUser} className='me-4 w-[25px] h-[25px]  md:w-[30px] md:h-[30px] text-white' />
                    <div className='text-[12px] hidden md:block'>
                        Đăng ký | Đăng nhập
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Header;