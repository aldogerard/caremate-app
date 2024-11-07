import Button from "@/components/Button";
import IconDetail from "@/components/IconDetail";
import { setCurrentPartner } from "@/redux/feature/admin/adminPartnerSlice";
import EachUtils from "@/utils/EachUtils";
import { formatPhoneNumber, limitText } from "@/utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TablePartner = (props) => {
    const { handleDetailModal, filter } = props;

    const dispatch = useDispatch();

    const { partners, paging } = useSelector((state) => state.adminPartner);
    const { page, size } = paging;

    const handleClickDetail = (res) => {
        dispatch(setCurrentPartner({ item: res }));
        handleDetailModal();
    };

    const calculateRowNumber = (index) => {
        return index + 1 + page * size;
    };

    return (
        // <div className="relative overflow-x-auto border rounded-md shadow-sm">
        //     <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500">
        //         <thead className="text-gray-700">
        //             <tr className="text-left border-b">
        //                 <th scope="col" className="p-4">
        //                     No
        //                 </th>
        //                 <th scope="col">Foundation Name</th>
        //                 <th scope="col">Email</th>
        //                 <th scope="col">Phone</th>
        //                 <th scope="col">Address</th>
        //                 <th scope="col">Description</th>
        //                 <th scope="col">Action</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <EachUtils
        //                 of={partners}
        //                 render={(item, index) => (
        //                     <tr
        //                         className={`${
        //                             index % 2 === 0 && "bg-accent/5"
        //                         }`}
        //                         key={item.id}
        //                     >
        //                         <td className="px-4 py-6">
        //                             {calculateRowNumber(index)}
        //                         </td>
        //                         <td>{limitText(item?.name || "", 20)}</td>
        //                         <td>{limitText(item?.email || "", 20)}</td>
        //                         <td>
        //                             {limitText(item?.phoneNumber || "", 12)}
        //                         </td>
        //                         <td>{limitText(item?.address || "", 20)}</td>
        //                         <td>
        //                             {limitText(item?.description || "NaN", 30)}
        //                         </td>
        //                         <td>
        //                             <Link
        //                                 to={`/dashboard/admin/partner/${item.id}`}
        //                             >
        //                                 <Button
        //                                     type="button"
        //                                     name={"Detail"}
        //                                     // onClick={() =>
        //                                     //     handleClickDetail(item)
        //                                     // }
        //                                 />
        //                             </Link>
        //                         </td>
        //                     </tr>
        //                 )}
        //             />
        //             {partners.filter((res) => filter === res.status).length ===
        //                 0 && (
        //                 <tr>
        //                     <td colSpan="7" className="p-5 text-center">
        //                         No partner found
        //                     </td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>
        // </div>
        <div className="overflow-scroll text-dark">
            <div className="w-[1280px] xl:w-full border rounded-md">
                <div className="grid grid-cols-[.6fr,4fr,3fr,2.5fr,4fr,1fr] px-6 py-4 border-b gap-x-2">
                    <div className="col-start-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>Foundation Name</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Email</h1>
                    </div>
                    <div className="col-start-4">
                        <h1>Phone Number</h1>
                    </div>
                    <div className="col-start-5">
                        <h1>Addres</h1>
                    </div>
                    <div className="col-start-6">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={partners}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"} 
                                ${index + 1 != partners.length && "border-b"}
                                grid grid-cols-[.6fr,4fr,3fr,2.5fr,4fr,1fr] px-6 py-3 items-center gap-x-2`}
                        >
                            <div className="col-start-1">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{item.name}</h1>
                            </div>
                            <div className="col-start-3">
                                <h1>{item.email}</h1>
                            </div>
                            <div className="col-start-4">
                                <h1>{formatPhoneNumber(item.phoneNumber)}</h1>
                            </div>
                            <div className="col-start-5">
                                <h1>{item.address}</h1>
                            </div>
                            <div className="col-start-6">
                                <Link
                                    to={`/dashboard/admin/campaign/${item.id}`}
                                >
                                    <IconDetail />
                                </Link>
                            </div>
                        </div>
                    )}
                />
                {partners.length == 0 && (
                    <h1 className="text-center py-6">Partner Not Found</h1>
                )}
            </div>
        </div>
    );
};

export default TablePartner;
