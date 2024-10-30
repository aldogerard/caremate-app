import AuthLayout from "@/layouts/AuthLayout";
import BaseLayouts from "@/layouts/BaseLayout";
import LoginAdmin from "@/pages/admin/LoginAdmin";
import LoginPartner from "@/pages/partner/LoginPartner";
import RegisterPartner from "@/pages/partner/RegisterPartner";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const Routers = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <BaseLayouts />,
            errorElement: <h1>Not Found</h1>,
            children: [
                {
                    path: "/",
                    element: <></>,
                },
                {
                    path: "/about",
                    element: <></>,
                },
                {
                    path: "/contact",
                    element: <></>,
                },
                {
                    path: "/faq",
                    element: <></>,
                },
            ],
        },
        {
            path: "/",
            element: <AuthLayout />,
            children: [
                {
                    path: "/partner/signin",
                    element: <LoginPartner />,
                },
                {
                    path: "/partner/signup",
                    element: <RegisterPartner />,
                },
                {
                    path: "/admin/signin",
                    element: <LoginAdmin />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};
export default Routers;
