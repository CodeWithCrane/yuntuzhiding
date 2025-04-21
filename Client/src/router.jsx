import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";

function lazyLoad(importFn) {
    const LazyComponent = lazy(importFn);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: lazyLoad(() => import("./pages/Home/Home.jsx"))
            },
            {
                path: "/users",
                element: lazyLoad(() => import("./pages/User/User.jsx"))
            },
            {
                path: "/user/edit",
                element: lazyLoad(() => import("./pages/EditUser/EditUser.jsx"))
            },
            {
                path: "/user/add",
                element: lazyLoad(() => import("./pages/AddUser/AddUser.jsx"))
            },
            {
                path: "/commodities",
                element: lazyLoad(() => import("./pages/Commodities/Commodities.jsx"))
            },
            {
                path: "/commodity/add",
                element: lazyLoad(() => import("./pages/AddCommodity/AddCommodity.jsx"))
            },
            {
                path: "/commodity/edit",
                element: lazyLoad(() => import("./pages/EditCommodity/EditCommodity.jsx"))
            },
            {
                path: "/orders",
                element: lazyLoad(() => import("./pages/Orders/Orders.jsx"))
            },
            {
                path: "/order/add",
                element: lazyLoad(() => import("./pages/AddOrder/AddOrder.jsx"))
            },
            {
                path: "/order/edit",
                element: lazyLoad(() => import("./pages/EditOrder/EditOrder.jsx"))
            },
            {
                path: "/order-statistics",
                element: lazyLoad(() => import("./pages/OrderStat/OrderStat.jsx"))
            },
            {
                path: "/commodity-sales",
                element: lazyLoad(() => import("./pages/CommoditySales/CommoditySales.jsx"))
            }
        ]
    },
    {
        path: "/register",
        element: lazyLoad(() => import("./pages/Register/Register.jsx"))
    },
    {
        path: "/login",
        element: lazyLoad(() => import("./pages/Login/Login.jsx"))
    },
]);

export default router;

