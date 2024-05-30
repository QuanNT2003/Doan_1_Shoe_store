import React, { useContext, useEffect, useState } from 'react';
import OrderItem from '~/components/OrderItem';
import * as OrderServices from '~/apiServices/orderServices'
import { ToastContext } from '~/components/ToastContext';
import { useNavigate } from 'react-router-dom';
function OrderCollection() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [data, setData] = useState([])

    useEffect(() => {
        if (window.localStorage.getItem("UserLogin") === 'false') {
            toastContext.notify('info', 'Bạn chưa đăng nhập');
            navigate('/login')
        }
        const fetch = async () => {
            let users = []
            users.push({ value: JSON.parse(window.localStorage.getItem('user'))?._id })
            const response = await OrderServices.getAllOrder({
                user: users
            })
                .catch((error) => {


                    if (error?.response?.status === 404) {
                        setData([]);
                    } else {
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    }
                });

            if (response) {
                setData(response.data);
                console.log(response);
            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClick = (item) => {
        navigate('/order_colection/detail/' + item.orderId)
    }
    return (
        <div className='m-5 mb-10 p-3 rounded-lg bg-white'>
            <div className='font-bold text-[18px]'>Danh sách đơn hàng</div>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <OrderItem Item={item} onCLick={onClick} />
                    </div>
                ))
            }
        </div>
    );
}

export default OrderCollection;