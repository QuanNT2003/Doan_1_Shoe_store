import React from 'react';

function ColorPicker({
    title,
    handleChangeColor,
    error,
    errorName,
    required
}) {
    return (
        <div>
            <div className='h-[20px]'>
                {required && <span className='text-red-500'> *</span>}
            </div>

            <input className={error ? 'border-red-500 border-[1px] border-solid rounded' : ''} type='color' defaultValue={'#ffffff'} onChange={(e) => handleChangeColor(e.target.value)} />
            <div className=' text-red-500'>{errorName}</div>
        </div>
    );
}

export default ColorPicker;