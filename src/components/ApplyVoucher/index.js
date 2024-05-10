import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight,
    faXmark,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
import { Modal, Box, Fade } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
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

function ApplyVoucher({
    title,
    listVoucher,
    setVoucher,
    text,
    index,
    deleteVoucher
}) {
    const [open, setOpen] = useState(false)

    const setVoucherLocal = (value) => {
        setVoucher(listVoucher.find(item => item.discountId === value), index)
        // setIndex(index)
        setOpen(false)
    }

    return (
        <div className='flex items-center justify-between p-2 py-4 border rounded-lg  mx-2 my-2 select-none '>
            <div className='flex items-center'>
                <div>
                    {title} :
                </div>
                <div className='ms-3'>
                    {
                        text
                    }
                </div>
            </div>
            <div className='flex items-center'>
                {
                    text === 'Không có' ? <FontAwesomeIcon icon={faAngleRight} className='ssm:me-4 h-[20px] cursor-pointer' onClick={() => setOpen(true)} /> :
                        <FontAwesomeIcon icon={faCircleXmark} className='ssm:me-4 h-[20px] cursor-pointer' onClick={() => deleteVoucher()} />
                }


            </div>
            <Modal open={open}>
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='md:w-[500px] overflow-auto'>
                            <div className='flex justify-between items-center my-[5px] mr-[10px] ml-[20px]'>
                                <div className='text-[20px] font-semibold leading-[0]'>Lựa chọn voucher</div>
                                <div
                                    onClick={() => setOpen(false)}
                                    className='py-[15px] px-[19px] rounded-[100%] bg-white flex justify-center items-center hover:bg-[#ffffff] cursor-pointer group'
                                >
                                    <FontAwesomeIcon
                                        className='text-[--border-color] text-[16px] group-hover:text-[#faa8a8]'
                                        icon={faXmark}
                                    />
                                </div>
                            </div>
                            <hr className='h-[5px] text-black m-0' />
                            <div className='p-3'>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        className='p-2'
                                        onChange={(e) => {
                                            setVoucherLocal(e.target.value)
                                        }}
                                    >
                                        {
                                            listVoucher.map((item, index) => (
                                                <div key={index}>
                                                    <FormControlLabel value={item.discountId} control={<Radio />} label={item.name} />
                                                </div>

                                            ))
                                        }


                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ApplyVoucher;