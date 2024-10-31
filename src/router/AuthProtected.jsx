import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
    const { isLogin, role } = useSelector((state) => state.auth);

    if (isLogin !== null) {
        if (isLogin) {
            if (role === "PARTNER") {
                return <Navigate to={"/"} />;
            }

            if (role === "ADMIN") {
                return <Navigate to={"/"} />;
            }

            return <Navigate to={"/"} />;
        }
        return children;
    }
};

export default AuthProtected;
