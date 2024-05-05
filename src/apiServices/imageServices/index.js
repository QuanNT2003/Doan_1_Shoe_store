import * as request from '~/utils/request';

export const AddImages = async (obj) => {
    try {
        const res = await request.postMethod('api/uploadImages/upload', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}
