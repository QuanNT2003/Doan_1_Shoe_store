import * as request from '~/utils/request';

export const CreatePromotionCart = async (obj) => {
    try {
        const res = await request.postMethod('api/discountCart/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}