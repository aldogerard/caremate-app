import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useSelector((state) => state.auth);

    if (isLogin) {
        return children;
    }
    return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
