import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const BaseLayouts = () => {
    return (
        <>
            <Header />
            <section className="flex justify-center">
                <main className="container py-20 min-h-screen padding">
                    <Outlet />
                </main>
            </section>
        </>
    );
};

export default BaseLayouts;
