import Routers from "@/router/Routers";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./redux/feature/authSlice";

const App = () => {
    const dispatch = useDispatch();

    const [isMount, setIsMount] = useState(false);

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    const { isExpired } = useJwt(token);

    useEffect(() => {
        if (isMount) {
            if (!isExpired) {
                dispatch(setAuth({ token, role, id }));
            } else {
                dispatch(setAuth({ token: null, role: null, id: null }));
            }
        } else {
            setIsMount(true);
        }
    }, [isMount]);

    return <Routers />;
};

export default App;
