import React, { useState, useCallback, useContext, useEffect } from 'react';
import ProductList from '~/components/ProductList';
import { useNavigate, useParams } from 'react-router-dom';
import MultiSelectComp from '~/components/MultiSelectComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import * as ProductServices from '~/apiServices/productServices'
import * as CategoryServices from '~/apiServices/categoryServices';
import * as BrandServices from '~/apiServices/brandServices';
import { ToastContext } from '~/components/ToastContext';
import RangeValue from '~/components/RangeValue';
import ModalLoading from '~/components/ModalLoading';

const optionsTH = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const sortlist = [
    {
        name: 'Đánh giá từ thấp tới cao',
    },
    {
        name: 'Đánh giá từ cao tới thấp',
    },
    {
        name: 'Giá từ cao tới thấp',
    },
    {
        name: 'Giá từ thấp tới cao',
    },
    {
        name: 'Lượt đánh giá',
    },
]
const optionsPL = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
    { label: 'Trẻ em', value: 'Trẻ em' },
];
function CollectionPage() {
    const params = useParams();
    const key = params.key.split('&')
    const toastContext = useContext(ToastContext);

    const [selectedPL, setSelectedPL] = useState([]);
    const [selectedLSP, setSelectedLSP] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const [sort, setSort] = useState('Không có')

    // PriceRange
    const minDistance = 10;
    const [price, setPrice] = React.useState([0, 0]);

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }
    };
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

    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(21);
    const [totalPage, setTotalPage] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [search, setSearch] = useState('')

    // Filter Options
    const [optionsLSP, setOptionsLSP] = useState([]);
    const [optionsManufacturer, setOptionsManufacturer] = useState([]);

    const getBrand = async () => {
        const response = await BrandServices.getAllBrands()
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
            const data = await response.data.map((cate) => ({ label: cate.name, value: cate._id }));
            setOptionsManufacturer(data);
        }
    }

    // GET DATA SUPPLIERS
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
            const data = await response.data.map((sup) => ({ label: sup.name, value: sup._id }));
            setOptionsLSP(data);
        }
    };

    const getList = async (obj) => {
        setPending(true);
        const response = await ProductServices.getAllProducts(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                    setTotalPage(0);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            setPending(false);
            setRows(response.data);
            setTotalPage(response.totalPage);
        }
    }


    const changePage = async (newPage) => {
        setPage(newPage)
        getList(
            await createObjectQuery(
                newPage,
                limit,
                sortBy,
                orderBy,
                search,
                selectedManufacturer,
                selectedLSP
            ));
        setDay(new Date())
    }
    useEffect(() => {
        const fetch = async () => {
            if (key[0] === 'desc') {
                getCate()
                getBrand()
                getList(
                    await createObjectQuery(
                        page,
                        limit,
                        key[1],
                        key[0],
                        search,

                    ));
            }
            else if (key[0] === 'category') {
                getBrand()
                selectedLSP.push(
                    {
                        value: key[1]
                    }
                )
                getList(
                    await createObjectQuery(
                        page,
                        limit,
                        sortBy,
                        orderBy,
                        search,
                        selectedManufacturer,
                        selectedLSP
                    ));
            }

        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

    }, [day]);
    return (
        <div className='bg-white m-4 mb-10 rounded-lg pt-3'>
            <ProductList
                list={rows}
                totalPage={totalPage}
                changePage={changePage}
                // loading={pending}
                filter={<div className='flex flex-wrap mt-3 items-center'>
                    <div className='w-[340px] me-3'>
                        <RangeValue
                            placeholder={'Giá bán'}
                            value={price}
                            handleChange={handleChange1}
                        />
                    </div>
                    {
                        key[0] == 'brand' ? (
                            <div> </div>
                        ) : (
                            <div className='w-[250px] me-3'>
                                <MultiSelectComp
                                    options={optionsManufacturer}
                                    placeholder={'Thương hiệu'}
                                    selected={selectedManufacturer}
                                    setSelected={setSelectedManufacturer}
                                    hasSelectAll={true}
                                    notShowTitle={true}
                                />
                            </div>
                        )
                    }

                    {
                        key[0] == 'category' ? (
                            <div> </div>
                        ) : (
                            <div className='w-[250px] me-3'>
                                <MultiSelectComp
                                    options={optionsLSP}
                                    placeholder={'Loại sản phẩm'}
                                    selected={selectedLSP}
                                    setSelected={setSelectedLSP}
                                    hasSelectAll={true}
                                    notShowTitle={true}
                                />
                            </div>
                        )
                    }

                    <div className='w-[250px] me-3'>
                        <MultiSelectComp
                            options={optionsPL}
                            placeholder={'Phân loại'}
                            selected={selectedPL}
                            setSelected={setSelectedPL}
                            hasSelectAll={true}
                            notShowTitle={true}
                        />
                    </div>
                </div>}
                sort={
                    <div className='ms-2 cursor-pointer flex items-center group relative'>
                        <div className='me-4 flex items-center justify-center'>
                            <div className='font-bold me-3'> Sắp xếp</div>

                            <FontAwesomeIcon icon={faFilter} className='h-[20px] w-[20px] me-4 text-gray-500' />

                            <div>:</div>
                        </div>
                        <div>{sort}</div>
                        <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                            <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                                {sortlist.map((item, index) => (
                                    <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => setSort(item.name)}>{item.name}</div>
                                ))}
                            </div>
                        </div>
                        <ModalLoading open={pending} title={'Đang tải'} />
                    </div>

                }
            />
        </div>
    );
}

export default CollectionPage;