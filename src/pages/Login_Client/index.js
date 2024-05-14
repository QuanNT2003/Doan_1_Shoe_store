import React, { useState } from 'react';
import bg from '~/assets/images/bg_muahe.jpg'
import logo from '~/assets/images/logo.png'
import Input from '~/components/Input';
function Login_Client() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-no-repeat bg-cover '
            style={{
                backgroundImage: `url('${bg}')`
            }}>

            <div className='bg-white rounded-3xl min-h-[500px] md:w-[40%] w-[90%] p-3 shadow-2xl'>
                <div className='flex justify-center items-center'>
                    <img src={logo} className='w-[100px] me-3' alt='' />
                    <h1>TQ Shop</h1>
                </div>
                <div className='flex justify-center items-center my-5 font-semibold text-[24px] mx-4'>
                    Welcome to TQShop! Please login.
                </div>
                <div className='mx-3 my-7'>
                    <div className=' font-medium'>Nhập email</div>
                    <Input
                        placeholder="Số điện thoại hoặc email"
                        value={email}
                        className='p-2 rounded-lg outline-none relative w-[100%] h-[92%] border-none text-[14px] font-medium text-[#263c51] indent-4'
                        onChange={(value) => setEmail(value)}
                    />
                </div>
                <div className='mx-3 my-7'>
                    <div className=' font-medium'>Nhập mật khẩu</div>
                    <Input
                        placeholder="Mật khẩu"
                        password
                        value={password}
                        onChange={(value) => setPassword(value)}
                        className='p-2 rounded-lg outline-none relative w-[100%] h-[92%] border-none text-[14px] font-medium text-[#263c51] indent-4'
                    />
                </div>
                <div className='flex justify-end me-5 my-7'>
                    <div className=' cursor-pointer hover:text-cyan-600 font-semibold'>
                        Quên mật khẩu ?
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Login_Client;