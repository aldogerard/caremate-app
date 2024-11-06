import { useEffect, useState } from "react";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { TbClock } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import CardDashboard from "@/components/dashboard/CardDashboard";
import Title from "@/components/dashboard/Title";
import EachUtils from "@/utils/EachUtils";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";
import { getCampaignByPartnerId } from "@/redux/feature/partner/campaignSlice";
import { getWithdrawalByPartnerId } from "@/redux/feature/partner/withdrawalSlice";
import Loader from "@/components/Loader";

const data = [
    {
        link: "/dashboard/partner/profile",
        name: "Status Fondation",
        data: "Unverified",
        icon: <TbClock className="text-primary lg:text-7xl text-5xl" />,
    },
    {
        link: "/dashboard/partner/campaign",
        name: "Total Campaigns",
        data: 0,
        icon: <FaSchool className="text-primary lg:text-7xl text-5xl" />,
    },
    {
        link: "/dashboard/partner/withdrawal",
        name: "Total Withdrawals",
        data: 0,
        icon: <FaMoneyCheck className="text-primary lg:text-7xl text-5xl" />,
    },
];

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { campaigns } = useSelector((state) => state.campaign);
    const { withdrawals } = useSelector((state) => state.withdrawal);

    const [datas, setDatas] = useState(data);

    useEffect(() => {
        if (!partner) return;

        const updatedDatas = datas.map((item) => {
            switch (item.name) {
                case "Status Fondation":
                    return { ...item, data: partner?.status };
                case "Total Campaigns":
                    return { ...item, data: campaigns?.length || 0 };
                case "Total Withdrawals":
                    return { ...item, data: withdrawals?.length || 0 };
                default:
                    return item;
            }
        });
        setDatas(updatedDatas);
    }, [partner, campaigns, withdrawals]);

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                await dispatch(getDetailPartner(user.id)).unwrap();
                await dispatch(
                    getCampaignByPartnerId({ id: user.id })
                ).unwrap();
                await dispatch(
                    getWithdrawalByPartnerId({ id: user.id })
                ).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        if (user?.id) {
            fetchPartnerDetails();
        }
    }, [user]);

    return (
        <>
            <Title name={"Dashboard"} />
            {partner && (
                <>
                    <div className="flex justify-start gap-4 flex-wrap">
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
                </>
            )}

            {!partner && <Loader />}
        </>
    );
};

export default Dashboard;
