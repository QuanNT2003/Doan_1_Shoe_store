import React, { useState } from 'react';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import SubHeader from '~/components/SubHeader';
import List from '~/components/List';
import { ColorItem } from '~/components/Item';
import ModalComp from '~/components/ModalComp';
import Input from '~/components/Input';
import ColorPicker from '~/components/ColorPicker';

const rows = [
    {
        colorId: 'color0001',
        name: 'Xám - sọc xanh',
        colorOne: 'white',
        colorCodeOne: '#fff7e7',
        colorTwo: 'xanh',
        colorCodeTwo: '#3a57e8',
    },
    {
        colorId: 'color0001',
        name: 'Trắng',
        colorOne: 'white',
        colorCodeOne: '',
        colorTwo: 'none',
        colorCodeTwo: '',
    },
    {
        colorId: 'color0001',
        name: 'Trắng',
        colorOne: 'white',
        colorCodeOne: '',
        colorTwo: 'none',
        colorCodeTwo: '',
    },
    {
        colorId: 'color0001',
        name: 'Trắng',
        colorOne: 'white',
        colorCodeOne: '',
        colorTwo: 'none',
        colorCodeTwo: '',
    },
]

function ColorList() {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    //SubHeader
    const [showSubHeader, setShowSubHeader] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedDelRows, setSelectedDelRows] = useState();

    const handleSelectedProducts = ({
        allSelected,
        selectedCount,
        selectedRows,
    }) => {
        selectedCount > 0 ? setShowSubHeader(true) : setShowSubHeader(false);
        setSelectedRow(selectedCount);
        setSelectedDelRows(selectedRows);
    };

    // Modal
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
        setErrorName('')
        setError(false)
        setErrorColor('')
        setName('')
        setColor1('')
        setColor2('')
    };

    // Submit Modal

    const handleValidation = () => {
        if (name === '') setErrorName('Không được để trống')
        if (color1 === '') {
            setError(true)
            setErrorColor('Không được để trống')
        }
    }

    // NAME
    const [name, setName] = useState('');
    const onChangeName = (value) => {
        setName(value);
    };
    const [errorName, setErrorName] = useState('');

    //Color
    const [color1, setColor1] = useState('')
    const [error, setError] = useState(false)
    const [errorColor, setErrorColor] = useState('')
    const [color2, setColor2] = useState('')
    const totalRows = 5
    return (
        <div>
            <div className='frame'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer flex items-center' onClick={() => setOpenModal(true)}>
                    <FontAwesomeIcon icon={faPlus} className='mx-2' />
                    Thêm mẫu màu
                </button>
            </div>
            <div className='frame'>
                <List
                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên mẫu màu'}
                    search={search}
                    handleSearch={handleSearch}
                    // handleKeyDown={handleKeyDown}

                    // TABLE
                    pagination
                    // onRowClicked={onRowClicked}
                    showSubHeader={showSubHeader}
                    itemComponent={ColorItem}
                    selectableRows
                    data={rows}
                    subHeaderComponent={
                        <SubHeader
                            count={selectedRow}
                            itemName={'sản phẩm'}
                            // onClickAction={}
                            items={[
                                'Xóa mẫu màu',
                            ]}
                        />
                    }
                    // pending={pending}
                    handleSelectedItems={handleSelectedProducts}

                    // PAGINATION
                    totalRows={totalRows}
                // handlePerRowsChange={handlePerRowsChange}
                // handlePageChange={handlePageChange}
                // SORT
                // handleSort={handleSort}
                />
            </div>
            <ModalComp
                open={openModal}
                handleClose={handleCloseModal}
                title="Thêm mẫu màu mới"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleValidation()}>
                            Thêm
                        </button>
                    </div>
                }
            >

                <Input
                    title={'Tên mẩu màu'}
                    required
                    className='my-5'
                    value={name}
                    onChange={onChangeName}
                    error={errorName}
                />
                <div className='md:grid md:grid-cols-2 gap-2'>
                    <div>
                        <Input
                            title={'Màu sắc chính'}
                            required
                            className='my-5'
                            value={name}
                            onChange={onChangeName}
                            error={errorName}
                        />
                        <ColorPicker handleChangeColor={setColor1} title={''} error={error} errorName={errorColor} required={true} />
                    </div>
                    <div>
                        <Input
                            title={'Màu phụ'}
                            className='my-5'
                            value={name}
                            onChange={onChangeName}
                            error={errorName}
                        />
                        <ColorPicker handleChangeColor={setColor2} title={''} />
                    </div>

                </div>
            </ModalComp>
        </div>
    );
}

export default ColorList;