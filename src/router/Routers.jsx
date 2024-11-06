import AuthLayout from "@/layouts/AuthLayout";
import BaseLayouts from "@/layouts/BaseLayout";
import LoginAdmin from "@/pages/admin/LoginAdmin";
import LoginPartner from "@/pages/partner/LoginPartner";
import RegisterPartner from "@/pages/partner/RegisterPartner";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AuthProtected from "./AuthProtected";
import Profile from "@/pages/partner/dashboard/Profile";
import Campaign from "@/pages/partner/dashboard/Campaign";
import Withdrawal from "@/pages/partner/dashboard/Withdrawal";
import Dashboard from "@/pages/partner/dashboard/Dashboard";
import PartnerProtected from "./PartnerProtected";
import PartnerDashboardLayout from "@/layouts/PartnerDashboardLayout";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AdminProtected from "./AdminProtected";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AdminPartner from "@/pages/admin/dashboard/AdminPartner";
import Home from "@/pages/landing/Home";
import AboutUs from "@/pages/landing/AboutUs";
import Faq from "@/pages/landing/Faq";
import CampaignLanding from "@/pages/landing/campaign/CampaignLanding";
import News from "@/pages/landing/News/News";
import NewsPage from "@/pages/landing/News/NewsPage";
import CampaignDetails from "@/pages/landing/campaign/CampaignDetails";
import CampaignCategory from "@/pages/landing/campaign/CampaignCategory";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayouts />,
      errorElement: <h1>Not Found</h1>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/campaign",
          element: <CampaignLanding />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/faq",
          element: <Faq />,
        },
        {
          path: "/news/:id",
          element: <NewsPage />,
        },
        {
          path: "/campaign/category",
          element: <CampaignCategory />,
        },
        {
          path: "/campaign/details",
          element: <CampaignDetails />,
        },
      ],
    },
    {
      path: "/",
      element: <AdminDashboardLayout />,
      children: [
        {
          path: "/dashboard/admin",
          element: (
            // <AdminProtected>
            <Outlet />
            // </AdminProtected>
          ),
          children: [
            {
              path: "",
              element: <AdminDashboard />,
            },
            {
              path: "partner",
              element: <AdminPartner />,
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
      ],
    },
    {
      path: "/",
      element: <PartnerDashboardLayout />,
      children: [
        {
          path: "/dashboard/partner",
          element: (
            // <PartnerProtected>
            <Outlet />
            // </PartnerProtected>
          ),
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
