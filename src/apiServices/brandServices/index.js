import * as request from '~/utils/request';

export const getAllBrands = async (params) => {
    try {
        const response = await request.getMethod('api/brand/get-all?', {
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

export const getBrandsForSale = async (price) => {
    try {
        const res = await request.getMethod(`api/brand/get-all?pageSize=${-1}&pageNumber=${1}&salesOrderPrice=${price}&statuses=running&isOutdated=false`);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getBrand = async (id) => {
    try {
        const res = await request.getMethod('api/brand/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateBrand = async (id, obj) => {
    try {
        const res = await request.putMethod('api/brand/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateBrand = async (obj) => {
    try {
        const res = await request.postMethod('api/brand/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteBrand = async (id) => {
    try {
        const res = await request.deleteMethod('api/brand/delete-brand/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}