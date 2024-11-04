import CardDashboard from "@/components/dashboard/CardDashboard";
import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import { getAllCampaign } from "@/redux/feature/admin/adminCampaignSlice";
import { getAllPartner } from "@/redux/feature/admin/adminPartnerSlice";
import { getAllWithdrawal } from "@/redux/feature/admin/adminWithdrawalSlice";
import EachUtils from "@/utils/EachUtils";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const data = [
    {
        link: "/dashboard/admin/partner",
        name: "Partners",
        data: 0,
        icon: <FaUserFriends size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/admin/campaign",
        name: "Campaigns",
        data: 0,
        icon: <FaSchool size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/admin/withdrawal",
        name: "Withdrawals",
        data: 0,
        icon: <FaMoneyCheck size={52} className="text-primary" />,
    },
];

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const { partners } = useSelector((state) => state.adminPartner);
    const { campaigns } = useSelector((state) => state.adminCampaign);
    const { withdrawals } = useSelector((state) => state.adminWithdrawal);

    const [datas, setDatas] = useState(data);

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                await dispatch(getAllCampaign()).unwrap();
                await dispatch(getAllWithdrawal()).unwrap();
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
                    return {
                        ...item,
                        data: partners.filter(
                            (res) => res.status !== "UNVERIFIED"
                        ).length,
                    };
                case "Campaigns":
                    return { ...item, data: campaigns?.length };
                case "Withdrawals":
                    return { ...item, data: withdrawals?.length };
                default:
                    return item;
            }
        });
        setDatas(updatedDatas);
    }, [partners]);

    return (
        <>
            <Title name={"Dashboard"} />
            {partners !== null &&
                campaigns !== null &&
                withdrawals !== null && (
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

            {(partners === null ||
                campaigns === null ||
                withdrawals === null) && <Loader />}
        </>
    );
};

export default AdminDashboard;
