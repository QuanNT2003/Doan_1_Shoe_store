import { memo } from 'react';
import SearchBar from '~/components/SearchBar';

import Table from '~/components/Table';



function List({
    data,
    placeholderSearch,
    search,
    searchVisibility,
    handleSearch,
    setSearch,
    onRowClicked,
    pending,
    showSubHeader,
    handleSelectedItems,
    itemComponent,
    filterComponent,
    subHeaderComponent,
    selectableRows,
    pagination,
    clearSelectedRows,
    // PAGINATION REMOTE
    totalRows,
    handlePerRowsChange,
    handlePageChange,
    // SORT REMOTE
    handleSort,
    // 
    selectableRowDisabled,
}) {
    return (
        <div className='w-[100%] bg-white rounded-2xl p-5 select-none shadow-table'>
            <div>
                <div className='flex justify-center items-center flex-wrap'>
                    {searchVisibility && (
                        <SearchBar
                            className='flex-1'
                            placeholder={placeholderSearch}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={handleSearch}
                        />
                    )}

                    {filterComponent}
                </div>
                <div className='w-[100%] h-[100%] mt-[10px] overflow-y-auto'>
                    <Table
                        itemComponent={itemComponent}
                        data={data}
                        pending={pending}
                        showSubHeader={showSubHeader}
                        handleSelectedItems={handleSelectedItems}
                        subHeaderComponent={subHeaderComponent}
                        onRowClicked={onRowClicked}
                        selectableRows={selectableRows}
                        pagination={pagination}
                        clearSelectedRows={clearSelectedRows}
                        // PAGINATION REMOTE 
                        totalRows={totalRows}
                        handlePerRowsChange={handlePerRowsChange}
                        handlePageChange={handlePageChange}
                        // SORT REMOTE 
                        handleSort={handleSort}
                        // 
                        selectableRowDisabled={selectableRowDisabled}
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(List);
