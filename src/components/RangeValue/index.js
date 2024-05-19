import React from 'react';
import Slider from '@mui/material/Slider';
function valuetext(value) {
    return addCommas(value) + 'đ';
}
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
function RangeValue({
    placeholder,
    value,
    handleChange,
}) {
    return (
        <div className='text-sm bg-white mb-5  overflow-hidden'>
            <div className='font-medium mb-[6px] text-sm'>{placeholder}</div>
            <div className='pe-8 ps-4'>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={value}
                    min={0}
                    max={20000000}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap
                    getAriaValueText={valuetext}
                />
            </div>

        </div>
    );
}

export default RangeValue