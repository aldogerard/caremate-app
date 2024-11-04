import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import partnerSlice from "./feature/partner/partnerSlice";
import campaignSlice from "./feature/partner/campaignSlice";
import withdrawalSlice from "./feature/partner/withdrawalSlice";
import campaignReportSlice from "./feature/partner/campaignReportSlice";
import adminPartnerSlice from "./feature/admin/adminPartnerSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        partner: partnerSlice,
        campaign: campaignSlice,
        campaignReport: campaignReportSlice,
        withdrawal: withdrawalSlice,

        adminPartner: adminPartnerSlice,
    },
});

export default store;
