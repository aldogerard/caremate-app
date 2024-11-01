import { FaUserFriends } from "react-icons/fa";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { TbClock } from "react-icons/tb";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const capitalizeFirstLetter = (string) => {
        return string
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <>
            <div className="w-full py-2 mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Dashboard
                </h1>
            </div>
            <div className="flex justify-start gap-4">
                <Link
                    to={"/dashboard/admin/partner"}
                    className={`flex flex-col w-full lg:w-max lg:min-w-[200px] overflow-hidden rounded-2xl  bg-white px-4 py-6 shadow-md border`}
                >
                    <div className={`rounded-2xl bg-primary/15 p-2 w-max`}>
                        <FaUserFriends size={52} className="text-primary" />
                    </div>
                    <h1 className="font-light mt-8 mb-2 text-black">Partner</h1>
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl font-semibold leading-none text-slate-800/80">
                            32
                        </h2>
                    </div>
                </Link>
                <Link
                    to={"/dashboard/admin/campaign"}
                    className={`flex flex-col w-full lg:w-max lg:min-w-[200px] overflow-hidden rounded-2xl  bg-white px-4 py-6 shadow-md border`}
                >
                    <div className={`rounded-2xl bg-primary/15 p-2 w-max`}>
                        <FaSchool size={52} className="text-primary" />
                    </div>
                    <h1 className="font-light mt-8 mb-2 text-black">
                        Campaign
                    </h1>
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl font-semibold leading-none text-slate-800/80">
                            7
                        </h2>
                    </div>
                </Link>
                <Link
                    to={"/dashboard/admin/withdrawal"}
                    className={`flex flex-col w-full lg:w-max lg:min-w-[200px] overflow-hidden rounded-2xl  bg-white px-4 py-6 shadow-md border`}
                >
                    <div className={`rounded-2xl bg-primary/15 p-2 w-max`}>
                        <FaMoneyCheck size={52} className="text-primary" />
                    </div>
                    <h1 className="font-light mt-8 mb-2 text-black">
                        Withdrawal
                    </h1>
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl font-semibold leading-none text-slate-800/80">
                            3
                        </h2>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default AdminDashboard;
