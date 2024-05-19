import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '~/components/Categories';
import ProductCarousel from '~/components/ProductCarousel';
import Product_WC_item from '~/components/Product_WC_Item';
import * as ProductServices from '~/apiServices/productServices'
import * as CategoryServices from '~/apiServices/categoryServices';
import { ToastContext } from '~/components/ToastContext';
const listProduct = [
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 3,
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
        discount: 1,
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
        discount: 10,
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
const listCategories = [
    {
        id: 1,
        name: 'Giày sandal',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày công sở ',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày sabo',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày mọi',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày tăng chiều cao',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày bốt',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày sneaker',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày cao rót',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày thể thao',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
    {
        id: 1,
        name: 'Giày trẻ em',
        images: 'https://img.muji.net/img/item/4550344414637_1260.jpg',
    },
]
function HomePage() {
    const toastContext = useContext(ToastContext);
    const [listSale, setListSale] = useState([])
    const [listNew, setListNew] = useState([])
    const [listJustForYou, setListJustForYou] = useState([])
    const [pendingSale, setPendingSale] = useState(false)
    const [pendingNew, setPendingNew] = useState(false)
    const [pendJustForYou, setPendingJustForYou] = useState(false)
    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        search,
        brand,
        category,
        classify,
        price
    ) => {
        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(search && { search }),
            ...(brand && { brand }),
            ...(category && { category }),
            ...(classify && { classify }),
            ...(price && { price }),
        };
    }
    const getList = async (obj, setList, setPending) => {
        setPending(true);
        const response = await ProductServices.getAllProducts(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setList([]);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            console.log(response);
            setPending(false);
            setList(response.data);

        }
    }
    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    1,
                    12,
                    'discount',
                    'desc',

                ), setListSale, setPendingSale);
            getList(
                await createObjectQuery(
                    1,
                    12,
                ), setListNew, setPendingNew);
            getList(
                await createObjectQuery(
                    1,
                    20,
                ), setListJustForYou, setPendingJustForYou);
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='select-none'>
            <ProductCarousel title={'Siêu khuyến mãi'} listProduct={listSale} path='/collection/123' />
            <ProductCarousel title={'Sản phẩm mới'} listProduct={listNew} path='/collection/123' />
            <Categories list={listCategories} />
            <ProductCarousel title={'Mua nhiều nhất'} listProduct={listNew} path='/collection/123' />
            <div className='bg-white m-5 mb-10 p-3 rounded-lg'>
                <div className='mb-2 ms-3 h-[40px] flex items-center justify-between'>
                    <div className='font-bold text-[16px]'>Just for you</div>
                </div>
                <div className='flex flex-wrap mb-7'>
                    {
                        listJustForYou.map((item, index) => (
                            <div key={index}>
                                <Product_WC_item product={item} />

                            </div>
                        ))
                    }
                </div>
                <div className='flex justify-center items-center'>
                    <button className='bg-blue-500 mx-auto p-3 rounded-lg w-[40%] text-white hover:bg-blue-400 cursor-pointer '>
                        Xem Thêm
                    </button>
                </div>
            </div>

        </div>
    );
}

export default HomePage;