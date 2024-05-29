import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Rating from '@mui/material/Rating';
import ModalLoading from '~/components/ModalLoading';
import Input from '~/components/Input';
import * as ImageServices from '~/apiServices/imageServices'
import * as CommentServices from '~/apiServices/commentServices'
import { ToastContext } from '~/components/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function Comment({ item, handleCloseModal, update }) {

    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date());

    const [desc, setDesc] = useState('');
    const onChangeDesc = (value) => {
        setDesc(value);
    };
    const [star, setStar] = useState(0);
    // IMAGES
    const [files, setFiles] = useState([]);

    const handleAddImages = (e) => {
        if (e.target.files.length + files.length < 4) {
            const arr = Array.from(e.target.files).map((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend = () => {
                    files.push(reader.result)
                    setDay(new Date())
                }
            });



        }
        console.log(files);

    };
    const handleRemoveImage = (index) => {
        files.splice(index, 1)
        setDay(new Date())
    };

    useEffect(() => {
        const fetchApi = async () => {
            setObj(item)
        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    const handleComment = async () => {
        let newObj = obj;
        newObj['comment'] = true;
        setObj(newObj)
        setLoading(true);
        const fetchApi = async () => {
            const image = {
                images: files
            }
            console.log(image)
            const resultImage = await ImageServices.AddImages(image)
                .catch((error) => {
                    console.log(error);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });
            if (resultImage) {
                const comment = {
                    images: resultImage.data,
                    note: desc,
                    productId: item.product.productId,
                    user: JSON.parse(window.localStorage.getItem('user')),
                    star: star,
                    like: 0

                }
                const result = await CommentServices.CreateComment(comment)
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (result) {
                    setLoading(false);
                    console.log(result)
                    update()
                    toastContext.notify('success', 'Đã để lại bình luận');
                    handleCloseModal()
                }
            }

        }

        fetchApi();
    }
    return (

        <div>
            {
                item === '' ? (<div></div>) : (
                    <div className='flex mb-2'>
                        <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                            <img src={item.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                        </div>
                        <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                            <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                {item.product.name}
                            </div>
                            <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                {item.version.color.name}, Size : {item.version.size.name}
                            </div>
                            <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                {addCommas(item.product.price * (100 - item.product.discount) / 100)} đ  x {item.quantity}
                            </div>

                        </div>
                        <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                            Đơn giá : {addCommas(item.product.price * (100 - item.product.discount) / 100)} đ
                        </div>
                        <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                            SL : {item.quantity} sản phẩm
                        </div>
                    </div>
                )
            }

            <div className='mt-3'>
                <div className='font-bold mb-4'>Đánh giá sản phẩm</div>
                <Rating name="size-large" defaultValue={0} size="medium" className='mb-6' onChange={(e) => setStar(e.target.value)} />
            </div>
            <Input
                title={'Viết đánh giá'}
                value={desc}
                onChange={onChangeDesc}
                textarea
                rows={5}
            />
            <div className='mt-2 p-1'>
                <div>
                    Thêm hình ảnh
                </div>
                <div className='flex'>
                    <input
                        id="addImg"
                        type="file"
                        className='hidden'
                        accept="image/png,image/gif,image/jpeg"
                        multiple
                        onChange={handleAddImages}
                    />
                    <label
                        htmlFor="addImg"
                        className='w-[90px] h-[90px] border-[1px] border-dashed border-[#d3d5d7] rounded-[3px] flex justify-center items-center m-[5px] hover:cursor-pointer'
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </label>
                    {files.map((file, index) => (
                        <div key={index} className='group w-[90px] h-[90px] rounded-[3px] m-[5px] relative select-none'>
                            <div
                                className='absolute top-0 right-0 bg-white p-[5px] rounded-[999px] w-[20px] h-[20px] hidden justify-center items-center mt-[2px] mr-[2px] mb-[2px] ml-[2px] hover:cursor-pointer group-hover:flex'
                                onClick={() =>
                                    handleRemoveImage(index)
                                }
                            >
                                <FontAwesomeIcon
                                    className='text-red-600'
                                    icon={faXmark}
                                />
                            </div>
                            <img
                                className='w-[inherit] h-[inherit] rounded-[3px]'
                                src={file}
                                alt=""
                            />
                        </div>
                    ))}

                </div>

            </div>
            <div className='p-3 mt-3 flex justify-end '>

                <button className='bg-blue-500 ms-5 py-4 px-3 my-2 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => handleComment()}>
                    Bình luận
                </button>
            </div>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default Comment;