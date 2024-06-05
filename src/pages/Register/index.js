import React, { useContext, useEffect, useState } from 'react';
import logo from '~/assets/images/logo.png'
import Input from '~/components/Input';
import * as UserService from '~/apiServices/userServices';
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import { useNavigate } from 'react-router-dom';
import Header from '~/components/layouts/DefaultLayoutClient/Header';
import Footer from '~/components/layouts/DefaultLayoutClient/Footer';
function Register() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    //process 1
    const [email, setEmail] = useState('')
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');


    //process 2
    const [data, setData] = useState('')
    const [otp, setOtp] = useState('')
    const onChangeOtp = (value) => {
        setOtp(value);
        setErrorOtp('')
    };
    const [errorOtp, setErrorOtp] = useState('');

    //process 3
    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('');
    const onChangeName = (value) => {
        setName(value);
        setErrorName('')
    };

    const [phone, setPhone] = useState('')
    const [errorPhone, setErrorPhone] = useState('');
    const onChangePhone = (value) => {
        setPhone(value);
        setErrorPhone('')
    };

    const [password1, setPassword1] = useState('')
    const [errorPass1, setErrorPass1] = useState('');
    const onChangePass1 = (value) => {
        setPassword1(value);
        setErrorPass1('')
    };

    const [password2, setPassword2] = useState('')
    const [errorPass2, setErrorPass2] = useState('');
    const onChangePass2 = (value) => {
        setPassword2(value);
        setErrorPass2('')
    };

    const [process, setProcess] = useState(0)


    const senOtp = async () => {
        if (email === '') {
            toastContext.notify('error', 'Chưa nhập email');
            setErrorEmail('Không được để trống')
        }
        else {
            setLoading(true);
            const fetchApi = async () => {
                const obj = {
                    email: email
                }

                console.log(obj)
                const result = await UserService.sendOtp(obj)
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        if (error.response.request.statusText === 'Not Found') toastContext.notify('error', 'Email không tồn tại');
                        else toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (result) {
                    setLoading(false);
                    console.log(result)
                    if (result?.message === 'The Email already exists ') {
                        toastContext.notify('info', 'Email đã được đăng ký');
                    }
                    else {
                        setData(result.data)
                        setProcess(1)
                    }

                }
            }



            fetchApi();
        }
    }

    const comfirmOtp = () => {
        if (otp === '') {
            toastContext.notify('error', 'Chưa nhập email');
            setErrorOtp('Không được để trống')
        }
        else {
            setLoading(true)
            if (data === otp) {
                toastContext.notify('success', 'Otp hợp lệ');
                setProcess(2)
            }
            else toastContext.notify('error', 'Otp không hợp lệ');
            setLoading(false)
        }
    }

    const SignIn = async () => {
        if (name === '') {
            toastContext.notify('error', 'Chưa nhập tên');
            setErrorName('Không được để trống')
        }
        else if (phone === '') {
            toastContext.notify('error', 'Chưa nhập số điện thoại');
            setErrorPhone('Không được để trống')
        }
        else if (password1 === '') {
            toastContext.notify('error', 'Chưa nhập mật khẩu');
            setErrorPass1('Không được để trống')
        }
        else if (password2 === '') {
            toastContext.notify('error', 'Chưa nhập xác nhận mật khẩu');
            setErrorPass2('Không được để trống')
        }
        else if (password1 !== password2) {
            toastContext.notify('error', 'Mật khẩu không khớp');
        }
        else {
            setLoading(true)
            const obj = {
                name: name,
                email: email,
                phone: phone,
                password: password1
            }

            const result = await UserService.CreateUser(obj)
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });

            if (result) {
                setLoading(false);
                console.log(result)
                toastContext.notify('success', 'Đăng ký thành công');
                navigate('/login');
            }
        }
    }
    return (
        <div className='bg-[#e9ecef] flex flex-col'>
            <Header />
            <div className='flex flex-col justify-center items-center py-10'
            >
                {
                    process === 0 ? (
                        <div className='bg-white rounded-3xl min-h-[500px] md:w-[60%] w-[90%] p-3 shadow-2xl'>
                            <div className='flex justify-center items-center'>
                                <img src={logo} className='w-[100px] me-3' alt='' />
                                <h1>TQ Shop</h1>
                            </div>
                            <div className='flex justify-center items-center my-5 font-semibold text-[24px] mx-4'>
                                Welcome to TQShop! Please signin.
                            </div>
                            <div className='mx-3 my-7'>
                                <Input
                                    placeholder="Nhập email"
                                    value={email}
                                    error={errorEmail}
                                    title="Nhập email"
                                    required
                                    onChange={(value) => onChangeEmail(value)}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => senOtp()}>
                                    Nhận mã otp
                                </button>
                            </div>
                        </div>
                    ) : (

                        process === 1 ? (
                            <div className='bg-white rounded-3xl min-h-[500px] md:w-[60%] w-[90%] p-3 shadow-2xl'>
                                <div className='flex justify-center items-center'>
                                    <img src={logo} className='w-[100px] me-3' alt='' />
                                    <h1>TQ Shop</h1>
                                </div>
                                <div className='flex justify-center items-center my-5 font-semibold text-[24px] mx-4'>
                                    Welcome to TQShop! Please signin.
                                </div>
                                <div className='mx-3 my-7'>
                                    <Input
                                        placeholder="Nhập otp"
                                        value={otp}
                                        error={errorOtp}
                                        title="Nhập otp"
                                        required
                                        onChange={(value) => onChangeOtp(value)}
                                    />
                                </div>
                                <div className='flex justify-center items-center gap-3'>
                                    <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => senOtp()}>
                                        Gửi lại otp
                                    </button>
                                    <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => comfirmOtp()}>
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='bg-white rounded-3xl min-h-[500px] md:w-[60%] w-[90%] p-3 shadow-2xl'>
                                <div className='flex justify-center items-center'>
                                    <img src={logo} className='w-[100px] me-3' alt='' />
                                    <h1>TQ Shop</h1>
                                </div>
                                <div className='flex justify-center items-center my-5 font-semibold text-[24px] mx-4'>
                                    Welcome to TQShop! Please signin.
                                </div>
                                <div className='mx-3 my-7'>
                                    <Input
                                        placeholder="Nhập họ tên"
                                        title="Họ và tên"
                                        value={name}
                                        required
                                        error={errorName}
                                        onChange={(value) => onChangeName(value)}
                                    />
                                </div>
                                <div className='mx-3 my-7'>
                                    <Input
                                        placeholder="Nhập số điện thoại"
                                        title="Số điện thoại"
                                        value={phone}
                                        required
                                        error={errorPhone}
                                        onChange={(value) => onChangePhone(value)}
                                    />
                                </div>
                                <div className='mx-3 my-7'>
                                    <Input
                                        placeholder="Mật khẩu"
                                        password
                                        title="Nhập mật khẩu"
                                        value={password1}
                                        error={errorPass1}
                                        onChange={(value) => onChangePass1(value)}

                                    />
                                </div>
                                <div className='mx-3 my-7'>
                                    <Input
                                        placeholder="Nhập lại mật khẩu"
                                        password
                                        title="Xác nhận lại mật khẩu"
                                        value={password2}
                                        error={errorPass2}
                                        onChange={(value) => onChangePass2(value)}

                                    />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => SignIn()} >
                                        Đăng ký
                                    </button>
                                </div>

                            </div>
                        )


                    )
                }


                <ModalLoading open={loading} title={'Đang tải'} />
            </div >
            <Footer />
        </div>

    );
}

export default Register;