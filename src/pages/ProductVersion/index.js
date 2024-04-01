import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import { VersionItem } from '~/components/Item';
import MultiSelectComp from '~/components/MultiSelectComp';
import ModalComp from '~/components/ModalComp';
import Input from '~/components/Input';
const rows = [
    {
        VersionId: 'v01',
        ColorName: 'xanh - vien luc',
        SizeName: '38',
        Quantity: '30',
    },
    {
        VersionId: 'v01',
        ColorName: 'xanh - vien luc',
        SizeName: '39',
        Quantity: '30',
    },
    {
        VersionId: 'v01',
        ColorName: 'xanh - vien luc',
        SizeName: '40',
        Quantity: '30',
    },
    {
        VersionId: 'v01',
        ColorName: 'xanh - vien luc',
        SizeName: '41',
        Quantity: '30',
    },
]

const optionsColor = [
    { label: 'Xanh', value: 'Xanh' },
    { label: 'Vang', value: 'Vang' },
    { label: 'Do', value: 'Do' },
    { label: 'Luc', value: 'Luc' },
]
const optionsSize = [
    { label: '38', value: '38' },
    { label: '39', value: '39' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
]

const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
function ProductVersion() {
    const navigate = useNavigate();
    const product = useParams();

    //version modal
    const [version, setVersion] = useState({
        VersionId: '',
        ColorName: '',
        SizeName: '',
        Quantity: '',
    })
    const [quantity, setQuantity] = useState(0)
    const [errorName, setErrorName] = useState('');

    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };

    const handleFilter = async () => {

        handleCloseFilter();
    }


    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);


    // Modal
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
        setErrorName('')
    };

    // Submit Modal
    const [errorType, setErrorType] = useState('');
    const handleValidation = () => {
        if (quantity === '') setErrorName('Không được để trống')
    }

    //Row Clicked
    const onRowClicked = useCallback((row) => {
        setVersion(row)
        setQuantity(row.Quantity)
        setOpenModal(true)
    }, []);
    return (
        <div className='container'>
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
                            pd000001
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
                            Giày nam sneaker độn đế 5cm Wataa Phản Quang Đêm cực chất - MinhNhat
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
                            Nike
                        </div>
                    </div>

                </div>

            </div>
            <div className='frame'>
                Danh sách các phiên bản
                <hr className='my-3' />
                <List
                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên thương hiệu '}
                    search={search}
                    handleSearch={handleSearch}
                    // handleKeyDown={handleKeyDown}
                    filterComponent={
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
                    }
                    // TABLE
                    pagination
                    onRowClicked={onRowClicked}
                    itemComponent={VersionItem}
                    data={rows}
                    pending={pending}


                    // PAGINATION
                    totalRows={12}
                // handlePerRowsChange={handlePerRowsChange}
                // handlePageChange={handlePageChange}
                // SORT
                // handleSort={handleSort}
                />
            </div>
            <ModalComp
                open={openModal}
                handleClose={handleCloseModal}
                title="Cập nhật phiên bản"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleValidation()}>
                            Cập nhật
                        </button>
                        <button className='bg-white ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid'>
                            Xóa
                        </button>
                    </div>
                }
            >
                <div className='lg:grid lg:grid-cols-2'>
                    <div className='flex my-4'>
                        <div className='min-w-[120px] md:min-w-[150px]'>
                            Mã phiên bản
                        </div>
                        <div className='min-w-[20px]'>
                            :
                        </div>
                        <div>
                            {version.VersionId}
                        </div>
                    </div>
                    <div className='flex my-4'>
                        <div className='min-w-[120px] md:min-w-[150px]'>
                            Màu sắc
                        </div>
                        <div className='min-w-[20px]'>
                            :
                        </div>
                        <div>
                            {version.ColorName}
                        </div>
                    </div>
                    <div className='flex my-4'>
                        <div className='min-w-[120px] md:min-w-[150px]'>
                            Kích cỡ
                        </div>
                        <div className='min-w-[20px]'>
                            :
                        </div>
                        <div>
                            {version.SizeName}
                        </div>
                    </div>


                </div>
                <Input
                    title={'Áp dụng từ'}
                    value={quantity}
                    required={true}
                    onChange={(value) => setQuantity(
                        removeNonNumeric(
                            value,
                        ),
                    )}
                    className='my-[20px]'
                    error={errorName}
                ></Input>
            </ModalComp>
        </div>
    );
}

export default ProductVersion;