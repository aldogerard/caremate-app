import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import partnerSlice from "./feature/partner/partnerSlice";
import campaignSlice from "./feature/partner/campaignSlice";
import withdrawalSlice from "./feature/partner/withdrawalSlice";
import campaignReportSlice from "./feature/partner/campaignReportSlice";
import adminPartnerSlice from "./feature/admin/adminPartnerSlice";
import adminCampaignSlice from "./feature/admin/adminCampaignSlice";
import donationSlice from "./feature/partner/donationSlice";
import adminDonorSlice from "./feature/admin/adminDonorSlice";
import adminWithdrawalSlice from "./feature/admin/adminWithdrawalSlice";
import adminReportSlice from "./feature/admin/adminReportSlice";
import adminDonationSlice from "./feature/admin/adminDonationSlice";

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
        adminWithdrawal: adminWithdrawalSlice,
        adminDonor: adminDonorSlice,
        adminReport: adminReportSlice,
        adminDonation: adminDonationSlice,
    },
});

export default store;
