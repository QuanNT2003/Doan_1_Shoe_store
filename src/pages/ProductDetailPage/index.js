import React, { useEffect, useState } from 'react';
import ImageCarousel from '~/components/ImageCarousel';
import SelectVersion from '~/components/SelectVersion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faMinus
} from '@fortawesome/free-solid-svg-icons';
import Select_Rating from '~/components/Select_Rating';
import ProductCarousel from '~/components/ProductCarousel';
import ModalComp from '~/components/ModalComp';
import Order from '~/components/Order';
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
const sizelist = [
    {
        id: 1,
        name: '38',
        value: '38',
    },
    {
        id: 1,
        name: '39',
        value: '39',
    },
    {
        id: 1,
        name: '40',
        value: '40',
    },
    {
        id: 1,
        name: '41',
        value: '41',
    }
]
const colorlist = [
    {
        id: 1,
        name: 'Xanh - Viền nhạt',
    },
    {
        id: 2,
        name: 'Lục - Viền vàng'
    }
]
const listProduct = [
    {
        productID: 2,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
    {
        productID: 1,
        name: 'GIÀY BÚP BÊ LOLITA DA BÓNG Rat la dep dep nhat he mat troi',
        images: [
            {
                url: 'https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2023/04/IMG_4329.jpg',
            }
        ],
        discount: 0,
        price: 200000,
    },
]

const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
function ProductPage() {

    // Add to cart
    const [size, setSize] = useState({})
    const [color, setColor] = useState({})
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {

    }, [quantity]);

    // Content
    const [showall, setShowAll] = useState(false)

    // Modal
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pending, setPending] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)

    };
    return (
        <div className='select-none'>
            <div className='bg-white m-5 mb-10 p-5 rounded-lg lg:grid lg:grid-cols-5'>
                <div className='lg:col-span-2 w-[80%] max-w-[80%] mx-auto'>
                    <ImageCarousel images={images} showThumbnails={true} />
                </div>
                <div className='p-4 pl-6 lg:col-span-3'>
                    <div className='font-bold text-[17px] mb-3'>[NEW] Giày thể thao nam mẫu mới, Giày thể thao nam Sneaker êm chân thoáng khí chạy bộ, thể dục - 4167_114743771</div>
                    <div className='mb-3'>Brand : Nike</div>
                    <div className='text-[25px] text-red-500 mb-2'>109.000 đ</div>
                    <div className=''>
                        <span className='me-3 line-through text-stone-400'>120.000 đ</span>
                        <span className='me-2'>-</span>
                        <span>70%</span>
                    </div>
                    <hr className='mt-4' />
                    <div>
                        <SelectVersion list={colorlist} title={'Màu sắc'} />
                        <SelectVersion list={sizelist} title={'Kích thước'} />
                        <div className='flex mt-5 items-center text-gray-500'>
                            <div className='w-[140px] flex flex-col justify-center'>
                                Chọn số lượng
                            </div>
                            <div className='w-[15px]'>
                                :
                            </div>
                            <div className='flex'>
                                <div className='w-[40px] h-[35px] flex justify-center items-center bg-stone-300 text-gray-500 rounded mx-3 cursor-pointer'
                                    onClick={() => {
                                        if (quantity > 1) setQuantity(quantity - 1)
                                    }}>
                                    <div className={quantity <= 1 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </div>
                                </div>
                                <input className='border-custom number-nospin rounded w-[50px] py-1 px-[10px] text-[14px] text-center hover:border-blue-500'
                                    value={quantity}
                                    onChange={(e) => {
                                        let value = removeNonNumeric(e.target.value);

                                        if (value < 1) e.target.value = 1;
                                        else if (value > 10) e.target.value = 10;
                                        if (value === '') e.target.value = 1;

                                        setQuantity(e.target.value);
                                    }} type='number' />
                                <div className='w-[40px] h-[35px] flex justify-center items-center bg-stone-300 text-gray-500 rounded mx-3 cursor-pointer'
                                    onClick={() => {
                                        if (quantity < 10) setQuantity(quantity + 1)
                                    }}>
                                    <div className={quantity >= 10 ? 'bg-stone-100 w-[100%] h-[100%] flex justify-center items-center text-gray-300 cursor-not-allowed' : ''}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-7 ssm:flex ssm:flex-row'>
                        <div className='ssm:w-[50%] mb-2 ssm:mb-0 flex justify-center items-center'>
                            <button className='bg-amber-500 py-5 px-3 rounded-lg w-[80%] text-white hover:bg-amber-400 cursor-pointer ' onClick={() => setOpenModal(true)}>
                                Mua Ngay
                            </button>
                        </div>
                        <div className='ssm:w-[50%] flex justify-center items-center'>
                            <button className='bg-orange-500 py-5 px-3 rounded-lg w-[80%] text-white hover:bg-orange-400 cursor-pointer '>
                                Thêm vào giỏ
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className='bg-white m-5 mb-10 p-5 rounded-lg'>
                <div className='font-bold mb-3 text-[17px]'>
                    Mô tả sản phẩm
                </div>
                <div className={showall === true ? 'text-[14px] mb-10 transition-all' : 'transition-all text-[14px] mb-10 line-clamp-4'}>
                    {/* 🥇 Giày thể thao với thiết kế cực đỉnh, cực thoáng khí, thông hơi, kháng khuẩn, với các đường nét, phối chi tiết sắc nét, bền đẹp- chuẩn form lên dáng cực đẹp, cực nhẹ, cực êm, cực cool.

                    🥈 Giày thể thao được làm từ chất liệu da cao cấp mềm mại, kết hợp với sợi thoáng khí bền đẹp theo thời gian- Đế được làm từ chất liệu cao su đúc nguyên khối mềm và chắc chắn, có độ ma sát cao, chống trơn trượt.

                    🥉 Hàng nhập cao cấp chăm chút tới từng đường kim mũi chỉ, đẹp tới từng chi tiết, Sẽ làm hài lòng tất cả khách hàng dù là khó tính nhất.

                    👉 Xuất xứ: Nhà máy giày quảng châu, trung quốc.

                    👉 Giày rất dễ phối đồ để đi chơi, đi làm, đi học… đều đẹp


⚡️ FLASH SALE: giảm tới 50% hôm nay và còn được tặng tất thoáng khí, khử khuẩn => Số lượng có hạn => Nhanh tay kẻo lỡ !

                    👉 Siêu phẩm giày thể thao cực chất với số lượng có hạn️! Trời ơi hàng hót mới về lên dáng cực đẹp mà còn được khuyến mãi giảm giá tới 50% và tặng tất khử khuẩn- Mua ngay kẻo lỡ !


                    👉 CHÍNH SÁCH BÁN HÀNG: VUA BUÔN SỈ cam kết chỉ bán hàng chuẩn loại 1 với giá gốc- Không bán hàng hàng loại 2, thứ cấp giá rẻ, hàng lỗi trôi nổi trên thị trường - Nên các bạn hãy là người tiêu dùng thông thái khi mua sản phẩm của VUA BUÔN SỈ để được hàng chuẩn shop giá tốt nhé !

👉 ĐẶC BIỆT: Bao đổi trả => Hoàn tiền 100% nếu không ưng ý !

                    👉 Mẫu giày thể thao này đang là trends hót nhất hiện nay- Hãy nhanh tay hốt ngay về tủ đồ của mình để bắt kịp xu hướng thời trang và thể hiện GU THỜI TRANG CỦA BẠN !


                    🏆 VUA BUÔN SỈ

                    Hệ thống nhập khẩu & phân phối giày dép, thời trang cao cấp !

Đặc biệt: => Bỏ sỉ cho đại lý, đầu mối, trung tâm thương mại, siêu thị, shop thời trang, giày dép... giá gốc tận xưởng.

                    ----------------------------------

                    👉 Các bạn muốn nhập sỉ thì inbox ngay cho VUA BUÔN SỈ để biết giá nhập sỉ tận gốc cực tốt nhé !

                    -------------------

                    👉 LƯU Ý KHÁCH SỈ: Phân loại size Mua sỉ là dành cho khách sỉ mua về bán lại, bán shop, cửa hàng, bán online, offline... bao lời ( shop nhập hàng trực tiếp từ nhà máy bên trung nên bạn sẽ được mua sỉ với giá gốc tận nhà máy, shop bao giá toàn quốc với sp cùng chất lượng cao nhé )

                    🎁 LỜI MUỐN NÓI! Nhận giày xong nếu hài lòng về sản phẩm mong các bạn sẽ có những phản hồi tích cực như Feedback hình ảnh hoặc đánh giá 5 sao. Mọi vấn đề làm bạn chưa hài lòng xin hãy inbox cho shop để được hỗ trợ trước khi đánh giá nhé. Cảm ơn bạn đã đặt giày. Đừng quên nhấn theo dõi nha! */}
                </div>
                <div className={showall === true ? 'hidden' : 'flex justify-center items-center'}>
                    <button className='bg-blue-500 mx-auto p-3 rounded-lg w-[30%] text-white hover:bg-blue-400 cursor-pointer ' onClick={() => setShowAll(true)}>
                        Xem Thêm
                    </button>
                </div>
                <div className={showall === false ? 'hidden' : 'flex justify-center items-center'}>
                    <button className='bg-orange-500 mx-auto p-3 rounded-lg w-[30%] text-white hover:bg-orange-400 cursor-pointer ' onClick={() => setShowAll(false)}>
                        Thu gọn
                    </button>
                </div>


            </div>
            <div className='bg-white m-5 mb-10 p-5 rounded-lg'>
                <Select_Rating />
            </div>
            <ProductCarousel title={'Sản phẩm tương tự'} listProduct={listProduct} path='/products' />
            <ModalComp
                open={openModal}
                handleClose={handleCloseModal}
                title="Đặt hàng"
                actionComponent={
                    <div>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleCloseModal()}>
                            Quay lại
                        </button>
                        <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' >
                            Thêm
                        </button>
                    </div>
                }
            >
                <Order />

            </ModalComp>
        </div>
    );
}

export default ProductPage;