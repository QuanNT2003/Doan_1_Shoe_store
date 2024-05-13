import React, { useEffect, useState } from 'react';
import ShoppingCartItem from '~/components/ShoppingCartItem';
import ModalLoading from '~/components/ModalLoading';
import ModalComp from '~/components/ModalComp';
import { data } from './data';
import Order from '~/components/Order';
function ShoppingCart() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const [listBuy, setListBuy] = useState([])

    const [rerender, setRerender] = useState(new Date())

    const onClick = () => {
        const newlist = list.filter(item => item.choose === true)
        setListBuy(newlist)
        setOpenModal(true)
    }

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            data.map((item) => {
                const obj = {
                    cartId: item.cartId,
                    product: item.product,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    choose: false
                }
                setList(arr => [...arr, obj]);
            })
        }
        fetchApi();
        setLoading(false)
    }, [])

    const deleteList = (index) => {
        console.log(index)
        list.splice(index, 1)

        // setList(list.filter(items => items.cartId !== cartId))
        setRerender(new Date())
        console.log(list)
    }

    // Modal
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)

    };


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
                                        <ShoppingCartItem cartItem={item} index={index} deleteList={deleteList} />
                                    </div>
                                ))
                            }
                        </div>
                        <ModalLoading open={loading} title={'Đang tải'} />
                        <ModalComp
                            open={openModal}
                            handleClose={handleCloseModal}
                            title="Đặt hàng"
                        >
                            <Order listBuy={listBuy} />

                        </ModalComp>
                    </div>)
            }

        </div>
    );
}

export default ShoppingCart;