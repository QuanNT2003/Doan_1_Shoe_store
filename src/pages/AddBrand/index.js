import React, { useContext, useState } from 'react';
import { faCircleXmark, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '~/components/Input';
import * as ImageServices from '~/apiServices/imageServices';
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
function AddBrand() {
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
    const [images, setImages] = useState([]);

    // IMAGES
    const [files, setFiles] = useState();
    const [fileRemove, setFileRemove] = useState();
    const [filesError, setFilesError] = useState(false);
    const uploadImages = async (files) => {
        // try {
        //     let formData = new FormData();
        //     files.map((file) => {
        //         formData.append('image', file);
        //     });
        //     console.log(formData.getAll('image'))

        //     const res = await fetch(`http://localhost:3001/api/uploadImages/upload`, {
        //         method: "POST",
        //         body: formData,
        //     });
        //     if (res.ok) {

        //     }
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false);
        //     toastContext.notify('error', 'Có lỗi xảy ra');
        // }
    };

    const deleteImages = async (blobName) => {

    }

    const handleAddImages = async (e) => {
        // let formData = new FormData();
        // Array.from(e.target.files).forEach((file) => {
        //     formData.append("image", file);
        // });
        // const arr = Array.from(e.target.files).map((file) => {
        //     file.preview = URL.createObjectURL(file);
        //     return file;
        // });
        // console.log(arr)
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        console.log(formData.getAll('image'))
        const fetchApi = async () => {
            const result = await ImageServices.AddImages(formData)
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });
            console.log(result)

            e.target.value = null;
        }

        fetchApi();
    }

    const handleRemoveImage = (index) => {
        setFiles(undefined)
    };

    return (
        <div>
            <div className='frame'>
                Ảnh thương hiệu
                <hr />
                <div className='flex mt-5'>
                    {
                        files === undefined ? <div>
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
                                    className='w-[inherit] h-[inherit] rounded-[3px]'
                                    src={files?.preview}
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
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => console.log(files)}>
                    Lưu
                </button>
            </div>
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default AddBrand;