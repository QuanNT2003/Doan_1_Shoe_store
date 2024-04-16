import React from 'react';
import ImageCarousel from '~/components/ImageCarousel';
const images = [
    {
        src: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
        thumbnail: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
    },
    {
        src: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/1000/600/",
    },
    {
        src: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
        src: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
        thumbnail: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
    },
    {
        src: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
        src: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
        thumbnail: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
    },
    {
        src: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/1000/600/",
    },
    {
        src: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
        src: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
        thumbnail: "https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg",
    },
    {
        src: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
];
function ProductPage() {
    return (
        <div >
            <div className='bg-white m-5 mb-10 p-5 rounded-lg lg:flex'>
                <div className='lg:w-[45%] lg:min-w-[45%] w-[60%] max-w-[60%] mx-auto'>
                    <ImageCarousel images={images} showThumbnails={true} />
                </div>
                <div className='p-4 pl-6'>
                    <div className='font-bold text-[17px] mb-3'>[NEW] Giày thể thao nam mẫu mới, Giày thể thao nam Sneaker êm chân thoáng khí chạy bộ, thể dục - 4167_114743771</div>
                    <div className='mb-3'>Brand : Nike</div>
                    <div className='text-[25px] text-red-500 mb-2'>109.000 đ</div>
                    <div className=''>
                        <span className='me-3 line-through text-stone-400'>120.000 đ</span>
                        <span className='me-2'>-</span>
                        <span>70%</span>
                    </div>
                    <hr className='mt-4' />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;