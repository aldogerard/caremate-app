import CardDashboard from "@/components/dashboard/CardDashboard";
import Title from "@/components/dashboard/Title";
import EachUtils from "@/utils/EachUtils";
import { FaUserFriends } from "react-icons/fa";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";

const data = [
    {
        link: "/dashboard/admin/partner",
        name: "Partner",
        data: 32,
        icon: <FaUserFriends size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/admin/campaign",
        name: "Campaign",
        data: 7,
        icon: <FaSchool size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/admin/withdrawal",
        name: "Partner",
        data: 5,
        icon: <FaMoneyCheck size={52} className="text-primary" />,
    },
];

const AdminDashboard = () => {
    return (
        <>
            <Title name={"Dashboard"} />
            <div className="flex justify-start gap-4">
                <EachUtils
                    of={data}
                    render={(item) => (
                        <CardDashboard
                            link={item.link}
                            name={item.name}
                            data={item.data}
                            icon={item.icon}
                        />
                    )}
                />
            </div>
        </>
    );
};

export default AdminDashboard;
