import CardDashboard from "@/components/dashboard/CardDashboard";
import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import { getAllPartner } from "@/redux/feature/admin/adminPartnerSlice";
import EachUtils from "@/utils/EachUtils";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const data = [
    {
        link: "/dashboard/admin/partner",
        name: "Partners",
        data: 32,
        icon: <FaUserFriends size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/admin/campaign",
        name: "Campaigns",
        data: 7,
        icon: <FaSchool size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/admin/withdrawal",
        name: "Withdrawals",
        data: 5,
        icon: <FaMoneyCheck size={52} className="text-primary" />,
    },
];

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const { partners } = useSelector((state) => state.adminPartner);

    const [datas, setDatas] = useState(data);

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                await dispatch(getAllPartner()).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetchPartnerDetails();
    }, []);

    useEffect(() => {
        if (partners === null) return;
        const updatedDatas = datas.map((item) => {
            switch (item.name) {
                case "Partners":
                    return { ...item, data: partners?.length };
                case "Campaigns":
                    return item;
                // return { ...item, data: campaigns?.length || 0 };
                case "Withdrawals":
                    return item;
                // return { ...item, data: withdrawals?.length || 0 };
                default:
                    return item;
            }
        });
        setDatas(updatedDatas);
    }, [partners]);

    return (
        <>
            <Title name={"Dashboard"} />
            {partners !== null && (
                <div className="flex justify-start gap-4">
                    <EachUtils
                        of={datas}
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
            )}

            {partners === null && <Loader />}
        </>
    );
};

export default AdminDashboard;
