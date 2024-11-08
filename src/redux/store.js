import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";
import PartnerSlice from "./feature/PartnerSlice";
import PartnerDocSlice from "./feature/PartnerDocSlice";
import faqSlice from "./landing/faqSlice";
import newsSlice from "./landing/newsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        partner: PartnerSlice,
        partnerDoc: PartnerDocSlice,
        faq: faqSlice,
        news:newsSlice
    },
});

export default store;
