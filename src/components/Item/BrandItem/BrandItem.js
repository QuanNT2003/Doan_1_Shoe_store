import noImage from '~/assets/images/no-image.png';

export const BrandItem = [
    {
        name: 'Mã thương hiệu',
        MinWidth: '250px',
        center: 'true',
        cell: (row) => (
            <div
                key={row.productId}
                className='flex justify-center items-center pt-[10px] pb-[10px]'
                data-tag="allowRowEvents"
            >
                <div
                    className='min-h-[50px] min-w-[50px] bg-no-repeat bg-center mr-[30px] bg-contain'
                    style={{
                        backgroundImage: `url('${row.image[0].url ? row.image[0].url : noImage}')`,
                    }}
                    data-tag="allowRowEvents"
                ></div>
                <div
                    // className={cx('product-id-name')}
                    data-tag="allowRowEvents"
                >
                    <div className='font-bold mb-[2px]' data-tag="allowRowEvents">
                        {row.brandId}
                    </div>
                    <div
                        className='line-clamp-2 text-ellipsis '
                        data-tag="allowRowEvents"
                    >
                        {row.name}
                    </div>
                </div>
            </div>
        ),
    },
    {
        name: 'Quốc gia',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {row.nation}
            </div>
        ),
    },
    // {
    //     name: 'Số mặt hàng đang bán',
    //     MinWidth: '180px',
    //     center: 'true',
    //     cell: (row) => (
    //         <div className='font-medium' tag="allowRowEvents">
    //             12
    //         </div>
    //     ),
    // },
    {
        name: 'Email',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {row.email}
            </div>
        ),
    },
    {
        name: 'Website chính thức',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {row.web}
            </div>
        ),
    },
]