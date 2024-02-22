import { memo, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function DateRange({ title, dateString, setDateString, bottom, future }) {
    const [range, setRange] = useState({});

    const handleDateString = (range) => {
        setRange(range);
        if (range?.from) {
            if (!range.to) {
                setDateString(format(range.from, 'dd/MM/yyyy'));
            } else if (range.to) {
                setDateString(
                    `${format(range.from, 'dd/MM/yyyy')} – ${format(
                        range.to,
                        'dd/MM/yyyy',
                    )}`,
                );
            }
        }
    };

    // Popper visible
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const props = {
        toDate: new Date(),
    }

    if (future) {
        const currentTime = new Date();
        props.toYear = currentTime.getFullYear() + 10;
        delete props.toDate;
        // console.log(props);
    }

    return (

        <div className='w-[85%] mt-[5px] mb-5'>
            <div className='font-medium text-[14px] mb-[2px]'>{title}</div>
            <Tippy
                visible={visible}
                interactive={true}
                onClickOutside={hide}
                placement={bottom ? 'bottom' : 'left'}
                render={(attrs) => (
                    <div className='bg-white shadow-daterange rounded-2xl w-[100%] p-[5px] text-[14px]'>
                        <div
                            tabIndex="-1"
                            {...attrs}
                        >
                            <DayPicker
                                locale={vi}
                                mode="range"
                                selected={range}
                                onSelect={handleDateString}
                                captionLayout="dropdown-buttons"
                                fromYear={1800}
                                showOutsideDays
                                {...props}
                                modifiersClassNames={{
                                    selected: 'text-white bg-blue-700 hover:border-gba128 hover:text-black',
                                }}
                            />
                        </div>
                    </div>
                )}
            >
                <div
                    className='text-[14px] border-solid border-[1px] border-[--border-color] rounded-[5px] p-[10px] text-[--border-color] flex justify-center items-center bg-white hover:cursor-pointer hover:border-gba128'
                    onClick={visible ? hide : show}
                >
                    <input
                        className='flex-[1] border-none outline-none h-[100%] text-[14px] cursor-pointer text-black'
                        readOnly
                        value={dateString}
                    />
                    <FontAwesomeIcon
                        className='text-[16px] text-rgba128'
                        icon={faCalendarDays}
                    />
                </div>
            </Tippy>
        </div>
    );
}

export default memo(DateRange);
