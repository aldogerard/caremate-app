import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import PartnerSlice from "./feature/partner/PartnerSlice";
import PartnerDocSlice from "./feature/partner/PartnerDocSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        partner: PartnerSlice,
        partnerDoc: PartnerDocSlice,
    },
});

export default store;
