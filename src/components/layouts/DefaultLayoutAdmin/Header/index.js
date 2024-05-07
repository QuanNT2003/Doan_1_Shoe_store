import React, { useState } from 'react';
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

function Header({ title, back }) {

    const navigate = useNavigate();

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
                            <Avatar alt="Remy Sharp" src={example} />

                            <div className='hidden sm:block'>Ngô Trung Quân</div>
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
                        <MenuItem onClick={handleHide} className='w-[200px] hover:bg-slate-400'>
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