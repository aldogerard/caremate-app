import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import partnerSlice from "./feature/partner/partnerSlice";
import campaignSlice from "./feature/partner/campaignSlice";
import withdrawalSlice from "./feature/partner/withdrawalSlice";
import campaignReportSlice from "./feature/partner/campaignReportSlice";
import adminPartnerSlice from "./feature/admin/adminPartnerSlice";
import adminCampaignSlice from "./feature/admin/adminCampaignSlice";
import adminWithdrawal from "./feature/admin/adminWithdrawalSlice";
import donationSlice from "./feature/partner/donationSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        partner: partnerSlice,
        campaign: campaignSlice,
        campaignReport: campaignReportSlice,
        withdrawal: withdrawalSlice,
        donation: donationSlice,

        adminPartner: adminPartnerSlice,
        adminCampaign: adminCampaignSlice,
        adminWithdrawal: adminWithdrawal,
    },
});

export default store;
