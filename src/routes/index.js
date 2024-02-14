import HomePage from "~/pages/HomePage";
import ProductList from "~/pages/ProductList";
import PromotionList from "~/pages/PromotionList";
import { DefaultLayoutAdmin } from "~/components/layouts";
import { DefaultLayoutClient } from "~/components/layouts";
const publicRoutes = [
    {
        path: '/products',
        component: ProductList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách sản phẩm',
        back: true
    },
    {
        path: '/promotion',
        component: PromotionList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách khuyến mãi',
        back: true
    },
];

const privateRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: DefaultLayoutClient
    },
];

export { publicRoutes, privateRoutes };
