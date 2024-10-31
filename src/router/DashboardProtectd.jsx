import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DashboardProtected = ({ children }) => {
    const { isLogin } = useSelector((state) => state.auth);

    if (isLogin !== null) {
        if (isLogin) {
            return children;
        }
        return <Navigate to={"/"} />;
    }
};

export default DashboardProtected;
