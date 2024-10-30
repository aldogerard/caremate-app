import AuthLayout from "@/layouts/AuthLayout";
import BaseLayouts from "@/layouts/BaseLayout";
import LoginAdmin from "@/pages/admin/LoginAdmin";
import LoginPartner from "@/pages/partner/LoginPartner";
import RegisterPartner from "@/pages/partner/RegisterPartner";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AuthProtected from "./AuthProtected";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardProtected from "./DashboardProtectd";
import Profile from "@/pages/partner/dashboard/Profile";
import Campaign from "@/pages/partner/dashboard/Campaign";
import Withdrawal from "@/pages/partner/dashboard/Withdrawal";
import Dashboard from "@/pages/partner/dashboard/Dashboard";

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
            element: (
                <DashboardProtected>
                    <DashboardLayout />
                </DashboardProtected>
            ),
            children: [
                {
                    path: "/dashboard/partner",
                    element: <Outlet />,
                    children: [
                        {
                            path: "",
                            element: <Dashboard />,
                        },
                        {
                            path: "Profile",
                            element: <Profile />,
                        },
                        {
                            path: "campaign",
                            element: <Campaign />,
                        },
                        {
                            path: "withdrawal",
                            element: <Withdrawal />,
                        },
                    ],
                },
                {
                    path: "/dashboard/admin",
                    element: <></>,
                },
            ],
        },
        {
            path: "/",
            element: (
                <AuthProtected>
                    <AuthLayout />
                </AuthProtected>
            ),
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
