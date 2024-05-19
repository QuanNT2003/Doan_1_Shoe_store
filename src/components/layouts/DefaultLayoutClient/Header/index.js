import React, { useState } from 'react';
import image from '~/assets/images/logo.png'
import SearchBar from '~/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCartShopping,
    faUser,
    faHome,
    faPercent,
    faBars,
    faStore,
    faReceipt
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const links = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <FontAwesomeIcon icon={faHome} className='me-4 ' />,
    },
    {
        title: 'Thương hiệu',
        path: '/brand_collection',
        icon: <FontAwesomeIcon icon={faStore} className='me-4 ' />,
    },
    {
        title: 'Deal giá hời',
        path: '/discount_collection',
        icon: <FontAwesomeIcon icon={faPercent} className='me-4 ' />,
    },
    {
        title: 'Giỏ hàng',
        path: '/shopping_cart',
        icon: <FontAwesomeIcon icon={faCartShopping} className='me-4 ' />,
    },
    {
        title: 'Đơn hàng',
        path: '/order_colection',
        icon: <FontAwesomeIcon icon={faReceipt} className='me-4 ' />,
    },

]
function Header() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [search, setSearch] = useState('')

    const onClick = () => {
        navigate('/collection/search&' + search)
    }
    return (
        <div className=' bg-cyan-600 text-white transition-all'>
            <div className='flex justify-around py-2 items-center md:w-[85%] md:mx-auto mt-2 h-[130px]'>
                <div className=' flex items-center lg:justify-center justify-start ssm:mx-5'>
                    <img src={image} className='md:h-[90px] md:w-[90px] h-[60px] w-[60px] rounded-md' />
                </div>

                <div className='justify-center items-center flex ssm:flex-[2] ssm:mx-5'>
                    <SearchBar placeholder={'Tim kiếm sản phẩm'} onClick={onClick} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div onClick={handleOpen} className='lg:hidden cursor-pointer me-2 '>
                    <FontAwesomeIcon icon={faBars} className='hover:scale-110 me-4 w-[25px] h-[25px]' />
                </div>
                <div className='justify-end items-center hidden lg:flex flex-1'>

                    <div className='me-5 hover:cursor-pointer group relative'>
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

                    <div className='flex justify-center items-center me-5 hover:cursor-pointer hover:scale-110 transition-all' onClick={() => navigate('/login')}>
                        <FontAwesomeIcon icon={faUser} className='me-2 w-[25px] h-[25px]' />
                        <div className='text-[13px] hidden md:block'>
                            Đăng ký | Đăng nhập
                        </div>

                    </div>


                </div>
            </div>
            <div className='my-7 lg:flex'>
                <div className='lg:flex hidden mx-auto h-[100%]'>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive ? 'max-w-[240px] min-w-[200px] text-black bg-white h-[50px] rounded-t-lg flex justify-center items-center ' : 'max-w-[240px] min-w-[200px] h-[50px] flex justify-center items-center'
                        }
                    >

                        <div className='text-[18px]'>Trang chủ</div>
                    </NavLink>
                    <NavLink
                        to='/brand_collection'
                        className={({ isActive }) =>
                            isActive ? 'max-w-[240px] min-w-[200px] text-black bg-white h-[50px] rounded-t-lg flex justify-center items-center ' : 'max-w-[240px] min-w-[200px] h-[50px] flex justify-center items-center'
                        }
                    >

                        <div className='text-[18px]'>Các thương hiệu</div>
                    </NavLink>
                    <NavLink
                        to='/discount_collection'
                        className={({ isActive }) =>
                            isActive ? 'max-w-[240px] min-w-[200px] text-black bg-white h-[50px] rounded-t-lg flex justify-center items-center ' : 'max-w-[240px] min-w-[200px] h-[50px] flex justify-center items-center'
                        }
                    >

                        <div className='text-[18px]'>Deal giá hời</div>
                    </NavLink>
                    <NavLink
                        to='/shopping_cart'
                        className={({ isActive }) =>
                            isActive ? 'max-w-[240px] min-w-[200px] text-black bg-white h-[50px] rounded-t-lg flex justify-center items-center ' : 'max-w-[240px] min-w-[200px] h-[50px] flex justify-center items-center'
                        }
                    >

                        <div className='text-[18px]'>Giỏ hàng</div>
                    </NavLink>
                    <NavLink
                        to='/order_colection'
                        className={({ isActive }) =>
                            isActive ? 'max-w-[240px] min-w-[200px] text-black bg-white h-[50px] rounded-t-lg flex justify-center items-center ' : 'max-w-[240px] min-w-[200px] h-[50px] flex justify-center items-center'
                        }
                    >

                        <div className='text-[18px]'>Đơn hàng</div>
                    </NavLink>

                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=''
            >
                <Box className='h-screen p-5 ssm:w-[40vh] w-[35vh] bg-white border-none transition-all'>
                    <div className='pt-6 flex justify-center items-center h-28'>
                        <img src={image} className='h-full w-1/3 rounded-md me-3' />
                        TQShop
                    </div>
                    <hr className=' my-4 mx-3' />
                    <NavLink
                        to='/234'
                        className={({ isActive }) =>
                            isActive ? 'active navlink' : 'navlink'
                        }
                    >
                        <div >
                            <FontAwesomeIcon icon={faBell} className='me-4 w-[25px] h-[25px]' />
                        </div>
                        <div className='pe-2 text-[18px]'>Thông báo</div>
                    </NavLink>
                    <NavLink
                        to='/login'
                        className={({ isActive }) =>
                            isActive ? 'active navlink' : 'navlink'
                        }
                    >
                        <div >
                            <FontAwesomeIcon icon={faUser} className='me-4 w-[25px] h-[25px]' />
                        </div>
                        <div className='pe-2 text-[18px]'>Đăng ký | Đăng nhập</div>
                    </NavLink>
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
                                <div className='pe-2 text-[18px]'>{e.title}</div>
                            </NavLink>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default Header;