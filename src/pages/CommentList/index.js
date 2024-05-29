import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import { CommentItem } from '~/components/Item';
import * as CommentServices from '~/apiServices/commentServices'
import { ToastContext } from '~/components/ToastContext';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import ModalComp from '~/components/ModalComp';
import Input from '~/components/Input';
import ModalLoading from '~/components/ModalLoading';
const optionsTT = [
    { label: 'Đã duyệt', value: true },
    { label: 'Chưa duyệt', value: false },
];
function CommentList() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);

    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');

    // Options
    const [optionUser, setOptionUser] = useState([])
    const [optionProduct, setOptionProduct] = useState([])

    const [selectedUser, setSelectedUser] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedTT, setSelectedTT] = useState([])
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedProduct([])
        setSelectedUser([])
        setSelectedTT([])
    };
    const onRowClicked = useCallback((row) => {
        setObj(row)
        if (row.rep === true) setIsRep(true)
        setOpenModal(true)
    }, []);

    //Modal
    const [obj, setObj] = useState()
    const [openModal, setOpenModal] = useState(false);
    const [isRep, setIsRep] = useState(false)
    const [rep, setRep] = useState('')
    const handleCloseModal = () => {
        setOpenModal(false)
        setIsRep(true)
    };
    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        user,
        productId,
        approve
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(user && { user }),
            ...(productId && { productId }),
            ...(approve && { approve }),
        };

    }
    const handleFilter = async () => {
        setPage(1);
        getList(
            await createObjectQuery(
                1,
                limit,
                sortBy,
                orderBy,
                selectedUser,
                selectedProduct,
                selectedTT
            )
        );
        setDay(new Date())
        handleCloseFilter();
    };
    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);

        getList(
            await createObjectQuery(
                pageNumber,
                limit,
                sortBy,
                orderBy,
                selectedUser,
                selectedProduct,
                selectedTT
            )
        );
        setDay(new Date())

    }

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setPage(pageNumber);
        setLimit(newPerPage);

        getList(
            await createObjectQuery(
                pageNumber,
                newPerPage,
                sortBy,
                orderBy,
                selectedUser,
                selectedProduct,
                selectedTT
            )
        );
        setDay(new Date())

    }

    const handleSort = async (column, sortDirection) => {
        setSortBy(column.text);
        setOrderBy(sortDirection);
        setPage(1);
        console.log('handleSort');
        getList(
            await createObjectQuery(
                1,
                limit,
                column.text,
                sortDirection,
                selectedUser,
                selectedProduct,
                selectedTT
            )
        );

    };
    const getList = async (obj) => {
        setPending(true);

        const response = await CommentServices.getAllComment(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                    setTotalRows(0);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            console.log(response);
            setPending(false);
            setRows(response.data);
            setTotalRows(response.total);
            setObj(response.data[0])

        }
    }


    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    sortBy,
                    orderBy,

                ));
            getProduct();
            getUser();
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProduct = async () => {
        const response = await CommentServices.getProduct()
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
            const data = await response.data.map((nation) => ({ label: nation, value: nation }));
            setOptionProduct(data);
        }
    }

    const getUser = async () => {
        const response = await CommentServices.getUser()
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
            const data = await response.data.map((nation) => ({ label: nation.name, value: nation._id }));
            setOptionUser(data);
        }
    }

    const handleDelete = () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;


            const result = await CommentServices.deleteComment(obj.commentId)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã xóa');
                handleCloseModal()
                setDay(new Date());
                getList(
                    await createObjectQuery(
                        page,
                        limit,
                        sortBy,
                        orderBy,

                    ));
            }
        }

        fetchApi();
    }

    const handleApprove = () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;

            const newObj = {
                ...obj,
                approve: true
            }
            const result = await CommentServices.UpdateComment(obj.commentId, newObj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã duyệt');
                handleCloseModal()
                setDay(new Date());
                getList(
                    await createObjectQuery(
                        page,
                        limit,
                        sortBy,
                        orderBy,

                    ));
            }
        }

        fetchApi();
    }

    const handleRep = async () => {
        setLoading(true);
        const fetchApi = async () => {
            let isSuccess = true;

            const newObj = {
                ...obj,
                rep: true,
                rep_detail: {
                    note: rep,
                    like: 0
                }
            }
            const result = await CommentServices.UpdateComment(obj.commentId, newObj)
                .catch((err) => {
                    console.log(err);
                    isSuccess = false;
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (isSuccess) {
                setLoading(false);
                toastContext.notify('success', 'Đã duyệt');
                handleCloseModal()
                setDay(new Date());
                getList(
                    await createObjectQuery(
                        page,
                        limit,
                        sortBy,
                        orderBy,

                    ));
            }
        }

        fetchApi();
    }
    return (
        <div>
            <div className='frame'>
                <List
                    // TABLE
                    pagination
                    onRowClicked={onRowClicked}
                    itemComponent={CommentItem}
                    data={rows}
                    pending={pending}
                    filterComponent={
                        <Filter
                            open={openFilter}
                            handleClose={handleCloseFilter}
                            handleOpen={handleOpenFilter}
                            handleClearFilter={handleClearFilter}
                            handleFilter={handleFilter}
                        >
                            <MultiSelectComp

                                options={optionsTT}
                                placeholder={'Tình trạng'}
                                selected={selectedTT}
                                setSelected={setSelectedTT}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp

                                options={optionProduct}
                                placeholder={'Sản phẩm'}
                                selected={selectedProduct}
                                setSelected={setSelectedProduct}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp

                                options={optionUser}
                                placeholder={'Sản phẩm'}
                                selected={selectedUser}
                                setSelected={setSelectedUser}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }

                    // PAGINATION
                    totalRows={totalRows}
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                    // SORT
                    handleSort={handleSort}
                />
            </div>
            <ModalComp
                open={openModal}
                handleClose={handleCloseModal}
                title="Thêm mẫu màu mới"
                actionComponent={
                    <div className='flex'>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                            Quay lại
                        </button>
                        {
                            obj?.approve === false ? (<div>
                                <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleApprove()}>
                                    Duyệt
                                </button>
                                <button className='bg-red-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#e83a3a] cursor-pointer' onClick={() => handleDelete()}>
                                    Xóa bỏ
                                </button>
                            </div>) : (<div></div>)
                        }
                        {
                            isRep === false ? (<button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => setIsRep(true)}>
                                Trả lời
                            </button>) : (<div> </div>)
                        }
                        {
                            (isRep === true && obj?.rep === false) ?
                                (<button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleRep()}>
                                    Xác nhận
                                </button>) :
                                (<div></div>)
                        }
                    </div>
                }
            >
                <div className='md:flex'>
                    <div className='w-[50%] flex'>
                        <div>Mã sản phẩm :</div>
                        <div className='ms-3'>{obj?.productId}</div>
                    </div>
                    <div className='w-[50%] flex'>
                        <div>Khách hàng :</div>
                        <div className='ms-3'>{obj?.user.name}</div>
                    </div>
                </div>
                <div className='mt-4'>
                    <div>Nội dung :</div>
                    <div>{obj?.note}</div>
                </div>
                <div className='mt-4 flex mb-6'>
                    {
                        obj?.images.map((item, index) => (
                            <div key={index}>
                                <img
                                    className='w-fit h-fit min-w-[100px] me-2 rounded-[3px] max-w-[90px] max-h-[80px]'
                                    src={item.url}
                                    alt=""
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    obj?.rep === true ? (<div><div className='mt-4'>
                        <div>Trả lời :</div>
                        <div>{obj?.rep_detail?.note}</div>
                    </div> </div>) : (<div> </div>)
                }
                {
                    isRep === true && obj?.rep === false ? (<Input
                        title={'Trả lời bình luận'}
                        value={rep}
                        textarea={true}
                        onChange={(value) => setRep(value)}
                        className='mb-[20px]'
                        rows={4}
                    ></Input>
                    ) : (<div></div>)
                }

            </ModalComp>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default CommentList;