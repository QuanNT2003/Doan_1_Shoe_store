import React, { useContext, useEffect, useState } from 'react';
import { faCircleXmark, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '~/components/Input';
import MultiSelectComp from '~/components/MultiSelectComp';
import * as CategoryServices from '~/apiServices/categoryServices';
import * as ColorServices from '~/apiServices/colorServices';
import * as SizeServices from '~/apiServices/sizeServices';
import * as BrandServices from '~/apiServices/brandServices';
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import * as ImageServices from '~/apiServices/imageServices';
import * as ProductServices from '~/apiServices/productServices'
import { useNavigate } from 'react-router-dom';
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
const optionsClass = [
    {
        label: 'Nam'
    },
    {
        label: 'Nữ'
    },
    {
        label: 'Trẻ em'
    },
]
function AddProduct() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    // OPTIONS
    const [optionsLSP, setOptionsLSP] = useState([]);
    const [optionsSupplier, setOptionsSupplier] = useState([]);
    const [optionsMS, setOptionsMS] = useState([]);
    const [optionsSize, setOptionsSize] = useState([]);


    // SELECTED
    const [selectedLSP, setSelectedLSP] = useState();
    const [selectedSupplier, setSelectedSupplier] = useState();
    const [selectedMS, setSelectedMS] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    // PRODUCTTYPE
    const [productType, setProductType] = useState('');
    const [errorType, setErrorType] = useState('');
    const onChangeProductType = (item) => {
        setProductType(item.label);
        setSelectedLSP(item.obj);
        setErrorType('')


    };
    // SUPPLIER
    const [supplier, setSupplier] = useState('');
    const [errorSupplier, setErrorSupplier] = useState('');

    // CLASSIFY
    const [classify, setClassify] = useState('');
    const [errorClassify, setErrorClassify] = useState('');

    // NAME
    const [name, setName] = useState('');
    const onChangeName = (value) => {
        setName(value);
        setErrorName('')
    };
    const [errorName, setErrorName] = useState('');

    // DISCRIPTION
    const [desc, setDesc] = useState('');
    const onChangeDesc = (value) => {
        setDesc(value);
    };

    // COST
    const [cost, setCost] = useState('0');
    const [errorCost, setErrorCost] = useState('')
    const onChangeCost = (number) => {
        setCost(number);
        setErrorCost('')
    };

    // PRICE
    const [price, setPrice] = useState('0');
    const [errorPrice, setErrorPrice] = useState('')
    const onChangePrice = (number) => {
        setPrice(number);
        setErrorPrice('')
    };

    //Discount
    const [discount, setDiscount] = useState(0);

    // URL IMAGE
    const [images, setImages] = useState([]);

    // IMAGES
    const [files, setFiles] = useState([]);
    const uploadImages = async (files) => {

    }

    const deleteImages = async (blobName) => {

    }

    //Date
    const [day, setDay] = useState(new Date())

    const handleAddImages = (e) => {
        if (e.target.files.length + files.length < 7) {
            const arr = Array.from(e.target.files).map((file) => {

                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend = () => {
                    files.push(reader.result)
                    setDay(new Date())
                    // addImages(reader.result)

                }
            });
        }


        e.target.value = null;
    };
    const handleRemoveImage = (index) => {

        files.splice(index, 1);
        setDay(new Date())


        // const a = images[index].split('/');
        // deleteImages(a[a.length - 1]);
    };

    const submit = () => {
        if (name === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa nhập tên');
            setErrorName('Không được để trống')
        } else if (classify === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa chọn phân loại');
            setErrorClassify('Không được để trống')
        } else if (productType === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa chọn loại sản phẩm');
            setErrorType('Không được để trống')
        } else if (supplier === '') {
            setLoading(false);
            toastContext.notify('error', 'Chưa chọn thương hiệu');
            setErrorSupplier('Không được để trống')
        } else if (cost === '0') {
            setLoading(false);
            toastContext.notify('error', 'Chưa nhập giá mua');
            setErrorCost('Không được để trống')
        } else if (price === '0') {
            setLoading(false);
            toastContext.notify('error', 'Chưa nhập giá bán');
            setErrorPrice('Không được để trống')
        } else {
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
                    const obj = {
                        name: name,
                        description: desc,
                        cost: removeNonNumeric(cost),
                        price: removeNonNumeric(price),
                        star: 0,
                        classify: classify,
                        discount: removeNonNumeric(discount),
                        category: selectedLSP,
                        brand: selectedSupplier,
                        colors: selectedMS,
                        sizes: selectedSize,
                        images: resultImage.data,
                    }

                    console.log(obj)
                    const result = await ProductServices.CreateProduct(obj)
                        .catch((error) => {
                            console.log(error);
                            setLoading(false);
                            toastContext.notify('error', 'Có lỗi xảy ra');
                        });

                    if (result) {
                        setLoading(false);
                        console.log(result)
                        toastContext.notify('success', 'Tạo sản phẩm thành công');
                        navigate('/products/details/' + result.data.productId);
                    }
                }

            }

            fetchApi();
        }


    }


    const getBrand = async () => {
        const response = await BrandServices.getAllBrands()
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            console.log(response)
            const data = await response.data.map((cate) => ({ label: cate.brand.name, value: cate.categoryId, obj: cate.brand }));
            setOptionsSupplier(data);
        }
    }

    // GET DATA SUPPLIERS
    const getCate = async () => {
        const response = await CategoryServices.getAllCategorys(
        )
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            const data = await response.data.map((sup) => ({ label: sup.name, value: sup.supplierId, obj: sup }));
            setOptionsLSP(data);
        }
    };

    const getSize = async () => {
        const response = await SizeServices.getAllSizes()
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            const data = await response.data.map((cate) => ({ label: cate.name, value: cate }));
            setOptionsSize(data);
        }
    }

    // GET DATA SUPPLIERS
    const getColor = async () => {
        const response = await ColorServices.getAllColors(
        )
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            const data = await response.data.map((sup) => ({ label: sup.name, value: sup }));
            setOptionsMS(data);
        }
    };

    // GET DATA FOR FILTER
    useEffect(() => {
        getCate();
        getBrand();
        getSize();
        getColor();
        // eslint-disable-next-line no-use-before-define
    }, []);

    useEffect(() => {
        console.log(files)
    }, [day]);
    return (
        <div>
            <div className='mt-6 lg:grid lg:grid-cols-5'>
                <div className='frame lg:col-span-3'>
                    Ảnh sản phẩm
                    <hr />
                    <div className='flex mt-5'>

                        <input
                            id="addImg"
                            type="file"
                            className='hidden'
                            accept="image/png,image/gif,image/jpeg,image/webp"
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
                        error={errorType}
                    />
                    <Input
                        className='mt-3 mb-3'
                        title={'Thương hiệu'}
                        items={optionsSupplier}
                        value={supplier}
                        error={errorSupplier}
                        onChange={(value) => {
                            setSupplier(value);
                        }}
                        handleClickAction={(item) => {
                            setSupplier(item.label);
                            setSelectedSupplier(item.obj);
                            setErrorSupplier('')
                        }}
                    />
                    <Input
                        className='mt-3 mb-3'
                        title={'Phân loại'}
                        items={optionsClass}
                        value={classify}
                        error={errorClassify}
                        onChange={(value) => {
                            setClassify(value);
                        }}
                        handleClickAction={(item) => {
                            setClassify(item.label);
                            setErrorClassify('')
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
                            error={errorCost}
                            onChangeMoney={onChangeCost}
                        />
                        <Input
                            title={'Giá bán'}
                            className='md:w-[50%] md:ml-[10px]'
                            required
                            money
                            error={errorPrice}
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
                                }} type='number' />
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
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>

    );
}

export default AddProduct;