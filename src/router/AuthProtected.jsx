import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
    const { isLogin } = useSelector((state) => state.auth);

    if (!isLogin) {
        return children;
    }

    return <Navigate to={"/"} />;
};

export default AuthProtected;
