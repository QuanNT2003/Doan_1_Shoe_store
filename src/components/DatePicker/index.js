import { useState } from 'react';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { vi } from 'date-fns/locale';
import { FaCalendarAlt } from 'react-icons/fa';

function DatePicker() {
    const [show, setShow] = useState(false);

    const [date, setDate] = useState('');

    const [dateString, setDateString] = useState('');

    const handleDateString = (date) => {
        setDate(date);
        setDateString(format(date, 'dd/MM/yyyy'));
        setShow(false);
    };

    return (
        <div className='h-[100%] w-[100%]'>
            <div className='h-[45px] w-[100%] flex items-center justify-end' onClick={(e) => setShow(!show)}>
                <input type="text" className='w-[100%] h-[100%] text-[14px] rounded border-[1px] border-solid border-[#cdcdcd] bg-[#fff] indent-[10px] outline-none' readOnly value={dateString}></input>

                <FaCalendarAlt className='text-[#366577] h-6 w-6 absolute mr-[10px] cursor-pointer'></FaCalendarAlt>


            </div>
            {show && (
                <DayPicker
                    locale={vi}
                    mode="single"
                    fromYear={1900}
                    selected={date}
                    onSelect={handleDateString}
                    className='w-fit bg-[#fff] text-base z-[5] absolute mt-0 h-fit rounded-[5px] shadow-datepicker'
                    modifiersClassNames={{
                        selected: 'bg-[#366577] text-white',
                    }}
                ></DayPicker>
            )}
        </div>
    );
}

export default DatePicker;
