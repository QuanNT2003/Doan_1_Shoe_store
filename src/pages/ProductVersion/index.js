import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import { VersionItem } from '~/components/Item';
import MultiSelectComp from '~/components/MultiSelectComp';
import * as VersionServices from '~/apiServices/versionServices'
import * as ProductServices from '~/apiServices/productServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
function ProductVersion() {
    const navigate = useNavigate();
    const product = useParams();
    const toastContext = useContext(ToastContext);

    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        productId,
        color,
        size
    ) => {
        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(productId && { productId }),
            ...(color && { color }),
            ...(size && { size }),

        };
    }


    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedColor([])
        setSelectedSize([])
    };

    const handleFilter = async () => {
        setPage(1);
        getList(
            await createObjectQuery(
                1,
                limit,
                sortBy,
                orderBy,
                product.id,
                selectedColor,
                selectedSize
            )
        );
        handleCloseFilter();
    }

    const [optionsColor, setOptionsColor] = useState([])
    const [optionsSize, setOptionsSize] = useState([])

    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);

    const getList = async (obj) => {
        setPending(true);
        const response = await VersionServices.getAllVersions(obj)
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

        }
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
                product.id,
                selectedColor,
                selectedSize

            )
        );
        handleCloseFilter();

    };

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setPage(pageNumber);
        setLimit(newPerPage);
        console.log('handlePerRowsChange');
        getList(
            await createObjectQuery(
                pageNumber,
                newPerPage,
                sortBy,
                orderBy,
                product.id,
                selectedColor,
                selectedSize

            )
        );
    }

    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);
        console.log('handlePageChange');
        getList(
            await createObjectQuery(
                pageNumber,
                limit,
                sortBy,
                orderBy,
                product.id,
                selectedColor,
                selectedSize

            )
        );
    }
    useEffect(() => {
        const fetchApi = async () => {
            const result = await ProductServices.getProduct(product.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
            }
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    sortBy,
                    orderBy,
                    product.id
                ));

            const resultSize = await VersionServices.getVersionSize(product.id)
                .catch((err) => {
                    console.log(err);
                });

            if (resultSize) {
                const data = await resultSize.data.map((cate) => ({ label: cate.name, value: cate._id }));
                setOptionsSize(data)
                console.log(optionsSize);

            }
            const resultColor = await VersionServices.getVersionColor(product.id)
                .catch((err) => {
                    console.log(err);
                });

            if (resultColor) {
                const data = await resultColor.data.map((cate) => ({ label: cate.name, value: cate._id }));
                setOptionsColor(data)
                console.log(optionsColor);

            }
        }

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {
                obj === null ? (<ModalLoading open={true} title={'Đang tải'} />) : (
                    <div>
                        <div className='frame'>
                            Thông tin sản phẩm
                            <hr className='my-3' />
                            <div className='lg:grid lg:grid-cols-2'>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Mã sản phẩm
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {obj.productId}
                                    </div>
                                </div>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Tên sản phẩm
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {obj.name}
                                    </div>
                                </div>
                                <div className='flex my-4'>
                                    <div className='min-w-[120px] md:min-w-[150px]'>
                                        Nhà cung cấp
                                    </div>
                                    <div className='min-w-[20px]'>
                                        :
                                    </div>
                                    <div>
                                        {obj.brand.name}
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className='frame'>
                            Danh sách các phiên bản
                            <hr className='my-3' />
                            <List
                                // handleKeyDown={handleKeyDown}
                                filterComponent={
                                    <div className='flex'>
                                        <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate('/products/import/' + product.id)}>
                                            Nhập hàng
                                        </button>
                                        <Filter
                                            open={openFilter}
                                            handleClose={handleCloseFilter}
                                            handleOpen={handleOpenFilter}
                                            handleClearFilter={handleClearFilter}
                                            handleFilter={handleFilter}
                                        >
                                            <MultiSelectComp
                                                options={optionsColor}
                                                placeholder={'Màu sắc'}
                                                selected={selectedColor}
                                                setSelected={setSelectedColor}
                                                hasSelectAll={true}
                                            />
                                            <MultiSelectComp

                                                options={optionsSize}
                                                placeholder={'Size'}
                                                selected={selectedSize}
                                                setSelected={setSelectedSize}
                                                hasSelectAll={true}
                                            />
                                        </Filter>
                                    </div>

                                }
                                // TABLE
                                pagination
                                itemComponent={VersionItem}
                                data={rows}
                                pending={pending}

                                // PAGINATION
                                totalRows={totalRows}
                                handlePerRowsChange={handlePerRowsChange}
                                handlePageChange={handlePageChange}
                            // SORT
                            // handleSort={handleSort}
                            />
                        </div>

                    </div>
                )
            }
        </div>

    );
}

export default ProductVersion;