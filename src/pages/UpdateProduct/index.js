import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleXmark, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '~/components/Input';
import * as CategoryServices from '~/apiServices/categoryServices';
import * as BrandServices from '~/apiServices/brandServices';
import * as ProductServices from '~/apiServices/productServices'
import { ToastContext } from '~/components/ToastContext';
import ModalLoading from '~/components/ModalLoading';
import * as ImageServices from '~/apiServices/imageServices';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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
const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
function UpdateProduct() {
    const navigate = useNavigate();
    const productID = useParams();
    const toastContext = useContext(ToastContext);

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [updatePage, setUpdatePage] = useState(new Date());
    // OPTIONS
    const [optionsLSP, setOptionsLSP] = useState([]);
    const [optionsSupplier, setOptionsSupplier] = useState([]);

    // SELECTED
    const [selectedLSP, setSelectedLSP] = useState();
    const [selectedSupplier, setSelectedSupplier] = useState();

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
    const [imagesDelete, setIamgesDelete] = useState([])
    const [submitImage, setSubmit] = useState([])
    // IMAGES
    const [files, setFiles] = useState([]);

    const handleAddImages = (e) => {
        if (e.target.files.length + files.length < 6) {
            const arr = Array.from(e.target.files).map((file) => {

                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend = () => {
                    files.push(reader.result)
                    setUpdatePage(new Date())
                    // addImages(reader.result)

                }
            });
        }


        e.target.value = null;
    };
    const handleRemoveImage = (index) => {

        imagesDelete.push(images[index])
        images.splice(index, 1);
        setUpdatePage(new Date())


        // const a = images[index].split('/');
        // deleteImages(a[a.length - 1]);
    };

    const handleRemoveFile = (index) => {
        files.splice(index, 1);
        setUpdatePage(new Date())
    }

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
                for (let image of images) {
                    submitImage.push(image)
                }
                for (let image of imagesDelete) {
                    const obj = {
                        publicId: image.publicId
                    }


                    const result = await ImageServices.DeleteImage(obj)
                        .catch((err) => {
                            console.log(err);
                        });
                    if (result) console.log(result)
                }
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
                    for (let image of resultImage.data) {
                        submitImage.push(image)
                    }
                    const obj = {
                        name: name,
                        description: desc,
                        cost: removeNonNumeric(cost),
                        price: removeNonNumeric(price),
                        classify: classify,
                        discount: removeNonNumeric(discount),
                        category: selectedLSP,
                        brand: selectedSupplier,
                        images: submitImage,
                    }

                    console.log(obj)
                    const result = await ProductServices.UpdateProduct(productID.id, obj)
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

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            getCate();
            getBrand();
            const result = await ProductServices.getProduct(productID.id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
                setObj(result.data);
                setName(result.data.name)
                setDesc(result.data.description)
                setImages(result.data.images)
                setCost(addCommas(result.data.cost))
                setPrice(addCommas(result.data.price))
                setClassify(result.data.classify)
                setProductType(result.data.category.name)
                setSupplier(result.data.brand.name)
                setSelectedLSP(result.data.category)
                setSelectedSupplier(result.data.brand)
                setDiscount(result.data.discount)
            }
        }

        fetchApi();
        setLoading(false)


        // eslint-disable-next-line no-use-before-define
    }, []);

    useEffect(() => {



        // eslint-disable-next-line no-use-before-define
    }, [updatePage]);
    return (
        <div>
            <div className='mt-6 lg:grid lg:grid-cols-5'>
                <div className='frame lg:col-span-3'>
                    Ảnh sản phẩm
                    <hr />
                    <div className='flex mt-5 flex-wrap'>
                        {
                            files.length + images.length < 6 ? (<div>
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
                            </div>) : (<div>

                            </div>)
                        }


                        {images.map((file, index) => (
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
                                    src={file.url}
                                    alt=""
                                />
                            </div>
                        ))}
                        {files.map((file, index) => (
                            <div key={index} className='group w-[90px] h-[90px] rounded-[3px] m-[5px] relative select-none'>
                                <div
                                    className='absolute top-0 right-0 bg-white p-[5px] rounded-[999px] w-[20px] h-[20px] hidden justify-center items-center mt-[2px] mr-[2px] mb-[2px] ml-[2px] hover:cursor-pointer group-hover:flex'
                                    onClick={() =>
                                        handleRemoveFile(index)
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
                            setSelectedSupplier(item.obj);
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
            <ModalLoading open={loading} title={'Đang tải'} />
        </div>
    );
}

export default UpdateProduct;