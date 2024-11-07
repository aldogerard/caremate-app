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
        icon: <FaUserFriends className="text-primary lg:text-7xl text-5xl" />,
    },
    {
        link: "/dashboard/admin/campaign",
        name: "Campaigns",
        data: 0,
        icon: <FaSchool className="text-primary lg:text-7xl text-5xl" />,
    },
    {
        link: "/dashboard/admin/withdrawal",
        name: "Withdrawals",
        data: 0,
        icon: <FaMoneyCheck className="text-primary lg:text-7xl text-5xl" />,
    },
];

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const { partners, paging: pagePartner } = useSelector(
        (state) => state.adminPartner
    );
    const { campaigns, paging: pageCampaign } = useSelector(
        (state) => state.adminCampaign
    );
    const { withdrawals } = useSelector((state) => state.adminWithdrawal);

    const [datas, setDatas] = useState(data);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                setIsLoading(true);
                await dispatch(getAllCampaign()).unwrap();
                await dispatch(getAllWithdrawal()).unwrap();
                await dispatch(getAllPartner()).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPartnerDetails();
    }, []);

    useEffect(() => {
        if (partners === null) return;
        const updatedDatas = datas.map((item) => {
            switch (item.name) {
                case "Partners":
                    return { ...item, data: pagePartner.totalElements };
                case "Campaigns":
                    return { ...item, data: pageCampaign.totalElements };
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
            {!isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
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

            {isLoading && <Loader />}
        </>
    );
};

export default AdminDashboard;
