import { MultiSelect } from 'react-multi-select-component';
import { memo } from 'react';



function MultiSelectComp({
    options,
    selected,
    setSelected,
    hasSelectAll,
    placeholder,
}) {


    return (
        <div className='text-sm bg-white'>
            <div className='font-medium mb-[2px] text-sm'>{placeholder}</div>

            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                hasSelectAll={hasSelectAll}
                overrideStrings={{
                    selectAll: 'Tất cả',
                    search: 'Tìm kiếm...',
                    selectAllFiltered: 'Tất cả (theo tìm kiếm)',
                    noOptions: 'Không có kết quả',
                    selectSomeItems: `Chọn ${placeholder.charAt(0).toLowerCase() +
                        placeholder.slice(1)
                        }`,
                    allItemsAreSelected: 'Tất cả',
                }}
            />
        </div>
    );
}

export default memo(MultiSelectComp);
