import React, { useState } from 'react';
import Input from '~/components/Input';
import SearchBar from '~/components/SearchBar';
import List from '~/components/List';
import { SampleItem } from '~/components/Item';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import SubHeader from '~/components/SubHeader';

function ProductList() {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const rows = [
        {
            id: 1,
            name: 'a',
            sex: 'a'
        },
        {
            id: 2,
            name: 'a',
            sex: 'a'
        },
        {
            id: 3,
            name: 'a',
            sex: 'a'
        },
    ]

    const [selectedTT, setSelectedTT] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };



    const handleFilter = async () => {

        handleCloseFilter();
    };

    const optionsTT = [
        { label: 'Đang giao dịch', value: true },
        { label: 'Ngừng giao dịch', value: false },
    ];

    const totalRows = 5
    return (
        <div className='text-3xl font-bold w-full'>
            <div className='frame'>
                List Product
                <List

                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên khuyến mãi'}
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
                                className=''
                                options={optionsTT}
                                placeholder={'Trạng thái'}
                                selected={selectedTT}
                                setSelected={setSelectedTT}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }
                    // TABLE
                    pagination
                    // onRowClicked={onRowClicked}
                    // showSubHeader={showSubHeader}
                    itemComponent={SampleItem}
                    selectableRows
                    data={rows}
                    showSubHeader
                    subHeaderComponent={
                        <SubHeader
                            // count={}
                            itemName={'sản phẩm'}
                            // onClickAction={}
                            items={[
                                'Xóa sản phẩm',
                            ]}
                        />
                    }
                    // pending={pending}
                    // handleSelectedItems={handleSelectedProducts}

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

export default ProductList;