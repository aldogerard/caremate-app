import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

let i = 0;
const DashboardProtected = ({ children }) => {
    const { isLogin } = useSelector((state) => state.auth);

    i = i + 1;

    if (i > 4) {
        if (isLogin) {
            return children;
        }
        return <Navigate to={"/"} />;
    }
};

export default DashboardProtected;
