import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faMinus,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function ShoppingCartItem({
    cartItem,
    deleteList,
    index
}) {
    const [quantity, setQuantity] = useState(0)
    const [choose, setChoose] = useState(false)
    const [obj, setObj] = useState();

    useEffect(() => {
        setObj(cartItem)
        setChoose(cartItem.choose)
        setQuantity(cartItem.quantity)
    }, [obj, cartItem]);

    const ChangreNums = (value) => {
        let newObj = obj;
        setQuantity(value)
        newObj['quantity'] = value;
        setObj(newObj)
    }

    const ChangreChoose = (value) => {
        let newObj = obj;
        setChoose(value)
        newObj['choose'] = value;
        setObj(newObj)
    }
    return (
        <div className='bg-white m-5 mb-2 p-3 rounded-lg flex select-none'>
            <div className='flex items-center'>
                <Checkbox className='md:w-[40px] md:h-[40px] w-[10px] h-[10px]' value={choose} onChange={(e) => {
                    ChangreChoose(e.target.checked)
                }} />
            </div>
            <div className='justify-center md:w-[150px] min-w-[50px] flex items-center'>
                <img src={cartItem.product.images[0].url} className='md:w-[100px] md:h-[100px] w-[50px] h-[50px]' />
            </div>
            <div className='ms-4 cursor-pointer w-[50%]'>
                <div className='md:text-[17px] text-[14px] font-bold text-wrap mb-3  line-clamp-2 text-ellipsis '>
                    {cartItem.product.name}
                </div>
                <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                    {cartItem.version.color.name} - Size {cartItem.version.size.name}
                </div>
                <div>
                    {
                        cartItem.version.inStock < 10 ? (<div className='flex justify-center mt-5 text-[17px] font-semibold'>Còn {cartItem.version?.inStock} sản phẩm </div>) : (<div> </div>)
                    }
                </div>
            </div>
            <div className='lg:w-[180px] ssm:w-[150px] w-[100px] text-center ms-5 flex flex-col'>
                <div className='text-red-500 md:text-[17px] text-[14px] font-medium mb-5'>
                    đ {addCommas(cartItem.product.price - (cartItem.product.discount / 100) * cartItem.product.price)}
                </div>
                <div className='flex md:hidden mb-5'>
                    <div className='md:w-[30px] md:h-[30px] w-[25px] h-[20px] flex justify-center items-center bg-stone-300 text-gray-500 rounded ssm:mx-3 cursor-pointer'
                        onClick={() => {
                            if (quantity > 1) {
                                ChangreNums(quantity - 1)
                            }
                        }}>
                        <div className={quantity <= 1 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    </div>
                    <input className='border-custom number-nospin rounded md:h-[30px] md:w-[50px] w-[35px] h-[20px] py-1 px-[10px] text-[14px] text-center hover:border-blue-500'
                        value={quantity}
                        onChange={(e) => {
                            let value = removeNonNumeric(e.target.value);

                            if (value < 1) e.target.value = 1;
                            else if (value > 10) e.target.value = 10;
                            if (value === '') e.target.value = 1;

                            ChangreNums(e.target.value)
                        }} type='number' />
                    <div className='md:w-[30px] md:h-[30px] w-[25px] h-[20px] flex justify-center items-center bg-stone-300 text-gray-500 rounded ssm:mx-3 cursor-pointer'
                        onClick={() => {
                            if (quantity < 10) {
                                ChangreNums(quantity + 1)
                            }
                        }}>
                        <div className={quantity >= 10 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faTrash} className='md:h-[20px] h-[14px] cursor-pointer hover:scale-125 transition-all' onClick={() => deleteList(cartItem)} />
                </div>

            </div>
            <div className='md:flex hidden'>
                <div className='md:w-[30px] md:h-[30px] w-[25px] h-[20px] flex justify-center items-center bg-stone-300 text-gray-500 rounded mx-3 cursor-pointer'
                    onClick={() => {
                        if (quantity > 1) {
                            ChangreNums(quantity - 1)
                        }
                    }}>
                    <div className={quantity <= 1 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                        <FontAwesomeIcon icon={faMinus} />
                    </div>
                </div>
                <input className='border-custom number-nospin rounded md:h-[30px] md:w-[50px] w-[35px] h-[20px] py-1 px-[10px] text-[14px] text-center hover:border-blue-500'
                    value={quantity}
                    onChange={(e) => {
                        let value = removeNonNumeric(e.target.value);

                        if (value < 1) e.target.value = 1;
                        else if (value > 10) e.target.value = 10;
                        if (value === '') e.target.value = 1;

                        ChangreNums(e.target.value)
                    }} type='number' />
                <div className='md:w-[30px] md:h-[30px] w-[25px] h-[20px] flex justify-center items-center bg-stone-300 text-gray-500 rounded mx-3 cursor-pointer'
                    onClick={() => {
                        if (quantity < 10) {
                            ChangreNums(quantity + 1)
                        }
                    }}>
                    <div className={quantity >= 10 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartItem;

