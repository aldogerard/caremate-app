import { useEffect, useState } from "react";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { TbClock } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import CardDashboard from "@/components/dashboard/CardDashboard";
import Title from "@/components/dashboard/Title";
import EachUtils from "@/utils/EachUtils";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";

const data = [
    {
        link: "/dashboard/partner/profile",
        name: "Status Fondation",
        data: "Unverified",
        icon: <TbClock size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/partner/campaign",
        name: "Campaign",
        data: 7,
        icon: <FaSchool size={52} className="text-primary" />,
    },
    {
        link: "/dashboard/partner/withdrawal",
        name: "Withdrawal",
        data: 5,
        icon: <FaMoneyCheck size={52} className="text-primary" />,
    },
];

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);

    const [datas, setDatas] = useState(data);

    useEffect(() => {
        if (partner) {
            setDatas((prevState) =>
                prevState.map((item) =>
                    item.name === "Status Fondation"
                        ? { ...item, data: partner.status }
                        : item
                )
            );
        }
    }, [partner]);

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                await dispatch(getDetailPartner(user.id)).unwrap();
            } catch (error) {
                console.error("Error fetching partner details:", error);
            }
        };

        if (user?.id) {
            fetchPartnerDetails();
        }
    }, [user]);

    return (
        <>
            <Title name={"Dashboard"} />
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
    );
};

export default Dashboard;
