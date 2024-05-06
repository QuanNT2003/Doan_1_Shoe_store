import React, { useEffect, useState } from 'react';
import ShoppingCartItem from '~/components/ShoppingCartItem';
import ModalLoading from '~/components/ModalLoading';
import { data } from './data';
function ShoppingCart() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const onClick = () => {
        console.log(list)
    }

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            data.map((item) => {
                const obj = {
                    cartId: item.cartId,
                    product: item.product,
                    number: item.number,
                    size: item.size,
                    color: item.color,
                    choose: false
                }
                setList(arr => [...arr, obj]);
            })
        }
        fetchApi();
        setLoading(false)
    }, []);

    const deleteList = (cartId) => {
        setList(prelist => prelist.filter(items => items.cartId !== cartId));
    }
    return (
        <div className=' min-h-[600px]'>
            {
                list === null ? (<div></div>)
                    :
                    (<div>
                        <div className='bg-white m-5 mb-10 p-3 rounded-lg flex items-center justify-between' >
                            <div className='flex items-center'>
                                Tổng tộng {list.length} sản phẩm
                            </div>
                            <div className='flex justify-center items-center'>
                                <button className='bg-blue-500 p-4 px-7 rounded-lg text-white hover:bg-blue-600 ' onClick={() => onClick()}>
                                    Đặt hàng
                                </button>
                            </div>

                        </div>
                        <div>
                            {
                                list.map((item, index) => (
                                    <div key={index}>
                                        <ShoppingCartItem cartItem={item} deleteList={deleteList} />
                                    </div>
                                ))
                            }
                        </div>
                        <ModalLoading open={loading} title={'Đang tải'} />
                    </div>)
            }

        </div>
    );
}

export default ShoppingCart;