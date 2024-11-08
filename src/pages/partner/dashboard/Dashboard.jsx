import CardWithChart from "@/components/dashboard/admin/CardWithChart";
import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import { getPartnerReport } from "@/redux/feature/partner/partnerReportSlice";
import EachUtils from "@/utils/EachUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "@/data/dataDashboard.json";
import { IoPersonOutline, IoWalletOutline } from "react-icons/io5";
import CardBasic from "@/components/dashboard/admin/CardBasic";
import { limitText } from "@/utils/Utils";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { report } = useSelector((state) => state.partnerReport);
    const { user } = useSelector((state) => state.auth);

    const [datas, setDatas] = useState(data);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                await dispatch(getPartnerReport(user.id)).unwrap();
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
                totalCampaignInReview,
                totalCampaignActive,
                totalCampaignCompleted,
                totalCampaignRejected,
                totalWithdrawalApproved,
                totalWithdrawalPending,
                totalWithdrawalReject,
            } = report;
            switch (item.name) {
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
                                        "#F43F5E",
                                        "#FB7185",
                                        "#FDA4AF",
                                        "#FECDD3",
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
                <div className="flex flex-wrap gap-4 w-full">
                    {report ? (
                        <>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap gap-4">
                                    <CardBasic
                                        link={"profile"}
                                        data={report.statusPartner}
                                        name={"Status Foundation"}
                                        icon={
                                            <IoPersonOutline className="text-5xl font-light text-blue-500" />
                                        }
                                        style={"bg-blue-500/15"}
                                    />
                                    <CardBasic
                                        link={"withdrawal"}
                                        data={report.totalFund}
                                        type={"money"}
                                        name={"Total Fund"}
                                        icon={
                                            <IoWalletOutline className="text-5xl font-light text-emerald-500" />
                                        }
                                        style={"bg-emerald-500/15"}
                                    />
                                </div>

                                <div className=" flex flex-wrap gap-4 ">
                                    <EachUtils
                                        of={datas}
                                        render={(item) => (
                                            <CardWithChart item={item} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="overflow-scroll text-dark/80 font-medium min-w-full lg:min-w-[600px]">
                                <div className="w-full border bg-light rounded-2xl text-sm">
                                    <div className="gap-x-4 px-6 py-4  flex justify-between items-center">
                                        <h1 className="text-lg">
                                            Campaign Status
                                        </h1>
                                        <Link
                                            to={"/dashboard/partner/campaign"}
                                            className="flex justify-center items-center px-3 py-2 border rounded-lg"
                                        >
                                            <h1 className="font-normal">
                                                See All
                                            </h1>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-[2fr,2fr,1fr] px-6 py-3 bg-gray-50 text-dark/50 bordeb gap-x-4">
                                        <div className="col-start-1">
                                            <h1>Title</h1>
                                        </div>
                                        <div className="col-start-2">
                                            <h1>Category</h1>
                                        </div>
                                        <div className="col-start-3">
                                            <h1>Status</h1>
                                        </div>
                                    </div>
                                    <EachUtils
                                        of={[{}, {}, {}]}
                                        render={(item, index) => (
                                            <div
                                                className={`
                                grid grid-cols-[2fr,2fr,1fr] px-6 py-3 items-center gap-x-4 break-words`}
                                            >
                                                <div className="col-start-1">
                                                    <h1>
                                                        {limitText(
                                                            "Donasi untuk jumat berkah",
                                                            30
                                                        )}
                                                    </h1>
                                                </div>
                                                <div className="col-start-2">
                                                    <h1>
                                                        {limitText(
                                                            "Infrastructure Support",
                                                            30
                                                        )}
                                                    </h1>
                                                </div>
                                                <div className="col-start-3">
                                                    <div className="flex justify-center items-center px-2 py-1 rounded-full bg-primary/20">
                                                        <h1 className="text-primary">
                                                            Active
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-full justify-center items-center h-[70vh]">
                            <h1 className="text-dark/80 text-lg">
                                Server not responding
                            </h1>
                        </div>
                    )}
                </div>
            )}

            {isLoading && <Loader />}
        </>
    );
};

export default Dashboard;
