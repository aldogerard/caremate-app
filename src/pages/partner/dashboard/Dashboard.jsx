import { useEffect, useState } from "react";
import { FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { TbClock } from "react-icons/tb";
import { useSelector } from "react-redux";

import CardDashboard from "@/components/dashboard/CardDashboard";
import Title from "@/components/dashboard/Title";
import EachUtils from "@/utils/EachUtils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "@/components/PDF/Invoice";

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
    const { currentPartner } = useSelector((state) => state.partner);
    const [datas, setDatas] = useState(data);

    useEffect(() => {
        if (currentPartner !== null) {
            setDatas((state) =>
                state.map((item) =>
                    item.name === "Status Fondation"
                        ? { ...item, data: currentPartner.status }
                        : item
                )
            );
        }
    }, [currentPartner]);

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
