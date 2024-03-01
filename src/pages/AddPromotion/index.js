import React, { useState } from 'react';
import Input from '~/components/Input';
import SelectAutocomplete from '~/components/Autocomplete';
import DateRange from '~/components/DateRange';
import Button from '@mui/material/Button';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');

const options = [
    {
        label: 'Sale off',
        value: 'sale'
    },
    {
        label: 'Giảm phí vận chuyển',
        value: 'ship'
    },
    {
        label: 'Thanh toán',
        value: 'pay'
    }
]

function AddPromotion() {

    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [errorName, setErrorName] = useState('');
    const [typediscount, setType] = useState(true)
    const [discount, setDiscount] = useState(0)
    const [apply, setApply] = useState(0)
    const [stype, setStype] = useState('')
    const [dateString, setDateString] = useState('');
    return (
        <div className='container'>
            <div className='mt-6 md:grid md:grid-cols-2'>
                <div className='frame'>
                    Thông tin chung
                    <hr />
                    <div className=' mt-2'>
                        <Input
                            title={'Tên khuyến mãi'}
                            required
                            value={name}
                            onChange={(value) => setName(value)}
                            className='mb-[20px]'
                            error={errorName}
                        ></Input>
                    </div>
                    <div className=' mt-2'>
                        <Input
                            title={'Mô tả'}
                            value={note}
                            textarea={true}
                            onChange={(value) => setNote(value)}
                            className='mb-[20px]'
                            error={errorName}
                        ></Input>
                    </div>
                </div>
                <div className='frame'>
                    Loại khuyến mãi
                    <hr />
                    <div className='mt-6 mb-7'>
                        <SelectAutocomplete onChange={setStype} options={options} />
                    </div>
                    Thời gian áp dụng
                    <hr />
                    <div className='mt-4'>
                        <DateRange
                            dateString={dateString}
                            setDateString={setDateString}
                            bottom
                            future
                        />
                    </div>

                </div>
                <div className='frame'>
                    Giá trị chiết khấu
                    <hr />
                    <div className='flex mt-5'>
                        <button className={typediscount ? 'bg-[#0088ff] text-white py-1 px-2 w-[100px] rounded-lg border-custom text-[12px]' : 'bg-white py-1 px-2 w-[100px] rounded-lg border-custom text-[12px]'} onClick={() => {
                            setType(true)
                            setDiscount(0)
                        }}>%</button>
                        <button className={typediscount ? 'bg-white py-1 px-2 w-[100px] rounded-lg border-custom text-[12px]' : 'bg-[#0088ff] text-white py-1 px-2 w-[100px] rounded-lg border-custom text-[12px]'} onClick={() => {
                            setType(false)
                            setDiscount(0)
                        }}>Giá trị</button>
                        <input className='border-custom number-nospin rounded w-[85%] ms-3 me-5 py-2 px-[10px] text-end' value={discount} onChange={(e) => {
                            let value = removeNonNumeric(e.target.value);
                            if (typediscount === true) {
                                if (value > 100) e.target.value = 100;
                                else if (value < 0) e.target.value = 0;
                            }

                            if (e.target.value === '') e.target.value = 0;
                            if (typediscount === false) e.target.value = addCommas(
                                removeNonNumeric(
                                    e.target.value,
                                ),
                            )

                            setDiscount(e.target.value);
                        }} inputMode='numeric' />
                        <div className=' min-w-[30px]'>
                            {
                                typediscount === true ? '%' : 'VND'
                            }
                        </div>

                    </div>

                    <div className='flex'>
                        <Input
                            title={'Áp dụng từ'}
                            value={apply}
                            onChange={(value) => setApply(addCommas(
                                removeNonNumeric(
                                    value,
                                ),
                            ))}
                            className='my-[20px]'
                            error={errorName}
                        ></Input>
                    </div>

                </div>

            </div>
            <div className='frame text-end'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer'>
                    Lưu
                </button>
            </div>
        </div >
    );
}

export default AddPromotion;