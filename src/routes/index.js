import HomePage from "~/pages/HomePage";
import ProductList from "~/pages/ProductList";
import PromotionList from "~/pages/PromotionList";
import OrderList from "~/pages/OrderList";
import CustomerList from "~/pages/CustomerList";
import AddPromotion from "~/pages/AddPromotion";
import BrandList from "~/pages/BrandList";
import ColorList from "~/pages/ColorList";
import InfoPromotion from "~/pages/InfoPromotion";
import AddBrand from "~/pages/AddBrand";
import UpdatePromotion from "~/pages/UpdatePromotion";
import { DefaultLayoutAdmin } from "~/components/layouts";
import { DefaultLayoutClient } from "~/components/layouts";
const publicRoutes = [
    {
        path: '/products',
        component: ProductList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách sản phẩm',
    },
    {
        path: '/promotions',
        component: PromotionList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách khuyến mãi',
    },
    {
        path: '/orders',
        component: OrderList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách đơn hàng',
    },
    {
        path: '/customers',
        component: CustomerList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách khách hàng',
    },
    {
        path: '/brands',
        component: BrandList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách thương hiệu',
    },
    {
        path: '/products/colors',
        component: ColorList,
        layout: DefaultLayoutAdmin,
        title: 'Các mẫu màu sắt',
        back: true,
    },
    {
        path: '/promotions/add',
        component: AddPromotion,
        layout: DefaultLayoutAdmin,
        title: 'Thêm khuyến mãi',
        back: true
    },
    {
        path: '/promotions/details/:id',
        component: InfoPromotion,
        layout: DefaultLayoutAdmin,
        title: 'Thông tin khuyến mãi',
        back: true
    },
    {
        path: '/promotions/update/:id',
        component: UpdatePromotion,
        layout: DefaultLayoutAdmin,
        title: 'Chỉnh sửa khuyến mãi',
        back: true
    },
    {
        path: '/brands/add',
        component: AddBrand,
        layout: DefaultLayoutAdmin,
        title: 'Thêm thương hiệu',
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
