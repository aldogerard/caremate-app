import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import PartnerSlice from "./feature/PartnerSlice";
import PartnerDocSlice from "./feature/PartnerDocSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        partner: PartnerSlice,
        partnerDoc: PartnerDocSlice,
    },
});

export default store;
