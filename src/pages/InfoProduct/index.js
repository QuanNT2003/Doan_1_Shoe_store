import React from 'react';
import ImageCarousel from '~/components/ImageCarousel';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
const des = 'Nike là nhà cung cấp toàn cầu về giày, quần áo và dụng cụ thể thao số một thế giới. Được thành lập vào ngày 25 tháng 1 năm 1964 với tên Blue Ribbon Sports bởi Bill Bowerman và Phil Knight, sau đó chính thức có tên gọi là Nike vào ngày 30 tháng 5 năm 1971.'
const images = [
    {
        src: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/",
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
        src: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/",
    },
    {
        src: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
        src: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/",
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
        src: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/",
    },
    {
        src: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
];
const tag = [
    {
        name: 'trẻ em',
    },
    {
        name: 'dạ hội',
    },
    {
        name: 'quốc tế',
    },
    {
        name: 'rẻ',
    },
    {
        name: 'rẻ',
    },
    {
        name: 'trẻ em',
    },
    {
        name: 'dạ hội',
    },
    {
        name: 'quốc tế',
    },

]
function InfoProduct() {
    const navigate = useNavigate();
    const productID = useParams();
    return (
        <div className='container'>
            <div className='mt-6 w-[96%] mx-auto lg:grid lg:grid-cols-3'>
                <div className='frame lg:col-span-2 '>
                    Thông tin sản phẩm
                    <hr />
                    <div className='lg:grid lg:grid-cols-5 mt-5'>
                        <div className='lg:col-span-2 lg:ms-2'>
                            <ImageCarousel images={images} showThumbnails={true} />
                        </div>
                        <div className='lg:col-span-3 lg:ms-10'>
                            <div className='font-bold mb-3'>Giày nam sneaker độn đế 5cm Wataa Phản Quang Đêm cực chất - MinhNhat</div>
                            <div className='font-bold mb-3'>Mã sản phẩm :  pr0001</div>
                            <div className='font-bold mb-3 '>50.000 <sup>đ</sup> -<span className='text-[14px] ms-1'> 4 %</span> </div>
                            <div className='mb-3 flex'><div className='min-w-[130px]'>Loại sản phẩm</div> : <div className='ms-2 type'>Giày neaker</div></div>
                            <div className='mb-3 flex flex-wrap'><div className='min-w-[130px]'>Tag
                            </div>
                                :
                                {tag.map((item, index) => (
                                    <span key={index} className='type mb-2'>{item.name} </span>
                                ))}


                            </div>
                        </div>
                    </div>

                </div>
                <div className='frame lg:col-span-1 '>
                    Mô tả sản phẩm
                    <hr />
                    <div className='mt-4 text-[14px]'>
                        {des}
                    </div>

                </div>
                <div className='frame lg:col-span-2  mt-5'>
                    Giá bán
                    <hr />
                    <div className='lg:grid lg:grid-cols-2 mt-5'>
                        <div className='lg:col-span-1 flex my-3'>
                            <div className='min-w-[120px]'>Giá nhập</div>
                            <div className='min-w-[30px]'> : </div>
                            <div > 200.000đ</div>
                        </div>
                        <div className='lg:col-span-1 flex my-3'>
                            <div className='min-w-[120px]'>Giá bán</div>
                            <div className='min-w-[30px]'> : </div>
                            <div > 200.000đ</div>
                        </div>
                    </div>

                </div>
                <div className='frame lg:col-span-1 '>
                    Thông tin bổ sung
                    <hr className='mb-3' />
                    <div className='flex my-3'>
                        <div className='min-w-[220px]'>Số lượng sản phẩm còn</div>
                        <div className='min-w-[30px]'> : </div>
                        <div > 40</div>
                    </div>
                    <div className='flex my-3'>
                        <div className='min-w-[220px]'>Số lượng đã bán</div>
                        <div className='min-w-[30px]'> : </div>
                        <div > 40</div>
                    </div>
                    <div className='flex my-3'>
                        <div className='min-w-[220px]'>Đánh giá sản phẩm</div>
                        <div className='min-w-[30px]'> : </div>
                        <div > <Rating name="size-large" value={4} readOnly size="large" /> </div>
                    </div>
                </div>
            </div>
            <div className='frame grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 lg:flex lg:flex-row-reverse'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => navigate('/products/version/' + productID.id)}>
                    Quản lý phiên bản
                </button>
                <button className='bg-white py-4 px-3 rounded-lg min-w-[130px] text-blue-500 hover:bg-[#f8f8f9] cursor-pointer border-blue-500 border-[1px] border-solid' onClick={() => navigate('/products/update/' + productID.id)}>
                    Sửa
                </button>
                <button className='bg-white py-4 px-3 rounded-lg min-w-[130px] text-red-500 hover:bg-[#fef3f2] cursor-pointer border-red-500 border-[1px] border-solid'>
                    Xóa
                </button>
            </div>

        </div >
    );
}

export default InfoProduct;