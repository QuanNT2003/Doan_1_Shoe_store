import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faArrowRightFromBracket,
    faBars,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import example from '~/assets/example.jpg'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SideBar from '../SideBar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { ToastContext } from '~/components/ToastContext';
function Header({ title, back }) {

    const navigate = useNavigate();
    const [day, setDay] = useState(new Date())
    const [loading, setLoading] = useState(false);
    const toastContext = useContext(ToastContext);
    const [admin, setAdmin] = useState('')

    const [anchorEl, setAnchorEl] = React.useState(null);
    const show = Boolean(anchorEl);
    const handleShow = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleHide = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
            const fetchApi = async () => {
                if (window.localStorage.getItem('AdminLogin') === "true") {
                    setAdmin(JSON.parse(window.localStorage.getItem('admin')))
                }
                else {
                    navigate('/adminLogin')
                    toastContext.notify('error', 'Chỉ đăng nhập khi có tài khoản Admin');
                }
            }
            fetchApi();
            setDay(new Date())
            setLoading(false)
        }, 5000); // 3000 milliseconds = 3 seconds

        // Cleanup function để hủy timer nếu component bị unmount trước khi timer chạy
        return () => clearTimeout(timer);

    }, []);

    const handleLogOut = () => {
        setAdmin('')
        window.localStorage.setItem('admin', null);
        window.localStorage.setItem('AdminLogin', false);
        navigate('/adminLogin')
        setDay(new Date())
    }
    return (
        <div className='h-20 bg-white w-full flex justify-between items-center'>
            <div className='flex gap-1 ms-2 items-center'>
                <div onClick={handleOpen} className='sm:hidden cursor-pointer border-2 p-2 px-3 border-white rounded-md hover:border-black'>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                {back === true && (
                    <div
                        onClick={() => navigate(-1)}
                        className='border-2 border-white hover:text-white hover:bg-[#3a57e8] p-2 px-3 rounded-md cursor-pointer'
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                )}
                <div className='font-bold text-[18px]'>{title}</div>
            </div>


            <div className='me-6 hover:border-black border-[1px] border-white px-2 py-1 rounded-md cursor-pointer relative' >
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
                                admin === '' ? (<div> </div>) : (<Avatar alt="Remy Sharp" src={admin?.images[0]?.url ? admin?.images[0]?.url : example} />)
                            }

                            <div className='hidden sm:block'>{admin.name}</div>
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
                        <MenuItem onClick={handleHide} className='w-[200px] hover:bg-slate-400'>
                            <FontAwesomeIcon icon={faGear} className='me-4 ' />
                            Tài khoản
                        </MenuItem>
                        <MenuItem onClick={handleLogOut} className='w-[200px] hover:bg-slate-400'>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-4' />
                            Đăng suất
                        </MenuItem>
                    </Menu>
                </div>


            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='transition-all'
            >
                <Box className='h-screen w-[35vh] bg-white border-none transition-all'>
                    <SideBar />
                </Box>
            </Modal>

        </div>

    );
}

export default Header;