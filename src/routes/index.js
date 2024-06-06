import HomePage from "~/pages/HomePage";
import ProductList from "~/pages/ProductList";
import PromotionList from "~/pages/PromotionList";
import OrderList from "~/pages/OrderList";
import CustomerList from "~/pages/CustomerList";
import BrandList from "~/pages/BrandList";
import ColorList from "~/pages/ColorList";
import ExchangeReturnList from "~/pages/ExchangeReturnList";
import AddPromotion from "~/pages/AddPromotion";
import InfoPromotion from "~/pages/InfoPromotion";
import UpdatePromotion from "~/pages/UpdatePromotion";
import AddBrand from "~/pages/AddBrand";
import InfoBrand from "~/pages/InfoBrand";
import UpdateBrand from "~/pages/UpdateBrand";
import Infocustomer from "~/pages/InfoCustomer";
import InfoOrder from "~/pages/InfoOrder";
import AddProduct from "~/pages/AddProduct";
import UpdateProduct from "~/pages/UpdateProduct";
import InfoProduct from "../pages/InfoProduct";
import InfoExchangeReturn from "~/pages/InfoExchangeReturn";
import ProductVersion from "../pages/ProductVersion";
import ProductPage from "~/pages/ProductDetailPage";
import BrandListPage from "~/pages/BrandListPage";
import BrandDetailPage from "~/pages/BrandDetailPage";
import CollectionPage from "~/pages/CollectionPage";
import DiscountPage from "../pages/DiscountPage";
import ShoppingCart from "../pages/ShoppingCart";
import OrderCollection from "~/pages/OrderCollection";
import OrderDetail from "~/pages/OrderDetail";
import Login_Client from "~/pages/Login_Client";
import Register from "~/pages/Register";
import Import from "~/pages/ImportPage";
import InfoImport from "~/pages/InfoImport";
import ImportList from "~/pages/ImportList";
import CommentList from "~/pages/CommentList";
import Return_Collection from "~/pages/ReturnCollection";
import ReturnDetail from "~/pages/ReturnDetail";
import YourAccount from "~/pages/YourAccount";
import Login_Admin from "~/pages/Login_Admin";
import SellReport from "~/pages/AdminReport";
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
        path: '/exchange_returns',
        component: ExchangeReturnList,
        layout: DefaultLayoutAdmin,
        title: 'Danh sách đổi trả',
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
    {
        path: '/brands/details/:id',
        component: InfoBrand,
        layout: DefaultLayoutAdmin,
        title: 'Thông tin thương hiệu',
        back: true
    },
    {
        path: '/brands/update/:id',
        component: UpdateBrand,
        layout: DefaultLayoutAdmin,
        title: 'Cập nhật thương hiệu',
        back: true
    },
    {
        path: '/customers/details/:id',
        component: Infocustomer,
        layout: DefaultLayoutAdmin,
        title: 'Thông tin khách hàng',
        back: true
    },
    {
        path: '/orders/details/:id',
        component: InfoOrder,
        layout: DefaultLayoutAdmin,
        title: 'Thông tin đơn hàng',
        back: true
    },
    {
        path: '/products/add',
        component: AddProduct,
        layout: DefaultLayoutAdmin,
        title: 'Thêm sản phẩm',
        back: true
    },
    {
        path: '/products/update/:id',
        component: UpdateProduct,
        layout: DefaultLayoutAdmin,
        title: 'Cập nhật sản phẩm',
        back: true
    },
    {
        path: '/products/details/:id',
        component: InfoProduct,
        layout: DefaultLayoutAdmin,
        title: 'Thông tin sản phẩm',
        back: true
    },
    {
        path: '/products/version/:id',
        component: ProductVersion,
        layout: DefaultLayoutAdmin,
        title: 'Quản lý các phân loại sản phẩm',
        back: true
    },
    {
        path: '/exchange_returns/details/:id',
        component: InfoExchangeReturn,
        layout: DefaultLayoutAdmin,
        title: 'Thông tin đổi trả sản phẩm',
        back: true
    },


    {
        path: '/product_collection/:id',
        component: ProductPage,
        layout: DefaultLayoutClient,
    },
    {
        path: '/brand_collection',
        component: BrandListPage,
        layout: DefaultLayoutClient,
    },
    {
        path: '/brand_collection/:id',
        component: BrandDetailPage,
        layout: DefaultLayoutClient,
    },
    {
        path: '/collection/:key',
        component: CollectionPage,
        layout: DefaultLayoutClient,
    },
    {
        path: '/discount_collection',
        component: DiscountPage,
        layout: DefaultLayoutClient,
    },
    {
        path: '/shopping_cart',
        component: ShoppingCart,
        layout: DefaultLayoutClient,
    },
    {
        path: '/order_colection',
        component: OrderCollection,
        layout: DefaultLayoutClient,
    },
    {
        path: '/order_colection/detail/:id',
        component: OrderDetail,
        layout: DefaultLayoutClient,
    },
    {
        path: '/return_colection',
        component: Return_Collection,
        layout: DefaultLayoutClient,
    },
    {
        path: '/return_colection/detail/:id',
        component: ReturnDetail,
        layout: DefaultLayoutClient,
    },
    {
        path: '/products/import/:id',
        component: Import,
        title: 'Nhập hàng',
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/imports/detail/:id',
        component: InfoImport,
        title: 'Thông tin nhập hàng',
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/imports',
        component: ImportList,
        title: 'Danh sách nhập hàng',
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/comments',
        component: CommentList,
        title: 'Danh sách nhập hàng',
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/reports',
        component: SellReport,
        title: 'Báo cáo doanh thu',
        layout: DefaultLayoutAdmin,
    },
];

const privateRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: DefaultLayoutClient,
        title: '',
    },
    {
        path: '/login',
        component: Login_Client,
        layout: null,
        title: ''
    },
    {
        path: '/adminLogin',
        component: Login_Admin,
        layout: null,
        title: ''
    },
    {
        path: '/register',
        component: Register,
        layout: null,
        title: ''
    },
    {
        path: '/your_account',
        component: YourAccount,
        layout: DefaultLayoutClient,
        title: ''
    },

];

export { publicRoutes, privateRoutes };
