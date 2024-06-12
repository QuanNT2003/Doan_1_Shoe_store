import noImage from '~/assets/images/no-image.png';

export const BrandItem = [
    {
        name: 'Mã thương hiệu',
        MinWidth: '250px',
        center: 'true',
        cell: (row) => (
            <div
                key={row.productId}
                className='flex justify-start items-start pt-[10px] pb-[10px]'
                data-tag="allowRowEvents"
            >
                <div
                    className='h-[50px] w-[50px] bg-no-repeat bg-center mr-[30px] bg-contain'
                    style={{
                        backgroundImage: `url('${row.brand?.image[0]?.url ? row.brand?.image[0]?.url : noImage}')`,
                    }}
                    data-tag="allowRowEvents"
                ></div>
                <div
                    // className={cx('product-id-name')}
                    data-tag="allowRowEvents"
                >
                    <div className='font-bold mb-[2px]' data-tag="allowRowEvents">
                        {row.brand.brandId}
                    </div>
                    <div
                        className='line-clamp-2 text-ellipsis w-[90px]'
                        data-tag="allowRowEvents"
                    >
                        {row.brand.name}
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
                {row.brand.nation}
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
                {row.brand.email}
            </div>
        ),
    },
    {
        name: 'Website chính thức',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {row.brand.web}
            </div>
        ),
    },
]