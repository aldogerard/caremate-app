import CardWithChart from "@/components/dashboard/admin/CardWithChart";
import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import { getAdminReport } from "@/redux/feature/admin/adminReportSlice";
import EachUtils from "@/utils/EachUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@/data/dataDashboard.json";
import { IoPersonOutline, IoWalletOutline } from "react-icons/io5";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link } from "react-router-dom";
import CardBasic from "@/components/dashboard/admin/CardBasic";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { report } = useSelector((state) => state.adminReport);
    const [datas, setDatas] = useState(data);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                await dispatch(getAdminReport()).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        if (report === null) return;
        const updatedDatas = datas.map((item) => {
            const {
                totalCampaignActive,
                totalCampaignCompleted,
                totalCampaignInReview,
                totalCampaignRejected,
                totalPartnerInReview,
                totalPartnerRejected,
                totalPartnerUnverified,
                totalPartnerVerified,
                totalWithdrawalApproved,
                totalWithdrawalPending,
                totalWithdrawalReject,
            } = report;
            switch (item.name) {
                case "Partners":
                    return {
                        ...item,
                        data:
                            totalPartnerUnverified +
                            totalPartnerInReview +
                            totalPartnerVerified +
                            totalPartnerRejected,
                        dataChart: {
                            labels: [
                                "Unverified",
                                "In Review",
                                "Verified",
                                "Rejected",
                            ],
                            datasets: [
                                {
                                    data: [
                                        totalPartnerUnverified,
                                        totalPartnerInReview,
                                        totalPartnerVerified,
                                        totalPartnerRejected,
                                    ],
                                    backgroundColor: [
                                        "#F43F5E",
                                        "#FB7185",
                                        "#FDA4AF",
                                        "#FECDD3",
                                    ],
                                },
                            ],
                        },
                    };
                case "Campaigns":
                    return {
                        ...item,
                        data:
                            totalCampaignInReview +
                            totalCampaignActive +
                            totalCampaignCompleted +
                            totalCampaignRejected,
                        dataChart: {
                            labels: [
                                "In Review",
                                "Active",
                                "Completed",
                                "Rejected",
                            ],
                            datasets: [
                                {
                                    data: [
                                        totalCampaignInReview,
                                        totalCampaignActive,
                                        totalCampaignCompleted,
                                        totalCampaignRejected,
                                    ],
                                    backgroundColor: [
                                        "#3B82F6",
                                        "#60A5FA",
                                        "#7DD3FC",
                                        "#BAE6FD",
                                    ],
                                },
                            ],
                        },
                    };
                case "Withdrawals":
                    return {
                        ...item,
                        data:
                            totalWithdrawalPending +
                            totalWithdrawalApproved +
                            totalWithdrawalReject,
                        dataChart: {
                            labels: ["Pending", "Aproved", "Rejected"],
                            datasets: [
                                {
                                    data: [
                                        totalWithdrawalPending,
                                        totalWithdrawalApproved,
                                        totalWithdrawalReject,
                                    ],
                                    backgroundColor: [
                                        "#F59E0B",
                                        "#FBBF24",
                                        "#FCD34D",
                                    ],
                                },
                            ],
                        },
                    };
                default:
                    return item;
            }
        });
        setDatas(updatedDatas);
    }, [report]);

    return (
        <>
            <Title name={"Dashboard"} />
            {!isLoading && (
                <div className="flex flex-wrap gap-3">
                    <CardBasic
                        link={"withdrawal"}
                        data={report.totalIncome}
                        name={"Total Income"}
                        icon={
                            <IoWalletOutline className="text-5xl font-light text-emerald-500" />
                        }
                    />
                    <CardBasic
                        link={"donor"}
                        data={report.totalDonor}
                        name={"Donors"}
                        icon={
                            <IoPersonOutline className="text-5xl font-light text-fuchsia-500" />
                        }
                    />
                    <div className="w-max flex gap-3">
                        <EachUtils
                            of={datas}
                            render={(item) => <CardWithChart item={item} />}
                        />
                    </div>
                </div>
            )}

            {isLoading && <Loader />}
        </>
    );
};

export default AdminDashboard;
