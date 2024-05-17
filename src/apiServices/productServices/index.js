import * as request from '~/utils/request';

export const getAllProducts = async (params) => {
    try {
        const response = await request.getMethod('api/product/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    return key + '=' + params[key];
                }).join('&');

                console.log(serializedParams);

                return serializedParams;
            },
        });

        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProductsForSale = async (price) => {
    try {
        const res = await request.getMethod(`api/product/get-all?pageSize=${-1}&pageNumber=${1}&salesOrderPrice=${price}&statuses=running&isOutdated=false`);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProduct = async (id) => {
    try {
        const res = await request.getMethod('api/product/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateProduct = async (id, obj) => {
    try {
        const res = await request.putMethod('api/product/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateProduct = async (obj) => {
    try {
        const res = await request.postMethod('api/product/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await request.deleteMethod('api/product/delete-Product/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}