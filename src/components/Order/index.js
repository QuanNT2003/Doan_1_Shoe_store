import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input';
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
import * as PromotionCartServices from '~/apiServices/promotionCartServices'
import * as OrderServices from '~/apiServices/orderServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function Order({
    listBuy,
    deleteCart
}) {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    //USER
    const [user, setUser] = useState()
    // NAME
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');
    // email
    const [phone, setPhone] = useState('');
    const onChangePhone = (value) => {
        setPhone(value);
        setErrorPhone('')
    };
    const [errorPhone, setErrorPhone] = useState('');
    // address
    const [address, setAddress] = useState('');

    const onChangeAddress = (value) => {
        setAddress(value);
        setErrorAddress('')
    };
    const [errorAddress, setErrorAddress] = useState('');

    //list Voucher
    const [listShip, setListShip] = useState([])
    const [listSale, setListSale] = useState([])
    const [listPay, setListPay] = useState([])

    //voucher
    const [voucherSale, setVoucherSale] = useState()
    const [voucherShip, setVoucherShip] = useState()
    const [voucherPayment, setVoucherPayment] = useState()

    const [voucherSaleText, setVoucherSaleText] = useState('Không có')
    const [voucherShipText, setVoucherShipText] = useState('Không có')
    const [voucherPaymentText, setVoucherPaymentText] = useState('Không có')

    const [indexApply, setIndexApply] = useState()

    const editVoucherSale = (value, apply) => {
        setVoucherSale(value.discount)
        setVoucherSaleText(value.discount.name)
        setIndexApply(apply)
        let cost = 0
        listBuy.map((item, index) => {
            if (index === apply)
                cost += (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity

        })
        console.log(cost)
        if (value.typeDiscount === true) cost = cost * value.discount.value / 100
        else cost = value.discount.value

        setCostSale(cost)
    }

    const editVoucherShip = (value, apply) => {
        setVoucherShip(value.discount)
        setVoucherShipText(value.discount.name)

        let cost = 0
        if (value.discount.typeDiscount === true) cost = ship * value.discount.value / 100
        else cost = value.discount.value

        setCostShip(cost)
    }

    const editVoucherPay = (value, apply) => {
        setVoucherPayment(value.discount)
        setVoucherPaymentText(value.discount.name)

        let cost = 0
        if (value.discount.typeDiscount === true) cost = (subTotal + ship - costSale - costPay - costShip) * value.discount.value / 100
        else cost = value.discount.value

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
    const [paymentType, setPaymentType] = useState('cod')


    useEffect(() => {
        const fetchApi = async () => {
            let newSubTotal = 0
            listBuy.map(item => {
                newSubTotal += item.total
            })
            setUser(JSON.parse(window.localStorage.getItem('user')))
            setAddress(JSON.parse(window.localStorage.getItem('user')).address || '')
            setEmail(JSON.parse(window.localStorage.getItem('user')).email)
            setPhone(JSON.parse(window.localStorage.getItem('user')).phone)
            setSubTotal(newSubTotal)
            setShip(100000)
            setTotal(newSubTotal + 100000)

            const result = await PromotionCartServices.getAllCarts({ user: JSON.parse(window.localStorage.getItem('user'))._id })
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setListPay(result.pay)
                setListSale(result.sale)
                setListShip(result.ship)
            }
        }

        fetchApi();



    }, []);

    const submit = async () => {
        if (email === '') {
            setErrorEmail('Không được để trống')
        }
        else if (phone === '') {
            setErrorPhone('Không được để trống')
        }
        else if (address === '') {
            setErrorAddress('Không được để trống')
        }
        else {
            const fetchApi = async () => {
                setLoading(true)
                const obj = {
                    user: user,
                    note: '',
                    address: address,
                    phone: phone,
                    email: email,
                    item: listBuy,
                    saleOff: {
                        voucherSaleOff: voucherSale,
                        totalSaleOff: costSale
                    },
                    ship: {
                        shipCost: ship,
                        voucherShip: voucherShip,
                        shipTotal: ship - costShip
                    },
                    payment: {
                        subTotal: subTotal + ship - costSale - costShip,
                        voucherPayment: voucherPayment,
                        paymentTotal: costPay,
                        total: subTotal + ship - costSale - costShip - costPay,
                        paymentType: paymentType,
                        paid: 0,
                        remain: subTotal + ship - costSale - costShip - costPay
                    },
                    status: 'receiving'
                }

                console.log(obj)
                const result = await OrderServices.CreateOrder(obj)
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (result) {
                    setLoading(false);
                    console.log(result)
                    if (deleteCart) deleteCart()
                    toastContext.notify('success', 'Đã đặt hàng');
                    navigate('/order_colection/detail/' + result.data.orderId);
                }


            }

            fetchApi();
        }
    }
    return (
        <div>
            <div className='md:grid md:grid-cols-2 gap-4'>
                <Input
                    title={'Số điện thoại'}
                    required
                    className='my-5'
                    value={phone}
                    error={errorPhone}
                    onChange={onChangePhone}

                />
                <Input
                    title={'Email'}
                    required
                    className='my-5'
                    value={email}
                    error={errorEmail}
                    onChange={onChangeEmail}

                />
            </div>
            <Input
                title={'Địa chỉ'}
                required
                textarea
                className='my-5'
                value={address}
                error={errorAddress}
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
                                        <img src={item.product.images[0].url} className='md:w-[100px] md:h-[100px] w-[80px]' />
                                    </div>
                                    <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                                        <div className='font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                            {item.product.name}
                                        </div>
                                        <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                            {item.version.color.name}, Size : {item.version.size.name}
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
                                    indexApply === undefined ? (<ApplyVoucher title={'Voucher giảm giá'} listVoucher={listSale.filter(voucher => voucher.discount.apply < (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity)} setVoucher={editVoucherSale} text={voucherSaleText} index={index} setIndex={setIndexApply} deleteVoucher={deleteVoucherSale} />)
                                        :
                                        (
                                            indexApply === index ? (<ApplyVoucher title={'Voucher giảm giá'} listVoucher={listSale.filter(voucher => voucher.discount.apply < (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity)} setVoucher={editVoucherSale} text={voucherSaleText} index={index} setIndex={setIndexApply} deleteVoucher={deleteVoucherSale} />) : (
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
                <ApplyVoucher title={'Voucher vận chuyển'} listVoucher={listShip} setVoucher={editVoucherShip} text={voucherShipText} deleteVoucher={deleteVoucherShip} />

                {
                    paymentType !== 'cod' ? <ApplyVoucher title={'Voucher thanh toán'} listVoucher={listPay} setVoucher={editVoucherPay} text={voucherPaymentText} deleteVoucher={deleteVoucherPay} />
                        : (<div> </div>)
                }


            </div>
            <div className='p-3 mt-3'>
                <div className='mt-4 font-semibold'>Phương thức thanh toán</div>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="cod"
                        name="radio-buttons-group"
                        className='p-2'
                        onChange={(e) => {
                            setPaymentType(e.target.value)

                        }}
                    >
                        <FormControlLabel value='cod' control={<Radio />} label='Thanh toán khi nhận hàng' />
                        <FormControlLabel value='paypal' control={<Radio />} label={
                            <div className='flex justify-center items-center'>
                                <div className='me-3'>Thanh toán paypal</div>
                                <FontAwesomeIcon icon={faCcPaypal} className='me-3 h-[40px] text-cyan-600' />

                            </div>}
                        />
                        <FormControlLabel value='vnpay' control={<Radio />} label={
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

                <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submit()}>
                    Đặt hàng
                </button>
            </div>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default Order;