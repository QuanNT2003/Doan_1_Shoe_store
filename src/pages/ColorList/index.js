import React, { useState } from 'react';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import SubHeader from '~/components/SubHeader';
import List from '~/components/List';
import { ColorItem } from '~/components/Item';

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

    const totalRows = 5
    return (
        <div className='container'>
            <div className='frame'>
                <LinkButton placeholder='Thêm mẫu màu' icon={<FontAwesomeIcon icon={faPlus} />} />
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
        </div>
    );
}

export default ColorList;