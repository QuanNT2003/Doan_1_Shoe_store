import React from 'react';
import { useEffect, useState } from 'react';
function ImportItem({
    item,
    total
}) {
    const [obj, setObj] = useState();
    useEffect(() => {
        setObj(item)
    }, []);

    const ChangreNums = (value) => {
        let newObj = obj;
        newObj['quantity'] = parseInt(value);
        setObj(newObj)
        total()
    }
    return (
        <div className='flex min-w-[100%] w-fit h-[80px] border-b-[1px] border-t-[1px]'>
            <div className='min-w-[400px] flex justify-center items-center text-blue-600'>
                {item.version.versionId}
            </div>
            <div className='min-w-[300px] flex justify-center items-center'>
                {item.version.color.name} - size : {item.version.size.name}
            </div>
            <div className='min-w-[300px] flex justify-center items-center'>
                <input className='w-[50%] p-2 border-b-[1px] text-center' type="number" defaultValue={0} min={0} max={1000} onChange={(e) => {
                    if (e.target.value > 1000) e.target.value = 1000;
                    else if (e.target.value < 0 || e.target.value === '') e.target.value = 0;

                    ChangreNums(e.target.value)
                }} inputMode='numeric' />
            </div>
        </div>
    );
}

export default ImportItem;