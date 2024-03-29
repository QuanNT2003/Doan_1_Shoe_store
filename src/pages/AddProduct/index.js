import React, { useState } from 'react';
import { faCircleXmark, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '~/components/Input';
import MultiSelectComp from '~/components/MultiSelectComp';
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
function AddProduct() {
    // OPTIONS
    const [optionsLSP, setOptionsLSP] = useState([
        {
            label: 'dạ hội',
            value: ''
        },
        {
            label: 'thể thao',
            value: ''
        },
        {
            label: 'đời sống',
            value: ''
        },
    ]);
    const [optionsSupplier, setOptionsSupplier] = useState([
        {
            label: 'dạ hội',
            value: ''
        },
        {
            label: 'thể thao',
            value: ''
        },
        {
            label: 'đời sống',
            value: ''
        },
    ]);
    const [optionsMS, setOptionsMS] = useState([
        {
            label: 'dạ hội',
            value: 'dạ hội'
        },
        {
            label: 'thể thao',
            value: 'thể thao'
        },
        {
            label: 'đời sống',
            value: 'đời sống'
        },
    ]);
    const [optionsSize, setOptionsSize] = useState([
        {
            label: '37',
            value: '37'
        },
        {
            label: '38',
            value: '38'
        },
        {
            label: '39',
            value: '39'
        },
    ]);


    // SELECTED
    const [selectedLSP, setSelectedLSP] = useState();
    const [selectedSupplier, setSelectedSupplier] = useState();
    const [selectedMS, setSelectedMS] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    // PRODUCTTYPE
    const [productType, setProductType] = useState('');
    const onChangeProductType = (item) => {
        setProductType(item.label);
        setSelectedLSP(item);


    };
    // SUPPLIER
    const [supplier, setSupplier] = useState('');
    const [errorSupplier, setErrorSupplier] = useState('');

    // NAME
    const [name, setName] = useState('');
    const onChangeName = (value) => {
        setName(value);
    };
    const [errorName, setErrorName] = useState('');

    // DISCRIPTION
    const [desc, setDesc] = useState('');
    const onChangeDesc = (value) => {
        setDesc(value);
    };

    // COST
    const [cost, setCost] = useState('0');
    const onChangeCost = (number) => {
        setCost(number);
    };

    // PRICE
    const [price, setPrice] = useState('0');
    const onChangePrice = (number) => {
        setPrice(number);
    };

    //Discount
    const [discount, setDiscount] = useState(0);

    // URL IMAGE
    const [images, setImages] = useState([]);

    // IMAGES
    const [files, setFiles] = useState([]);
    const [fileRemove, setFileRemove] = useState();
    const [filesError, setFilesError] = useState(false);
    const uploadImages = async (files) => {

    }

    const deleteImages = async (blobName) => {

    }
    const handleAddImages = (e) => {
        if (e.target.files.length + files.length < 6) {
            const arr = Array.from(e.target.files).map((file) => {
                file.preview = URL.createObjectURL(file);
                return file;
            });

            setFiles((prev) => {

                uploadImages([...arr, ...prev]);

                return [...arr, ...prev];
            });

        } else {
            setFilesError(true);
        }


        e.target.value = null;
    };
    const handleRemoveImage = (index) => {
        console.log(files[index], images[index]);

        setFileRemove(files[index]);
        const newFiles = files;
        files.splice(index, 1);
        setFiles(newFiles);


        // const a = images[index].split('/');
        // deleteImages(a[a.length - 1]);
    };

    const submit = () => {
        const obj = {
            image: files,
            name: name,
            description: desc,
            productstype: selectedLSP,
            supplier: selectedSupplier,
            color: selectedMS,
            size: selectedSize,
            cost: cost,
            price: price,
        }

        console.log(obj)
    }
    return (
        <div className='container'>
            <div className='mt-6 lg:grid lg:grid-cols-5'>
                <div className='frame lg:col-span-3'>
                    Ảnh sản phẩm
                    <hr />
                    <div className='flex mt-5'>
                        {/* {
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
                        } */}

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
                                    src={file.preview}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                    <div className='mt-5'>
                        Thông tin chung
                        <hr />
                        <Input
                            title={'Tên sản phẩm'}
                            required
                            className='my-5'
                            value={name}
                            onChange={onChangeName}
                            error={errorName}
                        />

                        <Input
                            title={'Mô tả sản phẩm'}
                            value={desc}
                            onChange={onChangeDesc}
                            textarea
                            rows={5}
                        />
                    </div>



                </div>
                <div className='frame lg:col-span-2'>
                    Thông tin bổ sung
                    <hr />
                    <Input
                        className='mt-3 mb-3'
                        title={'Loại sản phẩm'}
                        items={optionsLSP}
                        value={productType}
                        handleClickAction={onChangeProductType}
                        readOnly
                    />
                    <Input
                        className='mt-3 mb-3'
                        title={'Thương hiệu'}
                        items={optionsSupplier}
                        value={supplier}
                        onChange={(value) => {
                            setSupplier(value);
                        }}
                        handleClickAction={(item) => {
                            setSupplier(item.label);
                            setSelectedSupplier(item);
                        }}
                    />
                    <MultiSelectComp
                        options={optionsMS}
                        placeholder={'Màu sắc'}
                        selected={selectedMS}
                        setSelected={setSelectedMS}
                        hasSelectAll={true}
                    />
                    <MultiSelectComp
                        options={optionsSize}
                        placeholder={'Kích cỡ'}
                        selected={selectedSize}
                        setSelected={setSelectedSize}
                        hasSelectAll={true}
                    />
                </div>
                <div className='frame lg:col-span-3'>
                    Giá bán
                    <hr />
                    <div className='md:flex mt-4'>
                        <Input
                            title={'Giá nhập'}
                            className='md:w-[50%] md:mr-[10px]'
                            required
                            money
                            value={cost}
                            onChangeMoney={onChangeCost}
                        />
                        <Input
                            title={'Giá bán'}
                            className='md:w-[50%] md:ml-[10px]'
                            required
                            money
                            value={price}
                            onChangeMoney={onChangePrice}
                        />


                    </div>
                    <div className='mt-4'>
                        Khuyến mãi
                        <div className='flex'>
                            <input className='border-custom number-nospin rounded w-[90%] md:w-[50%] me-5 py-1 px-[10px] text-[14px] text-end'
                                value={discount}
                                onChange={(e) => {
                                    let value = removeNonNumeric(e.target.value);

                                    if (value > 100) e.target.value = 100;
                                    else if (value < 0) e.target.value = 0;


                                    if (e.target.value === '') e.target.value = 0;


                                    setDiscount(e.target.value);
                                }} inputMode='numeric' />
                            <span>%</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-[90%] mx-auto text-end'>
                <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => submit()}>
                    Lưu
                </button>
            </div>
        </div>

    );
}

export default AddProduct;