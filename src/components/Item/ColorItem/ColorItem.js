export const ColorItem = [
    {
        name: 'Mã mẫu màu',
        minWidth: '150px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-sm text-[--primary]' data-tag="allowRowEvents">
                {row.colorId}
            </div>
        ),
    },
    {
        name: 'Tên mẫu màu',
        minWidth: '200px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {row.name}
            </div>
        ),
    },
    {
        name: 'Màu số một',
        minWidth: '150px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-sm flex justify-center items-center' data-tag="allowRowEvents">
                {row.colorOne}
                <div
                    className='min-h-[35px] min-w-[35px] bg-no-repeat bg-center bg-cover ml-[15px]'
                    style={{
                        backgroundColor: row.colorCodeOne,
                        borderRadius: 10
                    }}
                    data-tag="allowRowEvents"
                ></div>
            </div>
        ),
    },
    {
        name: 'Màu số hai',
        minWidth: '150px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-sm flex justify-center items-center' data-tag="allowRowEvents">
                {row.colorTwo}
                {
                    row.colorTwo === 'none' ? <div></div> : <div
                        className='min-h-[35px] min-w-[35px] bg-no-repeat bg-center bg-cover ml-[15px]'
                        style={{
                            backgroundColor: row.colorCodeTwo,
                            borderRadius: 10
                        }}
                        data-tag="allowRowEvents"
                    ></div>
                }

            </div>
        ),
    },
]