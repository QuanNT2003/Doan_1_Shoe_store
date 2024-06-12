import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '~/components/Categories';
import ProductCarousel from '~/components/ProductCarousel';
import Product_WC_item from '~/components/Product_WC_Item';
import * as ProductServices from '~/apiServices/productServices'
import * as CategoryServices from '~/apiServices/categoryServices';
import * as ReportServices from '~/apiServices/reportServices'
import { ToastContext } from '~/components/ToastContext';

function HomePage() {
    const toastContext = useContext(ToastContext);
    const [listSale, setListSale] = useState([])
    const [listNew, setListNew] = useState([])
    const [listTop, setListTop] = useState([])
    const [listJustForYou, setListJustForYou] = useState([])
    const [listCategories, setListCategories] = useState([])
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
    const getCate = async () => {
        const response = await CategoryServices.getAllCategorys(
        )
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            console.log(response.data);
            setListCategories(response.data);
        }
    };
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
            const now = new Date();
            const result = await ReportServices.GetTopProduct({
                month: now.getMonth() + 1,
                year: now.getFullYear(),
            })
                .catch((error) => {
                    if (error?.response?.status === 404) {
                        setListTop([]);
                    } else {
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    }
                });
            if (result) {
                console.log(result);
                setListTop(result.data)
            }
            getCate()
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='select-none'>
            <ProductCarousel title={'Siêu khuyến mãi'} listProduct={listSale} path='/collection/desc&discount' />
            <Categories list={listCategories} />
            <ProductCarousel title={'Sản phẩm mới'} listProduct={listNew} path='/collection/desc&creatAt' />
            <ProductCarousel title={'Mua nhiều nhất'} listProduct={listTop} path='/' />
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
            </div>

        </div>
    );
}

export default HomePage;