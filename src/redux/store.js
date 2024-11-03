import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import PartnerSlice from "./feature/partner/PartnerSlice";
import CampaignSlice from "./feature/partner/CampaignSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        partner: PartnerSlice,
        campaign: CampaignSlice,
    },
});

export default store;
