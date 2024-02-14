import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';



function ActionDropdown({ items, onClickAction }) {
    // Popper visible
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <div className='select-none'>
            <Tippy
                visible={visible}
                interactive={true}
                onClickOutside={hide}
                placement="bottom"
                zIndex={2}
                render={(attrs) => (
                    <div
                        tabIndex="-1"
                        {...attrs}
                    >
                        <div className='bg-white px-[3px] py-0 rounded-[5px] font-inter font-normal shadow-table w-[100%] border-[1px] border-solid border-black'>
                            <ul className='max-h-[150px] w-[100%] m-0 py-0 px-[5px] overflow-x-hidden overflow-y-auto '>
                                {items?.map((item, index) => (
                                    <li
                                        key={index}
                                        className='list-none cursor-pointer rounded-[3px] py-[7px] px-[15px] hover:bg-slate-100 w-[160px]'
                                        onClick={() => onClickAction(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            >
                <div
                    className='select-none'
                    onClick={visible ? hide : show}
                >
                    <div
                        className={visible ? 'border-[--primary] flex justify-center items-center border-[1px] border-solid border-black rounded-[5px] py-2 px-[15px] hover:cursor-pointer hover:border-[--primary]' : 'flex justify-center items-center border-[1px] border-solid border-black rounded-[5px] py-2 px-[15px] hover:cursor-pointer hover:border-[--primary]'}
                    >
                        <div className='mr-[15px] text-base font-normal'>Chọn thao tác</div>
                        <FontAwesomeIcon
                            className={visible ? 'text-[--primary] rotate-180' : 'text-black'}

                            icon={faCaretUp}
                        />
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default ActionDropdown;
