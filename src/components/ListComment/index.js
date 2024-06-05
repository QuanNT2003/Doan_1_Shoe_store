import React, { useState, useCallback, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSort,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '~/components/ToastContext';
import CommentItem from '../Comment_Item';
import Pagination from '@mui/material/Pagination';
import * as CommentServices from '~/apiServices/commentServices'
import ModalLoading from '~/components/ModalLoading';
const sortlist = [
    {
        name: 'Gần đây',
        value: [
            '',
            ''
        ]
    },
    {
        name: 'Đánh giá: Từ cao tới thấp',
        value: [
            'desc',
            'star'
        ]
    },
    {
        name: 'Đánh giá: Từ thấp tới cao',
        value: [
            'asc',
            'star'
        ]
    },
]
const starlist = [
    {
        name: 'Tất cả',
        value: ''
    },
    {
        name: '1 sao',
        value: 1
    },
    {
        name: '2 sao',
        value: 2
    },
    {
        name: '3 sao',
        value: 3
    },
    {
        name: '4 sao',
        value: 4
    },
    {
        name: '5 sao',
        value: 5
    },
]

function ListComment({ productId }) {
    const toastContext = useContext(ToastContext);
    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [sort, setSort] = useState('Gần đây')
    const [star, setStar] = useState('Tất cả')

    const [selectedStar, setSelectedStar] = useState([])
    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        user,
        productId,
        approve,
        star
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(user && { user }),
            ...(productId && { productId }),
            ...(approve && { approve }),
            ...(star && { star }),
        };

    }

    const getList = async (obj) => {
        setPending(true);

        const response = await CommentServices.getAllComment(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            console.log(response);
            setPending(false);
            setRows(response.data);
            setTotalPage(response.totalPage);

        }
    }

    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    '',
                    '',
                    '',
                    [{ value: productId }],
                    [{ value: true }],

                ));

        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChange = async (event, value) => {
        setPage(value);
        getList(
            await createObjectQuery(
                value,
                limit,
                sortBy,
                orderBy,
                '',
                [{ value: productId }],
                [{ value: true }],
                selectedStar
            ));
        setDay(new Date())
    };

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
                '',
                [{ value: productId }],
                [{ value: true }],
                selectedStar.length === 0 ? '' : selectedStar
            ));
    }

    const handleFiter = async (item) => {
        setSelectedStar(item)
        getList(
            await createObjectQuery(
                page,
                limit,
                sortBy,
                orderBy,
                '',
                [{ value: productId }],
                [{ value: true }],
                item,
            ));
    }
    return (
        <div >
            <div className='md:flex border-t md:border-b min-h-[70px] items-center mb-4 pt-4 md:pt-0'>
                <div className='md:w-[55%] ms-2 md:border-e-2 h-[100%] md:mb-0 mb-3'>
                    Product Reviews
                </div>
                <div className='md:w-[25%] ms-2 md:border-e-2 cursor-pointer flex items-center group relative md:mb-0 mb-3' >
                    <FontAwesomeIcon icon={faSort} className='h-[20px] w-[20px] text-gray-500 me-4' />
                    <div className='me-4 text-gray-500'>Sort: </div>
                    <div>{sort}</div>
                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                        <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                            {sortlist.map((item, index) => (
                                <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => {
                                    setSort(item.name)
                                    sortProcess(item)
                                }

                                }>{item.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='md:w-[20%] ms-2 cursor-pointer flex items-center group relative md:mb-0 mb-3'>
                    <FontAwesomeIcon icon={faFilter} className='h-[20px] w-[20px] text-gray-500 me-4' />
                    <div className='me-4 text-gray-500'>Filter: </div>
                    <div>{star}</div>
                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                        <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                            {starlist.map((item, index) => (
                                <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => {
                                    setStar(item.name)
                                    handleFiter(item)
                                }}>{item.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {rows.map((item, index) => (
                    <div key={index}> <CommentItem comment={item} /> </div>
                ))}
            </div>
            <div className='flex justify-end me-4'>
                <Pagination count={totalPage} color="primary" onChange={handleChange} />
            </div>
            <ModalLoading open={pending} title={'Đang tải'} />
        </div>
    );
}

export default ListComment;