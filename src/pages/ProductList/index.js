import React, { useState } from 'react';
import Input from '~/components/Input';
import SearchBar from '~/components/SearchBar';
import List from '~/components/List';
import { SampleItem } from '~/components/Item';

function ProductList() {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const rows = [
        // {
        //     id: 1,
        //     name: 'a',
        //     sex: 'a'
        // },
        // {
        //     id: 2,
        //     name: 'a',
        //     sex: 'a'
        // },
        // {
        //     id: 3,
        //     name: 'a',
        //     sex: 'a'
        // },
    ]

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

                    // TABLE
                    pagination
                    // onRowClicked={onRowClicked}
                    // showSubHeader={showSubHeader}
                    itemComponent={SampleItem}
                    data={rows}
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