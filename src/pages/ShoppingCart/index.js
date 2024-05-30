import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShoppingCartItem from '~/components/ShoppingCartItem';
import ModalLoading from '~/components/ModalLoading';
import ModalComp from '~/components/ModalComp';
import Order from '~/components/Order';
import * as ShoppingCartServices from '~/apiServices/productCartServices'
import { ToastContext } from '~/components/ToastContext';
function ShoppingCart() {
    const [list, setList] = useState([])
    const toastContext = useContext(ToastContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());
    const [user, setUser] = useState('')

    const [listBuy, setListBuy] = useState([])

    const onClick = () => {
        const newlist = list.filter(item => item.choose === true)
        if (newlist.length === 0) {
            toastContext.notify('info', 'Bạn chưa chọn sản phẩm');
        }
        else {
            let block = false
            for (let item of newlist) {
                if (item.quantity > item.version.inStock) block = true
            }
            if (block === true) toastContext.notify('warning', 'Số lượng sản phẩm không đủ');
            else {
                const listFinal = newlist.map((item) => ({
                    quantity: item.quantity,
                    product: item.product,
                    version: item.version,
                    comment: false,
                    exchange_return: false,
                    total: item.quantity * (item.product.price - (item.product.discount / 100) * item.product.price)
                }))
                setListBuy(listFinal)
                setOpenModal(true)
            }

        }

    }

    const deleteCart = () => {
        const newlist = list.filter(item => item.choose === true)
        for (let item of newlist) {
            deleteList(item)
        }
    }

    const getList = async () => {
        const fetchApi = async () => {
            if (window.localStorage.getItem("UserLogin") === 'false') {
                toastContext.notify('info', 'Bạn chưa đăng nhập');
                navigate('/login')
            }
            else {
                setList([])
                setLoading(true)
                const result = await ShoppingCartServices.getAllCarts({
                    user: JSON.parse(window.localStorage.getItem('user'))._id
                })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false)
                    });

                if (result) {
                    console.log(result);
                    result.data.map((item) => {
                        const obj = {
                            cartId: item.shoppingCartId,
                            product: item.product,
                            quantity: item.quantity,
                            version: item.version,
                            choose: false
                        }
                        setList(arr => [...arr, obj]);
                    })
                    setLoading(false)
                }
            }
        }
        fetchApi();
    }

    useEffect(() => {
        if (window.localStorage.getItem("UserLogin") === 'false') {
            toastContext.notify('info', 'Bạn chưa đăng nhập');
            navigate('/login')
        }
        setUser(JSON.parse(window.localStorage.getItem('user')))
        getList()
        setLoading(false)
    }, [])

    const deleteList = (item) => {
        const fetchApi = async () => {
            setLoading(true)
            const result = await ShoppingCartServices.deleteCart(item.cartId)
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });

            if (result) {
                console.log(result);
                getList()
                setLoading(false)
            }
        }
        fetchApi();
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
                            <Order listBuy={listBuy} deleteCart={deleteCart} />

                        </ModalComp>
                    </div>)
            }

        </div>
    );
}

export default ShoppingCart;