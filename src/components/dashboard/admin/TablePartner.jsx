import Button from "@/components/Button";
import { setCurrentPartner } from "@/redux/feature/admin/adminPartnerSlice";
import EachUtils from "@/utils/EachUtils";
import { limitText } from "@/utils/Utils";
import { useDispatch, useSelector } from "react-redux";

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
        <div className="relative overflow-x-auto border rounded-md shadow-sm">
            <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500">
                <thead className="text-gray-700">
                    <tr className="text-left border-b">
                        <th scope="col" className="p-4">
                            No
                        </th>
                        <th scope="col">Foundation Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <EachUtils
                        of={partners}
                        render={(item, index) => (
                            <tr
                                className={`${
                                    index % 2 === 0 && "bg-accent/5"
                                }`}
                                key={item.id}
                            >
                                <td className="px-4 py-6">
                                    {calculateRowNumber(index)}
                                </td>
                                <td>{limitText(item?.name || "", 20)}</td>
                                <td>{limitText(item?.email || "", 20)}</td>
                                <td>
                                    {limitText(item?.phoneNumber || "", 12)}
                                </td>
                                <td>{limitText(item?.address || "", 20)}</td>
                                <td>
                                    {limitText(item?.description || "NaN", 30)}
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        name={"Detail"}
                                        onClick={() => handleClickDetail(item)}
                                    />
                                </td>
                            </tr>
                        )}
                    />
                    {partners.filter((res) => filter === res.status).length ===
                        0 && (
                        <tr>
                            <td colSpan="7" className="p-5 text-center">
                                No partner found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablePartner;
