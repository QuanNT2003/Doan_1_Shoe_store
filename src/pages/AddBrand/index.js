import React, { useContext, useEffect, useState } from 'react';
import { faCircleXmark, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '~/components/Input';
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import * as ImageServices from '~/apiServices/imageServices';
import * as BrandService from '~/apiServices/brandServices'
import { useNavigate } from 'react-router-dom';

function AddBrand() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setMail] = useState('');
    const [web, setWeb] = useState('');
    const [nation, setNation] = useState('');
    const [errorName, setErrorName] = useState('');
    // URL IMAGE
    const [images, setImages] = useState();

    // IMAGES
    const [files, setFiles] = useState([]);


    //Date
    const [day, setDay] = useState(new Date())
    // const addImages = async (file) => {
    //     const obj = {
    //         images: file
    //     }
    //     const fetchApi = async () => {
    //         const result = await ImageServices.AddImages(obj)
    //             .catch((error) => {
    //                 console.log(error);
    //                 toastContext.notify('error', 'Có lỗi xảy ra');
    //             });
    //         if (result) {
    //             setImages(result.data)
    //         }
    //     }

    //     fetchApi();
    // }
    const submit = () => {

        if (name === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa nhập tên');
        } else {
            setLoading(true);
            console.log(images)
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
                    const obj = {
                        name: name,
                        note: note,
                        phone: phone,
                        web: web,
                        email: email,
                        nation: nation,
                        image: resultImage.data
                    }

                    console.log(obj)
                    const result = await BrandService.CreateBrand(obj)
                        .catch((error) => {
                            console.log(error);
                            setLoading(false);
                            toastContext.notify('error', 'Có lỗi xảy ra');
                        });

                    if (result) {
                        setLoading(false);
                        console.log(result)
                        toastContext.notify('success', 'Tạo thương hiệu thành công');
                        navigate('/brands/details/' + result.data.brandId);
                    }
                }

            }

            fetchApi();
        }
    }
    const handleAddImages = async (e) => {
        const file = e.target.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setDay(new Date())
            files.push(reader.result)
            // addImages(reader.result)

        }

    }

    const handleRemoveImage = () => {
        setFiles([])

    };
    useEffect(() => {
        // console.log(files)
    }, [day]);
    return (
        <div>
            <div className='frame'>
                Ảnh thương hiệu
                <hr />
                <div className='flex mt-5'>
                    {
                        files.length === 0 ? <div>
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
                        </div> :
                            <div className='group w-[90px] h-[90px] rounded-[3px] m-[5px] relative select-none'>
                                <div
                                    className='absolute top-0 right-0 bg-white p-[5px] rounded-[999px] w-[20px] h-[20px] hidden justify-center items-center mt-[2px] mr-[2px] mb-[2px] ml-[2px] hover:cursor-pointer group-hover:flex'
                                    onClick={() =>
                                        handleRemoveImage()
                                    }
                                >
                                    <FontAwesomeIcon
                                        className='text-red-600'
                                        icon={faXmark}
                                    />
                                </div>
                                <img
                                    className='w-fit h-fit rounded-[3px] max-w-[90px] max-h-[80px]'
                                    src={files[0]}
                                    alt=""
                                />
                            </div>



                    }




                </div>
            </div>
            <div className='frame'>
                Thông tin thương hiệu
                <hr />
                <div className='lg:grid lg:grid-cols-2 mt-8 gap-4'>
                    <div>
                        <Input
                            title={'Tên thương hiệu'}
                            required
                            value={name}
                            onChange={(value) => setName(value)}
                            className='mb-[20px]'
                            error={errorName}
                        ></Input>
                    </div>
                    <div>
                        <Input
                            title={'Số điện thoại'}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            className='mb-[20px]'
                        ></Input>
                    </div>
                    <div>
                        <Input
                            title={'Email'}
                            value={email}
                            onChange={(value) => setMail(value)}
                            className='mb-[20px]'
                        ></Input>
                    </div>
                    <div>
                        <Input
                            title={'Website'}
                            value={web}
                            onChange={(value) => setWeb(value)}
                            className='mb-[20px]'
                        ></Input>
                    </div>
                    <div>
                        <Input
                            title={'Quốc gia'}
                            value={nation}
                            onChange={(value) => setNation(value)}
                            className='mb-[20px]'
                        ></Input>
                    </div>
                </div>


                <div>
                    <Input
                        title={'Mô tả'}
                        value={note}
                        textarea={true}
                        onChange={(value) => setNote(value)}
                        className='mb-[20px]'
                        rows={4}
                    ></Input>
                </div>
            </div>
            <div className='w-[90%] mx-auto text-end'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submit()}>
                    Lưu
                </button>
            </div>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default AddBrand;