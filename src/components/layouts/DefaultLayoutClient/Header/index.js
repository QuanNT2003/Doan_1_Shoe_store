import React, { useState } from 'react';
import image from '~/assets/images/logo.png'
import SearchBar from '~/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCartShopping,
    faUser,
    faHome,
    faMale,
    faFemale,
    faChild,
    faPercent
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
const links = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <FontAwesomeIcon icon={faHome} className='me-4 ' />,
    },
    {
        title: 'Deal giá hời',
        path: '/1',
        icon: <FontAwesomeIcon icon={faPercent} className='me-4 ' />,
    },
    {
        title: 'Giày dép nam',
        path: '/2',
        icon: <FontAwesomeIcon icon={faMale} className='me-4 ' />,
    },
    {
        title: 'Giày dép nữ',
        path: '/3',
        icon: <FontAwesomeIcon icon={faFemale} className='me-4 ' />,
    },
    {
        title: 'Giày trẻ em',
        path: '/4',
        icon: <FontAwesomeIcon icon={faChild} className='me-4 ' />,
    },

]
function Header() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className=' bg-orange-500 text-white'>
            <div className='flex justify-center py-2 items-center md:w-[95%] md:mx-auto mt-2 h-[130px]'>
                <div className='flex-1 flex items-center lg:justify-center justify-start ms-4'>
                    <img src={image} className='md:h-[90px] md:w-[90px] h-[50px] w-[50px] rounded-md me-6' />
                </div>

                <div className='justify-center items-center me-20 flex-[4] hidden lg:flex'>
                    <SearchBar placeholder={'Tim kiếm sản phẩm'} />
                </div>
                <div className='flex justify-end items-center flex-[2]'>
                    {/* <div onClick={handleOpen} className='sm:hidden cursor-pointer me-5 '>
                        <FontAwesomeIcon icon={faBars} className='hover:scale-110 me-4 w-[25px] h-[25px]' />
                    </div> */}
                    <div className='me-5 hover:cursor-pointer group relative '>
                        <div className='flex justify-center items-center group-hover:scale-110'>
                            <FontAwesomeIcon icon={faBell} className='me-4 w-[25px] h-[25px]' />
                            <div className='text-[13px] hidden md:block'>
                                Thông báo
                            </div>
                        </div>

                        <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 origin-top inset-y-7 right-0 z-50 '>
                            <div className='flex justify-end'>
                                <div className='triangle-up border'></div>
                            </div>
                            <div className='min-w-[300px] min-h-[400px] bg-white rounded-md rounded-tr-[0] p-2 border '>
                                123
                            </div>
                        </div>
                    </div>
                    <div className='me-5 hover:cursor-pointer group relative '>
                        <div className='flex justify-center items-center group-hover:scale-110'>
                            <FontAwesomeIcon icon={faCartShopping} className='me-4 w-[25px] h-[25px] ' />
                            <div className='text-[13px] hidden md:block'>
                                Giỏ hàng
                            </div>
                        </div>

                        <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 origin-top inset-y-7 right-0 z-50'>
                            <div className='flex justify-end'>
                                <div className='triangle-up border'></div>
                            </div>
                            <div className='min-w-[300px] min-h-[400px] bg-white rounded-md rounded-tr-[0] p-2 border'>
                                123
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-center me-5 hover:cursor-pointer hover:scale-110 transition-all'>
                        <FontAwesomeIcon icon={faUser} className='me-2 w-[25px] h-[25px]' />
                        <div className='text-[13px] hidden md:block'>
                            Đăng ký | Đăng nhập
                        </div>

                    </div>


                </div>
            </div>
            {/* <div className={'md:flex lg:w-[50%] lg:mx-auto my-4 hidden'}>
                <div className='mx-8 cursor-pointer my-2' >
                    Trang chủ
                </div>
                <div className='mx-8 cursor-pointer my-2'>
                    Deal giá hời
                </div>
                <div className='mx-8 cursor-pointer my-2'>
                    Các thương hiệu
                </div>
                <div className='mx-8 cursor-pointer my-2'>
                    Giày dép nam
                </div>
                <div className='mx-8 cursor-pointer my-2'>
                    Giày dép nữ
                </div>
                <div className='mx-8 cursor-pointer my-2'>
                    Giày trẻ em
                </div>
            </div> */}
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='transition-all'
            >
                <Box className='h-screen p-5 w-[30vh] bg-white border-none transition-all'>
                    <div className='pt-6 flex justify-center items-center h-28'>
                        <img src={image} className='h-full w-1/3 rounded-md me-3' />
                        TQShop
                    </div>
                    <hr className=' my-4 mx-3' />
                    {
                        links.map((e, index) => (
                            <NavLink
                                key={index}
                                to={e.path}
                                className={({ isActive }) =>
                                    isActive ? 'active navlink' : 'navlink'
                                }
                            >
                                <div >
                                    {e.icon}
                                </div>
                                <div className='pe-2'>{e.title}</div>
                            </NavLink>
                        ))
                    }
                </Box>
            </Modal> */}
        </div>
    );
}

export default Header;