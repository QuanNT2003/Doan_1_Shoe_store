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
import Button from '@mui/material/Button';

const sortlist = [
    {
        name: 'Đánh giá từ thấp tới cao',
        value: [
            'asc',
            'star'
        ]
    },
    {
        name: 'Đánh giá từ cao tới thấp',
        value: [
            'desc',
            'star'
        ]
    },
    {
        name: 'Giá từ cao tới thấp',
        value: [
            'desc',
            'price'
        ]
    },
    {
        name: 'Giá từ thấp tới cao',
        value: [
            'asc',
            'price'
        ]
    },
    {
        name: 'Lượt đánh giá',
        value: [
            'asc',
            'star'
        ]
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

    const handleChange1 = async (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }

    };


    const filter = async () => {
        getList(
            await createObjectQuery(
                page,
                limit,
                sortBy,
                orderBy,
                search,
                selectedManufacturer,
                selectedLSP,
                selectedPL,
                price[1] === 0 ? '' : price
            ));
    }

    const sortProcess = async (item) => {
        setSort(item.name)
        setSortBy(item.value[1])
        setOrderBy(item.value[0])
        getList(
            await createObjectQuery(
                page,
                limit,
                item.value[1],
                item.value[0],
                search,
                selectedManufacturer,
                selectedLSP,
                selectedPL,
                price[1] === 0 ? '' : price
            ));
    }

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
            const data = await response.data.map((cate) => ({ label: cate.brand.name, value: cate.brand._id }));
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
                selectedLSP,
                selectedPL,
                price[1] === 0 ? '' : price
            ));
        setDay(new Date())
    }
    useEffect(() => {
        const fetch = async () => {
            if (key[0] === 'desc') {
                getCate()
                getBrand()
                setSortBy(key[1])
                setOrderBy(key[0])
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
            } else if (key[0] === 'search') {
                getCate()
                getBrand()
                setSearch(key[1])
                getList(
                    await createObjectQuery(
                        page,
                        limit,
                        sortBy,
                        orderBy,
                        key[1],

                    ));
            }
            else if (key[0] === 'brand') {
                getCate()
                selectedManufacturer.push(
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
                        '',
                        selectedManufacturer

                    ));
            }

        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key[1]]);

    useEffect(() => {

    }, [day]);
    return (
        <div className='bg-white m-4 mb-10 rounded-lg pt-3'>
            <ProductList
                list={rows}
                totalPage={totalPage}
                changePage={changePage}
                // loading={pending}
                filter={
                    <div>
                        <div className='flex flex-wrap mt-3 items-center'>
                            <div className='w-[360px] me-3'>
                                <RangeValue
                                    placeholder={'Giá bán'}
                                    value={price}
                                    handleChange={handleChange1}
                                />
                            </div>
                            {
                                key[0] === 'brand' ? (
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
                                key[0] === 'category' ? (
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
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                className=' p-4 font-semibold mr-[20px] hover:bg-blue-600 hover:text-stone-600'
                                variant="outlined"
                                onClick={() => {
                                    setPrice([0, 0])
                                    if (key[0] === 'category') {

                                    } else setSelectedLSP([])
                                    if (key[0] === 'brand') {

                                    } else setSelectedManufacturer([])
                                    setSelectedPL([])
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                            <Button
                                className=' p-4 font-semibold mr-[20px] hover:bg-blue-600 hover:text-stone-600'
                                variant="outlined"
                                onClick={filter}
                            >
                                Lọc
                            </Button>
                        </div>
                    </div>
                }
                sort={
                    key[0] === 'desc' ? (<div> </div>) : (
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
                                        <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => {
                                            sortProcess(item)
                                        }
                                        }
                                        >{item.name}</div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )
                }
            />
            <ModalLoading open={pending} title={'Đang tải'} />
        </div>
    );
}

export default CollectionPage;