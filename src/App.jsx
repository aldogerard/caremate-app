import Routers from "@/router/Routers";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./redux/feature/authSlice";
import { Failed } from "./utils/AlertUtil";

const App = () => {
    const dispatch = useDispatch();

    const [isMount, setIsMount] = useState(false);

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    const { isExpired, decodedToken } = useJwt(token);

    useEffect(() => {
        if (isMount) {
            if (token) {
                if (decodedToken) {
                    if (!isExpired) {
                        dispatch(setAuth({ token, role, id }));
                    } else {
                        Failed("You have to login again");
                        localStorage.removeItem("token");
                        localStorage.removeItem("id");
                        localStorage.removeItem("role");
                        dispatch(
                            setAuth({ token: null, role: null, id: null })
                        );
                    }
                }
            } else {
                dispatch(setAuth({ token: null, role: null, id: null }));
            }
        } else {
            setIsMount(true);
        }
    }, [isMount, isExpired]);

    return <Routers />;
};

export default App;
