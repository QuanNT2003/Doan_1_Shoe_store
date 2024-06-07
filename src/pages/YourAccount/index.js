import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import noImage from '~/assets/images/no-image.png';
import ModalLoading from '~/components/ModalLoading';
import Input from '~/components/Input';
import ModalComp from '~/components/ModalComp';
import * as UserServices from '~/apiServices/userServices';
import * as PromotionCartServices from '~/apiServices/promotionCartServices'
import { ToastContext } from '~/components/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faCartShopping,
    faMoneyBill
} from '@fortawesome/free-solid-svg-icons';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as ImageServices from '~/apiServices/imageServices';
function YourAccount() {
    const navigate = useNavigate();
    const [obj, setObj] = useState(null);
    const [loading, setLoading] = useState(false);
    const toastContext = useContext(ToastContext);
    const [updatePage, setUpdatePage] = useState(new Date());
    const [day, setDay] = useState(new Date());
    //Change Pass
    const [password, setPassword] = useState('')
    const [errorPass, setErrorPass] = useState('');
    const onChangePass = (value) => {
        setPassword(value);
        setErrorPass('')
    };
    const [newPassword, setNewPassword] = useState('')
    const [errorNewPass, setErrorNewPass] = useState('');
    const onChangeNewPass = (value) => {
        setNewPassword(value);
        setErrorNewPass('')
    };
    const [newPassword2, setNewPassword2] = useState('')
    const [errorNewPass2, setErrorNewPass2] = useState('');
    const onChangeNewPass2 = (value) => {
        setNewPassword2(value);
        setErrorNewPass2('')
    };
    const [openModalChanghePass, setOpenModalChanghePass] = useState(false);
    const handleCloseModalChanghePass = () => {
        setOpenModalChanghePass(false);
        setPassword('')
        setNewPassword('')
        setNewPassword2('')
    };

    const handleChangePass = async () => {
        if (password === '') {
            toastContext.notify('error', 'Chưa điền mật khẩu');
            setErrorPass('Không được để chống')
        }
        else if (newPassword === '') {
            toastContext.notify('error', 'Chưa điền mật khẩu');
            setErrorNewPass('Không được để chống')
        }
        else if (newPassword2 === '') {
            toastContext.notify('error', 'Chưa điền mật khẩu');
            setErrorNewPass2('Không được để chống')
        }
        else if (newPassword !== newPassword2) {
            toastContext.notify('error', 'Xác nhận mật khẩu không khớp');
            setErrorNewPass2('Mật khẩu không trùng khớp')
        }
        else if (password !== obj.password) {
            toastContext.notify('error', 'Mật khẩu chính xác');
            setErrorPass('Mật khẩu không chính xác')
        }
        else {
            setLoading(true);
            const fetchApi = async () => {
                let isSuccess = true;

                const newObj = {
                    ...obj,
                    password: newPassword
                }

                const result = await UserServices.UpdateUser(obj.userId, newObj)
                    .catch((err) => {
                        console.log(err);
                        isSuccess = false;
                        setLoading(false);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (isSuccess) {
                    setLoading(false);
                    toastContext.notify('success', 'Đã cập nhật mật khẩu');
                    handleCloseModalChanghePass()
                    setUpdatePage(new Date());
                }
            }

            fetchApi();
        }

    }

    //Voucher cart
    const [openModalVoucherCart, setOpenModalVoucherCart] = useState(false);
    const handleCloseModalCart = () => {
        setOpenModalVoucherCart(false)
    };

    const [voucherList, setVoucherList] = useState([])

    //Update user
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const handleOpenModalUpdate = () => {
        setImages(obj.images)
        setName(obj.name)
        setEmail(obj.email)
        setPhone(obj.phone)
        setAddress(obj.address ? obj.address : '')
        setOpenModalUpdate(true)

    }
    const handleCloseModalUpdate = () => {
        setImages([])
        setImagesDelete([])
        setFiles([])
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setOpenModalUpdate(false)
        setErrorAddress('')
        setErrorEmail('')
        setErrorName('')
        setErrorPhone('')
    };

    // URL IMAGE
    const [images, setImages] = useState([]);
    const [imagesDelete, setImagesDelete] = useState([])
    const [submitImage, setSubmit] = useState([])
    // IMAGES
    const [files, setFiles] = useState([]);

    const handleAddImages = (e) => {
        if (e.target.files.length + files.length < 2) {
            const arr = Array.from(e.target.files).map((file) => {

                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend = () => {
                    files.push(reader.result)
                    setUpdatePage(new Date())
                    // addImages(reader.result)

                }
            });
        }


        e.target.value = null;
    };
    const handleRemoveImage = (index) => {
        imagesDelete.push(images[index])
        images.splice(index, 1);
        setUpdatePage(new Date())


        // const a = images[index].split('/');
        // deleteImages(a[a.length - 1]);
    };

    const handleRemoveFile = (index) => {
        files.splice(index, 1);
        setUpdatePage(new Date())
    }
    // NAME
    const [name, setName] = useState('');
    const onChangeName = (value) => {
        setName(value);
        setErrorName('')
    };
    const [errorName, setErrorName] = useState('');

    // EMAIL
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');

    // PHONE
    const [phone, setPhone] = useState('');
    const onChangePhone = (value) => {
        setPhone(value);
        setErrorPhone('')
    };
    const [errorPhone, setErrorPhone] = useState('');

    // ADDRESS
    const [address, setAddress] = useState('');
    const onChangeAddress = (value) => {
        setAddress(value);
        setErrorAddress('')
    };
    const [errorAddress, setErrorAddress] = useState('');

    // CONFIRM PASS
    const [passConfirm, setPassConfirm] = useState('');
    const onChangePassConfirm = (value) => {
        setPassConfirm(value);
        setErrorPassConfirm('')
    };
    const [errorPassConfirm, setErrorPassConfirm] = useState('');
    const submitChangeInfo = async () => {
        if (name === '') {
            toastContext.notify('error', 'Chưa điền tên');
            setErrorName('Không được để chống')
        }
        else if (email === '') {
            toastContext.notify('error', 'Chưa điền email');
            setErrorEmail('Không được để chống')
        }
        else if (phone === '') {
            toastContext.notify('error', 'Chưa điền điện thoại');
            setErrorPhone('Không được để chống')
        }
        else if (address === '') {
            toastContext.notify('error', 'Chưa điền đại chỉ');
            setErrorAddress('Không được để chống')
        }
        else {
            setOpenModalConfirm(true)
        }

    }

    // Modal Confirm
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const handleCloseModalConfirm = () => {
        setOpenModalConfirm(false)
        setErrorPassConfirm('')
    };

    const updateUser = async () => {
        if (passConfirm === '') {
            toastContext.notify('error', 'Chưa nhập mật khẩu');
            setErrorPassConfirm('Không được để chống')
        }
        else if (passConfirm !== obj.password) {
            toastContext.notify('error', 'Mật khẩu không đúng');
            setErrorPassConfirm('Mật khẩu không đúng')
        }
        else {
            setLoading(true);
            const fetchApi = async () => {
                let isSuccess = true;
                if (images.length === 0) {
                    for (let image of imagesDelete) {
                        const obj = {
                            publicId: image.publicId
                        }


                        const result = await ImageServices.DeleteImage(obj)
                            .catch((err) => {
                                console.log(err);
                            });
                        if (result) console.log(result)
                    }
                    const image = {
                        images: files
                    }
                    const resultImage = await ImageServices.AddImages(image)
                        .catch((error) => {
                            console.log(error);
                            toastContext.notify('error', 'Có lỗi xảy ra');
                        });

                    if (resultImage) {
                        for (let image of resultImage.data) {
                            submitImage.push(image)
                        }
                        const newObj = {
                            ...obj,
                            name: name,
                            email: email,
                            phone: phone,
                            address: address,
                            images: submitImage,
                        }

                        const result = await UserServices.UpdateUser(obj.userId, newObj)
                            .catch((err) => {
                                console.log(err);
                                isSuccess = false;
                                setLoading(false);
                                toastContext.notify('error', 'Có lỗi xảy ra');
                            });

                        if (isSuccess) {
                            setLoading(false);
                            toastContext.notify('success', 'Đã cập nhật thông tin');
                            handleCloseModalConfirm()
                            handleCloseModalUpdate()
                            setSubmit([])
                            setDay(new Date());
                        }
                    }

                }
                else {
                    const newObj = {
                        ...obj,
                        name: name,
                        email: email,
                        phone: phone,
                        address: address,
                    }

                    const result = await UserServices.UpdateUser(obj.userId, newObj)
                        .catch((err) => {
                            console.log(err);
                            isSuccess = false;
                            setLoading(false);
                            toastContext.notify('error', 'Có lỗi xảy ra');
                        });

                    if (isSuccess) {
                        setLoading(false);
                        toastContext.notify('success', 'Đã cập nhật thông tin');
                        handleCloseModalConfirm()
                        handleCloseModalUpdate()
                        setSubmit([])
                        setDay(new Date());
                    }
                }


            }

            fetchApi();
        }
    }
    useEffect(() => {
        const fetchApi = async () => {
            await setObj(JSON.parse(window.localStorage.getItem('user')))

            const result = await PromotionCartServices.getAllCarts({ user: JSON.parse(window.localStorage.getItem('user'))._id })
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                await result.pay.map((sup) => (setVoucherList(oldArray => [...oldArray, sup])));
                await result.ship.map((sup) => (setVoucherList(oldArray => [...oldArray, sup])));
                await result.sale.map((sup) => (setVoucherList(oldArray => [...oldArray, sup])));

            }
        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchApi = async () => {


            const result = await UserServices.getUser(JSON.parse(window.localStorage.getItem('user')).userId)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                setObj(result.data);

            }
        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);
    return (
        <div className='frame'>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>)
                    :
                    (<div>
                        <div className='md:flex p-5'>
                            <div className='me-8 md:w-[40%] flex justify-center'>
                                <img src={obj?.images[0]?.url ? obj?.images[0]?.url : noImage} className='md:w-[300px] md:h-[300px] w-[200px] h-[200px] rounded-full my-4' />
                            </div>
                            <div className='md:w-[60%] flex flex-col '>
                                <div className='flex my-5'>
                                    <div className='w-[200px]'>
                                        Họ và tên :
                                    </div>
                                    <div>
                                        {obj.name}
                                    </div>
                                </div>
                                <div className='flex my-5'>
                                    <div className='w-[200px]'>
                                        Email :
                                    </div>
                                    <div>
                                        {obj.email}
                                    </div>
                                </div>
                                <div className='flex my-5'>
                                    <div className='w-[200px]'>
                                        Số điện thoại :
                                    </div>
                                    <div>
                                        {obj.phone}
                                    </div>
                                </div>
                                <div className='flex my-5'>
                                    <div className='w-[200px]'>
                                        Địa chỉ :
                                    </div>
                                    <div>
                                        {obj.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='md:flex p-5 my-9 justify-between md:mx-10 mx-3'>
                            <div className=' cursor-pointer text-blue-700 text-[16px] font-medium my-4' onClick={() => setOpenModalChanghePass(true)}>
                                Đổi mật khẩu
                            </div>
                            <div className=' cursor-pointer text-blue-700 text-[16px] font-medium my-4' onClick={() => setOpenModalVoucherCart(true)}>
                                Giỏ voucher
                            </div>
                            <div className=' cursor-pointer text-blue-700 text-[16px] font-medium my-4' onClick={() => handleOpenModalUpdate()}>
                                Cập nhật thông tin cá nhân
                            </div>
                        </div>
                    </div>)
            }
            <ModalComp
                open={openModalChanghePass}
                handleClose={handleCloseModalChanghePass}
                title="Đổi mật khẩu"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModalChanghePass()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleChangePass()}>
                            Cập nhật mật khẩu
                        </button>

                    </div>
                }
            >

                <Input
                    placeholder="Nhập mật khẩu cũ"
                    password
                    title="Mật khẩu"
                    value={password}
                    required
                    error={errorPass}
                    onChange={(value) => onChangePass(value)}
                    className='my-4'

                />
                <Input
                    placeholder="Nhập mật khẩu mới"
                    password
                    title="Nhập mật khẩu mới"
                    value={newPassword}
                    required
                    error={errorNewPass}
                    onChange={(value) => onChangeNewPass(value)}
                    className='my-4'
                />
                <Input
                    placeholder="Nhập lại mật khẩu mới"
                    password
                    title="Nhập lại mật khẩu mới"
                    value={newPassword2}
                    required
                    error={errorNewPass2}
                    onChange={(value) => onChangeNewPass2(value)}
                    className='my-4'
                />
            </ModalComp>
            <ModalComp
                open={openModalVoucherCart}
                handleClose={handleCloseModalCart}
                title="Danh sách voucher"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModalCart()}>
                            Quay lại
                        </button>

                    </div>
                }
            >
                {
                    voucherList.map((item, index) => (
                        <div key={index} className='flex border m-3 rounded-md p-3'>
                            {
                                item.discount.classify === 'sale' ? <div className='bg-white text-red-600  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'>
                                    <FontAwesomeIcon icon={faCartShopping} className='w-[40px] h-[40px] my-[10px]' />
                                    <div className='text-[14px]'>Sale off</div>
                                </div>
                                    : item.discount.classify === 'ship' ? <div className='bg-white text-green-600  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'>

                                        <FontAwesomeIcon icon={faTruckFast} className='w-[40px] h-[40px] my-[10px]' />
                                        <div className='text-[14px]'>Shipment</div>
                                    </div> :
                                        <div className='bg-white text-blue-600  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'>

                                            <FontAwesomeIcon icon={faMoneyBill} className='w-[40px] h-[40px] my-[10px]' />
                                            <div className='text-[14px]'>Payment</div>
                                        </div>
                            }
                            <div className='flex justify-center items-center ms-4'>
                                {item.discount.name}
                            </div>

                        </div>
                    ))
                }

            </ModalComp>
            <ModalComp
                open={openModalUpdate}
                handleClose={handleCloseModalUpdate}
                title="Danh sách voucher"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModalUpdate()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submitChangeInfo()}>
                            Cập nhật thông tin
                        </button>
                    </div>
                }
            >
                Ảnh sản phẩm
                <hr />
                <div className='flex'>
                    {
                        files.length + images.length < 1 ? (<div>
                            <input
                                id="addImg"
                                type="file"
                                className='hidden'
                                accept="image/png,image/gif,image/jpeg"
                                multiple
                                onChange={handleAddImages}
                            />
                            <label
                                htmlFor="addImg"
                                className='w-[90px] h-[90px] border-[1px] border-dashed border-[#d3d5d7] rounded-[3px] flex justify-center items-center m-[5px] hover:cursor-pointer'
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                        </div>) : (<div>

                        </div>)
                    }


                    {images.map((file, index) => (
                        <div key={index} className='group w-[90px] h-[90px] rounded-[3px] m-[5px] relative select-none'>
                            <div
                                className='absolute top-0 right-0 bg-white p-[5px] rounded-[999px] w-[20px] h-[20px] hidden justify-center items-center mt-[2px] mr-[2px] mb-[2px] ml-[2px] hover:cursor-pointer group-hover:flex'
                                onClick={() =>
                                    handleRemoveImage(index)
                                }
                            >
                                <FontAwesomeIcon
                                    className='text-red-600'
                                    icon={faXmark}
                                />
                            </div>
                            <img
                                className='w-[inherit] h-[inherit] rounded-[3px]'
                                src={file.url}
                                alt=""
                            />
                        </div>
                    ))}
                    {files.map((file, index) => (
                        <div key={index} className='group w-[90px] h-[90px] rounded-[3px] m-[5px] relative select-none'>
                            <div
                                className='absolute top-0 right-0 bg-white p-[5px] rounded-[999px] w-[20px] h-[20px] hidden justify-center items-center mt-[2px] mr-[2px] mb-[2px] ml-[2px] hover:cursor-pointer group-hover:flex'
                                onClick={() =>
                                    handleRemoveFile(index)
                                }
                            >
                                <FontAwesomeIcon
                                    className='text-red-600'
                                    icon={faXmark}
                                />
                            </div>
                            <img
                                className='w-[inherit] h-[inherit] rounded-[3px]'
                                src={file}
                                alt=""
                            />
                        </div>
                    ))}
                </div>


                <Input
                    title={'Tên khách hàng'}
                    required
                    className='my-5'
                    value={name}
                    onChange={onChangeName}
                    error={errorName}
                />

                <Input
                    title={'Email'}
                    required
                    className='my-5'
                    value={email}
                    onChange={onChangeEmail}
                    error={errorEmail}
                />

                <Input
                    title={'Số điện thoại'}
                    required
                    className='my-5'
                    value={phone}
                    onChange={onChangePhone}
                    error={errorPhone}
                />

                <Input
                    title={'Địa chỉ'}
                    required
                    className='my-5'
                    value={address}
                    onChange={onChangeAddress}
                    error={errorAddress}
                />
            </ModalComp>
            <ModalComp
                open={openModalConfirm}
                handleClose={handleCloseModalConfirm}
                title="Đổi mật khẩu"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModalConfirm()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => updateUser()}>
                            Cập nhật thông tin
                        </button>

                    </div>
                }
            >

                <Input
                    placeholder="Nhập mật khẩu"
                    password
                    title="Mật khẩu"
                    value={passConfirm}
                    required
                    error={errorPassConfirm}
                    onChange={(value) => onChangePassConfirm(value)}
                    className='my-4'

                />

            </ModalComp>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default YourAccount;