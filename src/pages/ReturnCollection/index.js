import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '~/components/ToastContext';
import { useNavigate } from 'react-router-dom';
import * as ReturnServices from '~/apiServices/returnServices'
import ReturnItem from '~/components/ReturnItem';
function Return_Collection() {

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
            const response = await ReturnServices.getAllReturn({
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
        navigate('/return_colection/detail/' + item.returnId)
    }
    return (
        <div className='m-5 mb-10 p-3 rounded-lg bg-white'>
            <div className='font-bold text-[18px]'>Danh sách trả hàng</div>
            {
                data.map((item, index) => (
                    <div key={index}>

                        <ReturnItem Item={item} onCLick={onClick} />
                    </div>
                ))
            }
        </div>
    );
}

export default Return_Collection;