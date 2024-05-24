import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Voucher_Item from '~/components/Voucher_Item';
import * as PromotionsServices from '~/apiServices/promotionServices';
import * as PromotionsCartServices from '~/apiServices/promotionCartServices';
import ModalLoading from '~/components/ModalLoading';
import { ToastContext } from '~/components/ToastContext';
function DiscountPage() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);


    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());

    const [user, setUser] = useState()
    useEffect(() => {
        const fetchApi = async () => {
            if (window.localStorage.getItem("UserLogin") === 'false') {
                toastContext.notify('info', 'Bạn chưa đăng nhập');
                navigate('/login')
            }
            else {
                setLoading(true)
                setUser(JSON.parse(window.localStorage.getItem('user')))
                const result = await PromotionsServices.getPromotionUser(JSON.parse(window.localStorage.getItem('user'))._id)
                    .catch((err) => {
                        console.log(err);
                        setLoading(false)
                    });

                if (result) {
                    console.log(result);
                    setObj(result.data);
                    setLoading(false)
                }
            }

        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);

    const addPromotionCart = async (item) => {
        const promotionCart = {
            user: user,
            discount: item
        }
        const fetchApi = async () => {
            const result = await PromotionsCartServices.CreatePromotionCart(promotionCart)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
            }

        }

        fetchApi();

    }
    return (
        <div className='m-5 mb-10 p-3 rounded-lg min-h-[600px]'>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>)
                    :
                    (
                        <div className='mb-4 font-bold text-[18px]'>
                            Khuyến mãi hôm nay
                            <div className='flex flex-wrap gap-[5%] mt-4 justify-center md:justify-start'>
                                {
                                    obj.map((item, index) => (
                                        <Voucher_Item discount={item} key={index} addToCart={addPromotionCart} />
                                    ))
                                }
                            </div>

                        </div>
                    )}

        </div>
    );
}

export default DiscountPage;