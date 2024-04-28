import React, { useContext, useEffect, useState } from 'react';
import Input from '~/components/Input';
import SelectAutocomplete from '~/components/Autocomplete';
import DateRange from '~/components/DateRange';
import * as PromotionsServices from '~/apiServices/promotionServices';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import { ConvertISO } from '~/components/ConvertISO';
import format from 'date-fns/format'
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');

const options = ['Sale off', 'Giảm phí vận chuyển', 'Thanh toán']

function UpdatePromotion() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    const promotionId = useParams();
    const [obj, setObj] = useState(null);

    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [errorName, setErrorName] = useState('');
    const [typediscount, setType] = useState(true)
    const [discount, setDiscount] = useState(0)
    const [apply, setApply] = useState(0)
    const [stype, setStype] = useState('')
    const [stypelabel, setStypelabel] = useState(null)
    const [dateString, setDateString] = useState('');

    const changeStype = (e) => {
        setStypelabel(e)
        if (e === 'Sale off') setStype('sale')
        else if (e === 'Thanh toán') setStype('pay')
        else setStype('ship')
    }

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await PromotionsServices.getPromotion(promotionId.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
                setDateString(format(new Date(result.data.startDay), 'dd/MM/yyyy') + " – " + format(new Date(result.data.endDay), 'dd/MM/yyyy'));
                setName(result.data.name);
                setNote(result.data.note);
                setType(result.data.typeDiscount)
                setDiscount(result.data.value)
                setApply(result.data.apply)
                setStype(result.data.classify)
                if (result.data.classify === 'ship') setStypelabel('Giảm phí vận chuyển')
                else if (result.data.classify === 'pay') setStypelabel('Thanh toán')
                else setStypelabel('Sale off')
            }
        }

        fetchApi();
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = () => {
        if (name === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa nhập tên');
        } else if (dateString === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa chọn ngày');
        } else if (parseInt(discount) === 0 || discount === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa chọn phần trăm chiết khấu');
        } else {
            setLoading(true);

            let isSuccess = true;

            const fetchApi = async () => {

                const newObj = {
                    ...obj,
                    name: name,
                    classify: stype,
                    typeDiscount: typediscount,
                    value: removeNonNumeric(discount),
                    apply: removeNonNumeric(apply),
                    status: true,
                    note: note,
                    startDay: ConvertISO(dateString).startDate,
                    endDay: ConvertISO(dateString).endDate,
                }

                console.log(newObj);

                const result = await PromotionsServices.UpdatePromotion(promotionId.id, newObj)
                    .catch((err) => {
                        console.log(err);
                        isSuccess = false;
                        setLoading(false);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (isSuccess) {
                    setLoading(false);
                    toastContext.notify('success', 'Cập nhật khuyến mãi thành công');
                    navigate('/promotions/details/' + result.data.discountId);
                }
            }

            fetchApi();
        }
    }
    return (
        <div>
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
                            rows={8}
                        ></Input>
                    </div>
                </div>
                <div className='frame'>
                    Loại khuyến mãi
                    <hr />
                    <div className='mt-6 mb-7'>
                        <SelectAutocomplete onChange={changeStype} options={options} value={stypelabel} />
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
                        <input className='border-custom number-nospin rounded w-[85%] ms-3 me-5 py-2 px-[10px] text-end'
                            value={typediscount ? discount : addCommas(removeNonNumeric(discount))}
                            onChange={(e) => {
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
                        <div className=' min-w-[30px] flex justify-center items-center'>
                            {
                                typediscount === true ? '%' : 'VND'
                            }
                        </div>

                    </div>

                    <div className='flex'>
                        <Input
                            title={'Áp dụng từ'}
                            value={addCommas(apply)}
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
            <div className='w-[90%] mx-auto text-end'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submit()}>
                    Lưu
                </button>
            </div>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div >
    );
}

export default UpdatePromotion;