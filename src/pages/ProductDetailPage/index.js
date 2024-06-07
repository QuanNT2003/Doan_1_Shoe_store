import React, { useState, useCallback, useContext, useEffect } from 'react';
import ImageCarousel from '~/components/ImageCarousel';
import SelectVersion from '~/components/SelectVersion';
import { useNavigate, useParams } from 'react-router-dom';
import * as ProductServices from '~/apiServices/productServices'
import * as VersionServices from '~/apiServices/versionServices'
import * as ShoppingCartServices from '~/apiServices/productCartServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faMinus
} from '@fortawesome/free-solid-svg-icons';
import Select_Rating from '~/components/Select_Rating';
import ProductCarousel from '~/components/ProductCarousel';
import ModalComp from '~/components/ModalComp';
import Order from '~/components/Order';


const listProduct = [
    {
        productID: 2,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
]
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
function ProductPage() {
    const navigate = useNavigate();
    const productID = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());
    const [user, setUser] = useState('')
    const [listRelated, setListRelated] = useState([])

    // Add to cart
    const [sizeList, setSizeList] = useState([])
    const [colorList, setColorList] = useState([])
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [version, setVersion] = useState()
    const changeColor = (value) => {
        setColor(value)
        console.log(value);
        if (size !== '') getVersion(size._id, value._id)
    }

    const changeSize = (value) => {
        setSize(value)
        console.log(value);
        if (color !== '') getVersion(value._id, color._id)
    }
    const getVersion = async (sizeId, colorId) => {
        const fetchApi = async () => {
            setLoading(true)
            let sizeL = []
            let colorL = []
            sizeL.push({ value: sizeId })
            colorL.push({ value: colorId })
            const result = await VersionServices.getAllVersions({
                productId: productID.id,
                size: sizeL,
                color: colorL
            })
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result.data[0]);
                setVersion(result.data[0])
                if (result.data[0].inStock < quantity) toastContext.notify('warning', 'Số lượng sản phẩm còn dưới ' + quantity);
            }

        }

        fetchApi();
        setLoading(false)
    }

    const addToCart = async () => {
        if (window.localStorage.getItem("UserLogin") !== 'true') {
            toastContext.notify('info', 'Bạn chưa đăng nhập');
            navigate('/login')
        }
        const fetchApi = async () => {
            setLoading(true)
            const cartItem = {
                user: user,
                version: version,
                product: obj,
                quantity: quantity
            }
            const result = await ShoppingCartServices.CreateShoppingCart(cartItem)
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false);
                console.log(result)
                toastContext.notify('success', 'Đã thêm sản phẩm vào giỏ');
            }
        }

        fetchApi();
    }

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            setObj(null)
            setUser(JSON.parse(window.localStorage.getItem('user')))
            const result = await ProductServices.getProduct(productID.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
            }
            const resultSize = await VersionServices.getVersionSize(productID.id)
                .catch((err) => {
                    console.log(err);
                });

            if (resultSize) {
                const data = await resultSize.data.map((cate) => ({ name: cate.name, value: cate }));
                setSizeList(data)

            }
            const resultColor = await VersionServices.getVersionColor(productID.id)
                .catch((err) => {
                    console.log(err);
                });

            if (resultColor) {
                const data = await resultColor.data.map((cate) => ({ name: cate.name, value: cate }));
                setColorList(data)

            }

            const related = await ProductServices.getRelatedProducts(productID.id)
                .catch((err) => {
                    console.log(err);
                });

            if (related) {
                setListRelated(related.data)

            }
        }

        fetchApi();
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productID.id]);

    // Content
    const [showall, setShowAll] = useState(false)

    // Modal
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)

    };

    const [listBuy, setListBuy] = useState([])
    const handleOpen = () => {
        if (window.localStorage.getItem("UserLogin") !== 'true') {
            toastContext.notify('info', 'Bạn chưa đăng nhập');
            navigate('/login')
        }
        if (version === undefined) {
            toastContext.notify('warning', 'Chưa chọn phiên bản sản phẩm');
        }
        else if (version.inStock < quantity) {
            toastContext.notify('warning', 'Số lượng sản phẩm không đủ');
        }
        else {
            listBuy.push({
                quantity: quantity,
                product: obj,
                version: version,
                comment: false,
                exchange_return: false,
                total: quantity * (obj.price - (obj.discount / 100) * obj.price)
            })
            setOpenModal(true)
        }
    }
    return (
        <div>
            {
                obj === null ? (<div><ModalLoading open={true} title={'Đang tải'} /></div>)
                    :
                    (<div className='select-none'>
                        <div className='bg-white m-5 mb-10 p-5 rounded-lg lg:grid lg:grid-cols-5'>
                            <div className='lg:col-span-2 w-[80%] max-w-[80%] mx-auto'>
                                <ImageCarousel images={obj.images} showThumbnails={true} />
                            </div>
                            <div className='p-4 pl-6 lg:col-span-3'>
                                <div className='font-bold text-[17px] mb-3'>{obj.name}</div>
                                <div className='mb-3'>Brand : {obj.brand.name}</div>
                                <div className='text-[25px] text-red-500 mb-2'>{addCommas(obj.price * (100 - obj.discount) / 100)} đ</div>
                                <div className=''>
                                    <span className='me-3 line-through text-stone-400'>{addCommas(obj.price)} đ</span>
                                    <span className='me-2'>-</span>
                                    <span>{addCommas(obj.discount)}%</span>
                                </div>
                                <hr className='mt-4' />
                                <div>
                                    <SelectVersion list={colorList} title={'Màu sắc'} onclick={changeColor} />
                                    <SelectVersion list={sizeList} title={'Kích thước'} onclick={changeSize} />
                                    <div className='flex mt-5 items-center text-gray-500'>
                                        <div className='w-[140px] flex flex-col justify-center'>
                                            Chọn số lượng
                                        </div>
                                        <div className='w-[15px]'>
                                            :
                                        </div>
                                        <div className='flex'>
                                            <div className='w-[40px] h-[35px] flex justify-center items-center bg-stone-300 text-gray-500 rounded mx-3 cursor-pointer'
                                                onClick={() => {
                                                    if (quantity > 1) setQuantity(quantity - 1)
                                                }}>
                                                <div className={quantity <= 1 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </div>
                                            </div>
                                            <input className='border-custom number-nospin rounded w-[50px] py-1 px-[10px] text-[14px] text-center hover:border-blue-500'
                                                value={quantity}
                                                onChange={(e) => {
                                                    let value = removeNonNumeric(e.target.value);

                                                    if (value < 1) e.target.value = 1;
                                                    else if (value > 10) e.target.value = 10;
                                                    if (value === '') e.target.value = 1;

                                                    setQuantity(e.target.value);
                                                }} type='number' />
                                            <div className='w-[40px] h-[35px] flex justify-center items-center bg-stone-300 text-gray-500 rounded mx-3 cursor-pointer'
                                                onClick={() => {
                                                    if (quantity < 10) setQuantity(quantity + 1)
                                                }}>
                                                <div className={quantity >= 10 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        version?.inStock < 10 ? (<div className='flex justify-center mt-5 text-[17px] font-semibold'>Còn {version?.inStock} sản phẩm </div>) : (<div> </div>)
                                    }
                                </div>
                                <div className='mt-7 ssm:flex ssm:flex-row'>
                                    <div className='ssm:w-[50%] mb-2 ssm:mb-0 flex justify-center items-center'>
                                        <button className='bg-amber-500 py-5 px-3 rounded-lg w-[80%] text-white hover:bg-amber-400 cursor-pointer ' onClick={() => handleOpen()}>
                                            Mua Ngay
                                        </button>
                                    </div>
                                    <div className='ssm:w-[50%] flex justify-center items-center'>
                                        <button className='bg-orange-500 py-5 px-3 rounded-lg w-[80%] text-white hover:bg-orange-400 cursor-pointer ' onClick={() => {
                                            addToCart()
                                        }}>
                                            Thêm vào giỏ
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className='bg-white m-5 mb-10 p-5 rounded-lg'>
                            <div className='font-bold mb-3 text-[17px]'>
                                Mô tả sản phẩm
                            </div>
                            <div className={showall === true ? 'text-[14px] mb-10 transition-all' : 'transition-all text-[14px] mb-10 line-clamp-4'}>
                                {obj.description}
                            </div>
                            {
                                obj.description === '' ? (<div> </div>) : (
                                    <div>
                                        <div className={showall === true ? 'hidden' : 'flex justify-center items-center'}>
                                            <button className='bg-blue-500 mx-auto p-3 rounded-lg w-[30%] text-white hover:bg-blue-400 cursor-pointer ' onClick={() => setShowAll(true)}>
                                                Xem Thêm
                                            </button>
                                        </div>
                                        <div className={showall === false ? 'hidden' : 'flex justify-center items-center'}>
                                            <button className='bg-orange-500 mx-auto p-3 rounded-lg w-[30%] text-white hover:bg-orange-400 cursor-pointer ' onClick={() => setShowAll(false)}>
                                                Thu gọn
                                            </button>
                                        </div>
                                    </div>
                                )
                            }



                        </div>
                        <div className='bg-white m-5 mb-10 p-5 rounded-lg'>
                            <Select_Rating productId={obj.productId} />
                        </div>
                        <ProductCarousel title={'Sản phẩm tương tự'} listProduct={listRelated} path='/' />
                        <ModalComp
                            open={openModal}
                            handleClose={handleCloseModal}
                            title="Đặt hàng"
                        >
                            <Order listBuy={listBuy} />

                        </ModalComp>
                    </div>)}
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>

    );
}

export default ProductPage;