import React, { useState } from 'react';

function SelectVersion({
    list,
    title,
    onclick,
}) {
    const [select, setSelect] = useState('')
    const handleClick = (item) => {
        setSelect(item.name)
        onclick(item.value)
    }
    return (
        <div className='flex mt-5 items-center text-gray-500'>
            <div className='w-[140px] flex flex-col justify-center'>
                <div>
                    {title}
                </div>
                <div className='font-bold h-[30px] text-black'>
                    {select}
                </div>
            </div>
            <div className='w-[15px]'>
                :
            </div>
            <div className='flex flex-wrap'>
                {list.map((item, index) => (
                    <div key={index} className={item.name === select ?
                        "bg-white min-w-[60px] p-2 border-[2px] mx-1 my-1 text-center cursor-pointer select-none rounded-lg border-sky-600 transition-all" :
                        "bg-stone-300 min-w-[60px] p-2 border-[2px] mx-1 my-1 text-center cursor-pointer select-none rounded-lg transition-all"} onClick={() => handleClick(item)}>{item.name}</div>
                ))}
            </div>
        </div>
    );
}

export default SelectVersion;