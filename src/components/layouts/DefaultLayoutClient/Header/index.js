import React, { useEffect, useState } from 'react';
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
    faReceipt,
    faArrowRightFromBracket,
    faGear
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import example from '~/assets/example.jpg'
import Avatar from '@mui/material/Avatar';
import ModalLoading from '~/components/ModalLoading';
import Badge from '@mui/material/Badge';
import * as ShoppingCartServices from '~/apiServices/productCartServices'
import * as NotifiServices from '~/apiServices/notifiServices'
import moment from 'moment';
import { format } from 'date-fns';
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
    const now = moment()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [search, setSearch] = useState('')
    const [day, setDay] = useState(new Date())
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        navigate('/collection/search&' + search)
    }

    //Menu 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const show = Boolean(anchorEl);
    const handleShow = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleHide = () => {
        setAnchorEl(null);
    };

    const [user, setUser] = useState('')
    const [number, setNumber] = useState(0)
    const [notifi, setNotifi] = useState([])
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
            const fetchApi = async () => {
                setUser(JSON.parse(window.localStorage.getItem('user')))
                if (window.localStorage.getItem('role') === "user") {
                    const result = await ShoppingCartServices.getAllCarts({
                        user: JSON.parse(window.localStorage.getItem('user'))._id
                    })
                    if (result) {
                        setNumber(result.total)
                        console.log(result);
                    }

                    const notifiResult = await NotifiServices.getAllNotifi({
                        userId: JSON.parse(window.localStorage.getItem('user')).userId
                    })

                    if (notifiResult) {
                        setNotifi(notifiResult.data)
                        console.log(notifiResult);
                    }
                }
            }
            fetchApi();
            setDay(new Date())
            setLoading(false)
        }, 3000); // 3000 milliseconds = 3 seconds

        // Cleanup function để hủy timer nếu component bị unmount trước khi timer chạy
        return () => clearTimeout(timer);


    }, []);
    useEffect(() => {

    }, [day]);
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
                            <div className='w-[320px] min-h-[400px] bg-white rounded-md rounded-tr-[0] p-2 border '>
                                {
                                    window.localStorage.getItem('role') === 'user' ? (
                                        <div>
                                            {
                                                notifi.map((item, index) => (
                                                    <div key={index} className='border-b'>
                                                        <div className='text-black h-[70px]  text-wrap text-[13px] font-medium p-1 mt-3'>{item.note} </div>
                                                        <div className='h-[20px] text-black text-[12px]'>{now.diff(item.createdAt, 'days') > 1 ? format(new Date(item.createdAt), 'dd MMM yyyy - HH:mm') : now.diff(item.createdAt, 'hours') + ' giờ trước'} </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center text-black transition-all'>
                                            Bạn chưa đăng nhập
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='me-5 hover:cursor-pointer group relative ' onClick={() => navigate('/shopping_cart')}>
                        <div className='flex justify-center items-center group-hover:scale-110'>
                            <Badge badgeContent={number} color="primary" className='me-4'>
                                <FontAwesomeIcon icon={faCartShopping} className=' w-[25px] h-[25px] ' />
                            </Badge>

                            <div className='text-[13px] hidden md:block'>
                                Giỏ hàng
                            </div>
                        </div>


                    </div>
                    {
                        window.localStorage.getItem('role') === 'user' ? (
                            <div className='me-6 px-2 py-1 rounded-md cursor-pointer relative' >
                                <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={show ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={show ? 'true' : undefined}
                                        onClick={handleShow}
                                    >
                                        <div className='flex items-center gap-3 text-black'>
                                            {
                                                user === '' ? (<div> </div>) : (<Avatar alt="Remy Sharp" src={user?.images[0].url ? user?.images[0].url : example} />)
                                            }


                                            <div className='hidden sm:block text-white text-[13px]'>{user.name}</div>
                                        </div>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={show}
                                        onClose={handleHide}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}


                                    >
                                        <MenuItem className='w-[200px] hover:bg-slate-400' onClick={() => navigate('/your_account')}>
                                            <FontAwesomeIcon icon={faGear} className='me-4 ' />
                                            Tài khoản
                                        </MenuItem>
                                        <MenuItem onClick={() => {

                                            setTimeout(() => {
                                                setLoading(true)
                                                window.localStorage.setItem('user', null);
                                                window.localStorage.setItem('role', null);
                                                window.localStorage.setItem('access_token', null);
                                                window.localStorage.setItem('refresh_token', null);
                                                setUser('')
                                                setNumber(0)
                                                setDay(new Date())
                                                setLoading(false)
                                                navigate('/login')

                                            }, 500);

                                            handleClose()
                                        }} className='w-[200px] hover:bg-slate-400'>
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-4' />
                                            Đăng suất
                                        </MenuItem>
                                    </Menu>
                                </div>


                            </div>
                        ) : (
                            <div className='flex justify-center items-center me-5 hover:cursor-pointer hover:scale-110 transition-all' onClick={() => navigate('/login')}>
                                <FontAwesomeIcon icon={faUser} className='me-2 w-[25px] h-[25px]' />
                                <div className='text-[13px] hidden md:block'>
                                    Đăng ký | Đăng nhập
                                </div>

                            </div>
                        )
                    }



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
                    <NavLink
                        to='/return_colection'
                        className={({ isActive }) =>
                            isActive ? 'max-w-[240px] min-w-[200px] text-black bg-white h-[50px] rounded-t-lg flex justify-center items-center ' : 'max-w-[240px] min-w-[200px] h-[50px] flex justify-center items-center'
                        }
                    >

                        <div className='text-[18px]'>Hoàn trả hàng</div>
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
                    {
                        window.localStorage.getItem("role") === 'user' ? (
                            <div>
                                <NavLink
                                    to='/your_account'
                                    className={({ isActive }) =>
                                        isActive ? 'active navlink' : 'navlink'
                                    }
                                >
                                    <div >
                                        <FontAwesomeIcon icon={faUser} className='me-4 w-[25px] h-[25px]' />
                                    </div>
                                    <div className='pe-2 text-[18px]'>Tài khoản</div>
                                </NavLink>
                                <NavLink
                                    to='/login'
                                    className={({ isActive }) =>
                                        isActive ? 'active navlink' : 'navlink'
                                    }
                                    onClick={() => {

                                        setTimeout(() => {
                                            setLoading(true)
                                            window.localStorage.setItem('user', null);
                                            window.localStorage.setItem('role', null);
                                            window.localStorage.setItem('access_token', null);
                                            window.localStorage.setItem('refresh_token', null);
                                            setUser('')
                                            setNumber(0)
                                            setDay(new Date())
                                            setLoading(false)
                                            navigate('/login')
                                        }, 500);

                                        handleClose()
                                    }}
                                >
                                    <div >
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-4 w-[25px] h-[25px]' />
                                    </div>
                                    <div className='pe-2 text-[18px]'>Đăng suất</div>
                                </NavLink>
                            </div>
                        ) : (
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
                        )
                    }
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
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default Header;