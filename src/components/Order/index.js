import React, { useEffect, useState } from 'react';
import Input from '~/components/Input';
import logo from '../../assets/images/logo.png'
import ApplyVoucher from '../ApplyVoucher';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCcPaypal
} from '@fortawesome/free-brands-svg-icons';
import {
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const list = [
    {
        _id: "6637101f32427247464f8bed",
        name: "123",
        discountId: "ds00000004",
        classify: "sale",
        typeDiscount: false,
        value: 12000,
        apply: 450000,
        status: true,
        note: "",
        startDay: "2024-05-01T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-05-05T04:50:39.658Z",
        updatedAt: "2024-05-05T04:50:39.658Z",
        __v: 0
    },
    {
        _id: "66370feb32427247464f8be6",
        name: "123",
        discountId: "ds00000003",
        classify: "ship",
        typeDiscount: true,
        value: 3,
        apply: 160000,
        status: true,
        note: "123",
        startDay: "2024-04-29T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-05-05T04:49:47.757Z",
        updatedAt: "2024-05-05T04:49:47.757Z",
        __v: 0
    },
    {
        _id: "6630da1c8e8aae4231f85d71",
        name: "234",
        discountId: "ds00000002",
        classify: "pay",
        typeDiscount: true,
        value: 10,
        apply: 200000,
        status: true,
        note: "234",
        startDay: "2024-04-30T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-04-30T11:46:36.632Z",
        updatedAt: "2024-04-30T11:46:36.632Z",
        __v: 0
    },
    {
        _id: "6630d9f58e8aae4231f85d6c",
        name: "123",
        discountId: "ds00000001",
        classify: "ship",
        typeDiscount: true,
        value: 3,
        apply: 150000,
        status: true,
        note: "123",
        startDay: "2024-04-30T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-04-30T11:45:57.070Z",
        updatedAt: "2024-04-30T11:45:57.070Z",
        __v: 0
    }
]

function Order({
    listBuy
}) {
    // NAME
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
    };
    // email
    const [phone, setPhone] = useState('');
    const onChangePhone = (value) => {
        setPhone(value);
    };
    // address
    const [address, setAddress] = useState('');
    const onChangeAddress = (value) => {
        setAddress(value);
    };


    //voucher
    const [voucherSale, setVoucherSale] = useState()
    const [voucherShip, setVoucherShip] = useState()
    const [voucherPayment, setVoucherPayment] = useState()

    const [voucherSaleText, setVoucherSaleText] = useState('Không có')
    const [voucherShipText, setVoucherShipText] = useState('Không có')
    const [voucherPaymentText, setVoucherPaymentText] = useState('Không có')

    const [indexApply, setIndexApply] = useState()

    const editVoucherSale = (value, apply) => {
        setVoucherSale(value)
        setVoucherSaleText(value.name)
        setIndexApply(apply)
        let cost = 0
        listBuy.map((item, index) => {
            if (index === apply)
                cost += (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity

        })
        console.log(cost)
        if (value.typeDiscount === true) cost = cost * value.value / 100
        else cost = value.value

        setCostSale(cost)
    }

    const editVoucherShip = (value, apply) => {
        setVoucherShip(value)
        setVoucherShipText(value.name)

        let cost = 0
        if (value.typeDiscount === true) cost = ship * value.value / 100
        else cost = value.value

        setCostShip(cost)
    }

    const editVoucherPay = (value, apply) => {
        setVoucherPayment(value)
        setVoucherPaymentText(value.name)

        let cost = 0
        if (value.typeDiscount === true) cost = (subTotal + ship - costSale - costPay) * value.value / 100
        else cost = value.value

        setCostPay(cost)

    }

    const deleteVoucherSale = () => {
        setVoucherSale()
        setVoucherSaleText('Không có')
        setIndexApply()


        setCostSale(0)
    }

    const deleteVoucherShip = () => {
        setVoucherShip()
        setVoucherShipText('Không có')



        setCostShip(0)
    }

    const deleteVoucherPay = () => {
        setVoucherPayment()
        setVoucherPaymentText('Không có')

        setCostPay(0)

    }

    // Cost
    const [subTotal, setSubTotal] = useState(0)
    const [ship, setShip] = useState(0)
    const [costShip, setCostShip] = useState(0)
    const [costSale, setCostSale] = useState(0)
    const [costPay, setCostPay] = useState(0)
    const [total, setTotal] = useState(0)

    // Payment Type 
    const [paymentType, setPaymentType] = useState('123')


    useEffect(() => {
        let newSubTotal = 0
        listBuy.map(item => {
            newSubTotal += (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity
        })

        setSubTotal(newSubTotal)
        setShip(100000)
        setTotal(newSubTotal + 100000)
    }, []);

    // useEffect(() => {
    //     setTotal(subTotal + ship - costPay - costSale - costShip)
    // }, [costSale], [costPay], [costShip]);
    return (
        <div>
            <div className='md:grid md:grid-cols-2 gap-4'>
                <Input
                    title={'Số điện thoại'}
                    required
                    className='my-5'
                    value={phone}
                    onChange={onChangePhone}

                />
                <Input
                    title={'Email'}
                    required
                    className='my-5'
                    value={email}
                    onChange={onChangeEmail}

                />
            </div>
            <Input
                title={'Địa chỉ'}
                required
                textarea
                className='my-5'
                value={address}
                onChange={onChangeAddress}

            />
            <div>
                <div className='mt-4 font-semibold'>Danh sách sản phẩm</div>
                <div>
                    {
                        listBuy.map((item, index) => (
                            <div className=' mt-3 border rounded-md p-1' key={index}>
                                <div className='flex mb-2'>
                                    <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                                        <img src={logo} className='md:w-[100px] md:h-[100px] w-[80px]' />
                                    </div>
                                    <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                        <div className='font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                            {item.product.name}
                                        </div>
                                        <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                            {item.color.name}, Size : {item.size.name}
                                        </div>
                                        <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                            {addCommas((item.product.price - (item.product.discount / 100) * item.product.price))} đ  x {item.quantity}
                                        </div>

                                    </div>
                                    <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                        {addCommas((item.product.price - (item.product.discount / 100) * item.product.price))} đ
                                    </div>
                                    <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                                        x {item.quantity}
                                    </div>
                                </div>
                                {
                                    indexApply === undefined ? (<ApplyVoucher title={'Voucher giảm giá'} listVoucher={list.filter(voucher => voucher.apply < (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity)} setVoucher={editVoucherSale} text={voucherSaleText} index={index} setIndex={setIndexApply} deleteVoucher={deleteVoucherSale} />)
                                        :
                                        (
                                            indexApply === index ? (<ApplyVoucher title={'Voucher giảm giá'} listVoucher={list.filter(voucher => voucher.apply < (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity)} setVoucher={editVoucherSale} text={voucherSaleText} index={index} setIndex={setIndexApply} deleteVoucher={deleteVoucherSale} />) : (
                                                <div> </div>
                                            )
                                        )
                                }

                            </div>
                        ))
                    }

                </div>
            </div>
            <hr className='mt-3' />

            <div className='p-3 mt-3'>
                <div className='font-bold mb-4'>Tổng quan đơn hàng</div>
                <div className='flex mb-2'>
                    <div className='w-[50%]'>Tổng phí</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>{addCommas(subTotal)}đ</div>
                </div>
                <div className='flex mb-2'>
                    <div className='w-[50%]'>Vận chuyển</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>{addCommas(ship)} đ</div>
                </div>
                <div className='flex mb-2'>
                    <div className='w-[50%]'>Phiếu giảm giá đơn hàng</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>- {addCommas(costSale)}đ</div>
                </div>
                <div className='flex mb-2'>
                    <div className='w-[50%]'>Phiếu giảm phí vận chuyển</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>- {addCommas(costShip)}đ</div>
                </div>
                <div className='flex mb-2'>
                    <div className='w-[50%]'>Phiếu giảm phí than toán</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>- {addCommas(costPay)}đ</div>
                </div>
                <div className='flex mb-5 font-semibold'>
                    <div className='w-[50%]'>Tổng</div>
                    <div className='w-[10%]'>:</div>
                    <div className='w-[30%]'>{addCommas(subTotal + ship - costPay - costSale - costShip)}đ</div>
                </div>


            </div>
            <hr className='mt-3' />
            <div className='p-3 mt-3'>
                <div className='mt-4 font-semibold'>Voucher áp dụng</div>
                <ApplyVoucher title={'Voucher vận chuyển'} listVoucher={list} setVoucher={editVoucherShip} text={voucherShipText} deleteVoucher={deleteVoucherShip} />

                {
                    paymentType !== '123' ? <ApplyVoucher title={'Voucher thanh toán'} listVoucher={list} setVoucher={editVoucherPay} text={voucherPaymentText} deleteVoucher={deleteVoucherPay} />
                        : (<div> </div>)
                }


            </div>
            <div className='p-3 mt-3'>
                <div className='mt-4 font-semibold'>Phương thức thanh toán</div>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className='p-2'
                        onChange={(e) => {
                            setPaymentType(e.target.value)

                        }}
                    >
                        <FormControlLabel value='123' control={<Radio />} label='Than toán khi nhận hàng' />
                        <FormControlLabel value='234' control={<Radio />} label={
                            <div className='flex justify-center items-center'>
                                <div className='me-3'>Thanh toán paypal</div>
                                <FontAwesomeIcon icon={faCcPaypal} className='me-3 h-[40px] text-cyan-600' />

                            </div>}
                        />
                        <FormControlLabel value='234' control={<Radio />} label={
                            <div className='flex justify-center items-center'>
                                <div className='me-3'>Thanh toán VNPay</div>
                                <FontAwesomeIcon icon={faCreditCard} className='me-3 h-[40px] text-cyan-600' />

                            </div>}
                        />

                    </RadioGroup>
                </FormControl>
            </div>
            <hr className='mt-4' />
            <div className='p-3 mt-3 flex justify-end '>

                <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' >
                    Đặt hàng
                </button>
            </div>
        </div>
    );
}

export default Order;