import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSeedling } from "react-icons/fa6";
import { Link } from "react-router-dom";

const image = "https://account.enigmacamp.com/2.jpg";

const LoginPartner = () => {
    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });
    const [type, setType] = useState("password");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isMount, setIsMount] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (!isMount) {
            setIsMount(true);
            return;
        }
        const { email, password } = auth;

        const regex = /^[\w.-]+@[\w.-]+\.\w+$/;

        setIsEmailInvalid(
            regex.test(email) || email.length <= 0 ? false : true
        );
        setIsPasswordInvalid(
            password.length >= 8 || password.length <= 0 ? false : true
        );
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
    };

    const handleClick = () => {
        setType((state) => (state === "password" ? "text" : "password"));
    };

    const handleFocus = () => {
        setIsFocus(true);
    };

    const handleBlur = () => {
        setIsFocus(false);
    };

    return (
        <section className="h-full flex">
            <aside className="hidden lg:flex lg:w-2/3">
                <img src={image} alt="hero" />
            </aside>
            <main className="flex flex-col h-full items-center pt-32 py-20 lg:w-1/3">
                <div className="flex justify-center items-center w-max">
                    <FaSeedling className="text-primary text-4xl lg:text-6xl" />
                    <h1 className="text-xl font-semibold text-primary lg:text-3xl">
                        CareMate
                    </h1>
                </div>
                <h1 className="lg:w-11/12 lg:max-w-lg text-lg font-light text-center  text-secondary my-14 lg:text-2xl">
                    Welcome back, Partner! Let’s make a difference together!
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-11/12 lg:max-w-lg"
                >
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="email"
                                    className="text-black/80"
                                >
                                    Email
                                </label>
                                {isEmailInvalid && (
                                    <p className="text-xs font-medium text-error">
                                        *Invalid format email
                                    </p>
                                )}
                            </div>
                            <input
                                type="email"
                                required
                                id="email"
                                autoComplete="off"
                                name="email"
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="px-5 py-4 text-black/80 outline-none rounded-md border focus:shadow-sm  bg-white"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="text-black/80"
                                >
                                    Password
                                </label>
                                {isPasswordInvalid && (
                                    <p className="text-xs font-medium text-error">
                                        *Minimum password is 8 letters
                                    </p>
                                )}
                            </div>
                            <div
                                className={`flex justify-between gap-2 items-center relative px-5 py-4 outline-none rounded-md border bg-white ${
                                    isFocus && "shadow-sm"
                                }`}
                            >
                                <input
                                    type={type}
                                    required
                                    name="password"
                                    autoComplete="off"
                                    id="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    className="bg-white text-black/80 outline-none w-[95%]"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <div
                                    className="cursor-pointer text-lg "
                                    onClick={handleClick}
                                >
                                    {type === "password" ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-lg mt-4">
                            <button
                                className={`w-full bg-primary py-4 text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-emerald-600 ${
                                    (isPasswordInvalid || isEmailInvalid) &&
                                    "cursor-not-allowed"
                                }`}
                                disabled={
                                    isPasswordInvalid || isEmailInvalid
                                        ? true
                                        : false
                                }
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <h1 className="text-dark text-sm">
                                Don't have an account ?{" "}
                                <Link
                                    to={"/partner/signup"}
                                    className="text-primary font-medium cursor-pointer"
                                >
                                    Register
                                </Link>
                            </h1>
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default LoginPartner;
