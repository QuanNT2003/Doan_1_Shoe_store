import { Modal, Box, Fade } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 900,
    minWidth: 360,
    maxHeight: '90vh',
    bgcolor: 'white',
    border: 'none',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    boxShadow: '0px 10px 13px 0px rgba(17, 38, 146, 0.05)',
    overFlow: 'auto',
};

function ModalComp({ open, handleClose, children, actionComponent, title }) {
    return (
        <Modal open={open}>
            <Fade in={open}>
                <Box sx={style}>
                    <div className='md:w-[700px] lg:w-[900px] overflow-auto'>
                        <div className='flex justify-between items-center my-[5px] mr-[10px] ml-[20px]'>
                            <div className='text-[20px] font-semibold leading-[0]'>{title}</div>
                            <div
                                onClick={handleClose}
                                className='py-[15px] px-[19px] rounded-[100%] bg-white flex justify-center items-center hover:bg-[#ffffff] cursor-pointer group'
                            >
                                <FontAwesomeIcon
                                    className='text-[--border-color] text-[16px] group-hover:text-[#faa8a8]'
                                    icon={faXmark}
                                />
                            </div>
                        </div>
                        <hr className='h-[5px] text-black m-0' />
                        <div className='pt-[10px] px-[20px] pb-[20px]'>{children}</div>
                        <hr className='h-[5px] text-black m-0' />
                        {actionComponent && (
                            <div className='flex justify-end py-[13px] px-[20px]'>
                                {actionComponent}
                            </div>
                        )}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ModalComp;
