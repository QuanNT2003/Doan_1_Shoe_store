import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSort,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import CommentItem from '../Comment_Item';
import Pagination from '@mui/material/Pagination';
const sortlist = [
    {
        name: 'Gần đây',
    },
    {
        name: 'Đánh giá: Từ cao tới thấp',
    },
    {
        name: 'Đánh giá: Từ thấp tới cao',
    },
]
const starlist = [
    {
        name: 'Tất cả',
    },
    {
        name: '1 sao',
    },
    {
        name: '2 sao',
    },
    {
        name: '3 sao',
    },
    {
        name: '4 sao',
    },
    {
        name: '5 sao',
    },
]
const commentlist = [
    {
        id: 1,
        user: {
            name: 'Ngô Trung Quân',
            image: '/static/images/avatar/2.jp'
        },
        rating: 4,
        date: '20/04/2024',
        content: ' Sản phẩm đóng gói cẩn thận. Nhân viên giao hàng nhiệt tình. Giao hàng nhanh đúng mẫu mang vừa chân. Có đều da giày lưới hơi mỏng hình ảnh chỉ mang tính chất minh hoạ nhận xu. Chất lượng sử dụng rồi mới biết',
        images: [
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },

        ],
        like: 10,
        rep: {
            date: '20/04/2024',
            content: 'Cảm ơn bạn đã mua và sử dụng sản phẩm của shop. chúc bạn có trải nghiệm mua sắm tuyệt vời và luôn mạnh khoẻ, thành công trong cuộc sống.',
            like: 10,
        }
    },
    {
        id: 1,
        user: {
            name: 'Ngô Trung Quân',
            image: '/static/images/avatar/2.jp'
        },
        rating: 4,
        date: '20/04/2024',
        content: ' Sản phẩm đóng gói cẩn thận. Nhân viên giao hàng nhiệt tình. Giao hàng nhanh đúng mẫu mang vừa chân. Có đều da giày lưới hơi mỏng hình ảnh chỉ mang tính chất minh hoạ nhận xu. Chất lượng sử dụng rồi mới biết',
        images: [
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },

        ],
        like: 10,
        rep: null,
    },
    {
        id: 1,
        user: {
            name: 'Ngô Trung Quân',
            image: '/static/images/avatar/2.jp'
        },
        rating: 4,
        date: '20/04/2024',
        content: ' Sản phẩm đóng gói cẩn thận. Nhân viên giao hàng nhiệt tình. Giao hàng nhanh đúng mẫu mang vừa chân. Có đều da giày lưới hơi mỏng hình ảnh chỉ mang tính chất minh hoạ nhận xu. Chất lượng sử dụng rồi mới biết',
        images: [

        ],
        like: 10,
        rep: {
            date: '20/04/2024',
            content: 'Cảm ơn bạn đã mua và sử dụng sản phẩm của shop. chúc bạn có trải nghiệm mua sắm tuyệt vời và luôn mạnh khoẻ, thành công trong cuộc sống.',
            like: 10,
        }
    },
    {
        id: 1,
        user: {
            name: 'Ngô Trung Quân',
            image: '/static/images/avatar/2.jp'
        },
        rating: 4,
        date: '20/04/2024',
        content: ' Sản phẩm đóng gói cẩn thận. Nhân viên giao hàng nhiệt tình. Giao hàng nhanh đúng mẫu mang vừa chân. Có đều da giày lưới hơi mỏng hình ảnh chỉ mang tính chất minh hoạ nhận xu. Chất lượng sử dụng rồi mới biết',
        images: [
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },

        ],
        like: 10,
        rep: {
            date: '20/04/2024',
            content: 'Cảm ơn bạn đã mua và sử dụng sản phẩm của shop. chúc bạn có trải nghiệm mua sắm tuyệt vời và luôn mạnh khoẻ, thành công trong cuộc sống.',
            like: 10,
        }
    },
    {
        id: 1,
        user: {
            name: 'Ngô Trung Quân',
            image: '/static/images/avatar/2.jp'
        },
        rating: 4,
        date: '20/04/2024',
        content: ' Sản phẩm đóng gói cẩn thận. Nhân viên giao hàng nhiệt tình. Giao hàng nhanh đúng mẫu mang vừa chân. Có đều da giày lưới hơi mỏng hình ảnh chỉ mang tính chất minh hoạ nhận xu. Chất lượng sử dụng rồi mới biết',
        images: [
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },
            {
                url: 'https://img.lazcdn.com/g/ugc/5df44fd4f8c944af8fd37e30301c2c29_1_1666138468.915184.jpg_500x500q80.jpg_.webp'
            },

        ],
        like: 10,
        rep: {
            date: '20/04/2024',
            content: 'Cảm ơn bạn đã mua và sử dụng sản phẩm của shop. chúc bạn có trải nghiệm mua sắm tuyệt vời và luôn mạnh khoẻ, thành công trong cuộc sống.',
            like: 10,
        }
    },
]
function ListComment({ }) {
    const [sort, setSort] = useState('Gần đây')
    const [star, setStar] = useState('Tất cả')
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div >
            <div className='flex border-t border-b min-h-[70px] items-center mb-4'>
                <div className='w-[55%] ms-2 border-e-2 h-[100%]'>
                    Product Reviews
                </div>
                <div className='w-[25%] ms-2 border-e-2 cursor-pointer flex items-center group relative'>
                    <FontAwesomeIcon icon={faSort} className='h-[20px] w-[20px] text-gray-500 me-4' />
                    <div className='me-4 text-gray-500'>Sort: </div>
                    <div>{sort}</div>
                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                        <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                            {sortlist.map((item, index) => (
                                <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => setSort(item.name)}>{item.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-[20%] ms-2 cursor-pointer flex items-center group relative'>
                    <FontAwesomeIcon icon={faFilter} className='h-[20px] w-[20px] text-gray-500 me-4' />
                    <div className='me-4 text-gray-500'>Filter: </div>
                    <div>{star}</div>
                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                        <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                            {starlist.map((item, index) => (
                                <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => setStar(item.name)}>{item.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {commentlist.map((item, index) => (
                    <div key={index}> <CommentItem comment={item} /> </div>
                ))}
            </div>
            <div className='flex justify-end me-4'>
                <Pagination count={10} color="primary" onChange={handleChange} />
            </div>

        </div>
    );
}

export default ListComment;