import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";

const data = [
    {
        section: "Definitions",
        content: [
            {
                term: "CareMate",
                definition:
                    "The platform that provides services to facilitate donation campaigns for foundations or organizations.",
            },
            {
                term: "Foundation/Organization",
                definition:
                    "The party submitting the donation campaign and is fully responsible for the campaign.",
            },
            {
                term: "Donation",
                definition:
                    "Money or goods given by donors to support the campaign organized by the foundation.",
            },
        ],
    },
    {
        section: "Obligations of the Foundation",
        content: [
            {
                term: "Legality",
                definition:
                    "The foundation must be legally registered and have valid licenses in accordance with applicable laws and regulations.",
            },
            {
                term: "Transparency",
                definition:
                    "The foundation must provide clear and accurate information regarding the purpose, use of funds, and expenditure reports for the campaign.",
            },
            {
                term: "Campaign Content",
                definition:
                    "The campaign content (including images and descriptions) must comply with CareMate's policies and regulations and must not violate any laws or third-party rights.",
            },
            {
                term: "Compliance with Laws",
                definition:
                    "The foundation must ensure that the campaign does not conflict with applicable laws, including but not limited to anti-fraud laws and copyright infringement.",
            },
        ],
    },
    {
        section: "Campaign Submission Process",
        content: [
            {
                term: "Campaign Submission",
                definition:
                    "The foundation must register and create an account on CareMate’s platform to submit a campaign.",
            },
            {
                term: "Campaign Form",
                definition:
                    "The foundation is required to complete a campaign form that includes the donation goal, estimated funds needed, and the campaign duration.",
            },
            {
                term: "Approval Process",
                definition:
                    "CareMate reserves the right to review and approve or reject any submitted campaign in accordance with our internal policies.",
            },
        ],
    },
    {
        section: "Management of Donation Funds",
        content: [
            {
                term: "Facilitating Donations",
                definition:
                    "CareMate will facilitate the collection of donations through our website platform.",
            },
            {
                term: "Fund Disbursement",
                definition:
                    "All donations received will be disbursed to the foundation as agreed upon.",
            },
            {
                term: "Administration Fee",
                definition:
                    "CareMate will charge an administration fee of 3% of the total funds collected from the campaign as a platform operational fee. This fee will be deducted from the donation amount before the funds are transferred to the foundation.",
            },
            {
                term: "Fund Management",
                definition:
                    "The foundation is fully responsible for managing the received funds and must provide transparent reports on the use of the funds to the donors.",
            },
        ],
    },
    {
        section: "Commission and Fees",
        content: [
            {
                term: "CareMate Administration Fee",
                definition:
                    "As mentioned above, CareMate will deduct 3% from the total funds raised as an administrative fee. The foundation agrees to accept this reduction from the total donations received.",
            },
            {
                term: "Platform Operational Fee",
                definition:
                    "This fee is used to support the operational costs and maintenance of our platform.",
            },
        ],
    },
    {
        section: "Refunds",
        content: [
            {
                term: "Non-Refundable Donations",
                definition:
                    "Donations that have been made are non-refundable, except in certain cases as regulated by law or if the campaign is canceled by CareMate.",
            },
            {
                term: "Refund Decisions",
                definition:
                    "If a campaign is canceled or fails, CareMate will decide whether the collected funds will be refunded to the donors or redirected to another relevant purpose.",
            },
        ],
    },
    {
        section: "Use of Information and Privacy",
        content: [
            {
                term: "Donor Data Collection",
                definition:
                    "The foundation agrees to collect, use, and store donor personal data in accordance with CareMate’s privacy policy.",
            },
            {
                term: "Data Sharing",
                definition:
                    "The foundation is not permitted to sell or share donor personal data without explicit consent from the donor.",
            },
        ],
    },
    {
        section: "Responsibilities of the Foundation",
        content: [
            {
                term: "Compliance with Laws",
                definition:
                    "The foundation is responsible for complying with all applicable laws regarding fundraising and the use of the funds.",
            },
            {
                term: "Liability for Misleading or Harmful Campaigns",
                definition:
                    "The foundation is also responsible if the campaign misleads or harms others, whether directly or indirectly.",
            },
            {
                term: "CareMate's Liability",
                definition:
                    "CareMate is not responsible for any claims or issues arising from the campaign run by the foundation.",
            },
        ],
    },
    {
        section: "Limitation of Liability of CareMate",
        content: [
            {
                term: "CareMate's Responsibility",
                definition:
                    "CareMate is not liable for the actions of the foundation, the management of funds, or the failure of the campaign.",
            },
            {
                term: "Platform Limitation",
                definition:
                    "CareMate is only responsible for providing the platform for fundraising but cannot guarantee the success or smooth running of the campaign.",
            },
        ],
    },
    {
        section: "Campaign Termination",
        content: [
            {
                term: "Campaign Suspension",
                definition:
                    "CareMate reserves the right to terminate or suspend a campaign without prior notice if the campaign violates the terms and conditions or if there is an indication of fraud or legal violation.",
            },
            {
                term: "Foundation Termination Rights",
                definition:
                    "The foundation may terminate the campaign at any time but cannot request the return of funds already raised.",
            },
        ],
    },
    {
        section: "Changes to the Terms and Conditions",
        content: [
            {
                term: "Policy Changes",
                definition:
                    "CareMate reserves the right to change these terms and conditions at any time, by notifying the foundation via email or through the platform. These changes will take effect immediately once published on the CareMate website.",
            },
        ],
    },
    {
        section: "Dispute Resolution",
        content: [
            {
                term: "Negotiation",
                definition:
                    "Any dispute arising in relation to the donation campaign will be settled through negotiation.",
            },
            {
                term: "Legal Resolution",
                definition:
                    "If no agreement is reached, the dispute will be resolved through legal channels under the laws of Indonesia.",
            },
        ],
    },
    {
        section: "Contact",
        content: [
            {
                term: "Contact Information",
                definition:
                    "If you have any questions regarding these terms and conditions, you can contact us at:",
            },
            {
                term: "Email",
                definition: "[email@example.com]",
            },
            {
                term: "Address",
                definition: "[CareMate Office Address]",
            },
        ],
    },
];

const TermsAndConditions = () => {
    const [activeSection, setActiveSection] = useState("");

    const handleScroll = () => {
        const sections = document.querySelectorAll("div[id]");
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
                setActiveSection(
                    section.id === "root" ? "Definitions" : section.id
                );
            }
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <section className="flex flex-col h-[40vh] gap-4 justify-center text-dark/85">
                <div className="w-full h-[40vh] absolute left-0 right-0">
                    <img
                        src="https://enigmacamp.com/images/program/offline-bootcamp.webp"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="w-full h-[40vh] bg-gradient-to-br from-dark/90 via-dark/70 to-dark/50 absolute top-0"></div>
                </div>
                <div className="flex flex-col items-center  z-10 text-light">
                    <h1 className="text-5xl xl:text-8xl font-bold">
                        Tearms And Conditions
                    </h1>
                    <h2 className="text-2xl xl:text-3xl font-light">
                        For donations and campaign by fondations on caremate
                    </h2>
                </div>
            </section>
            <section className="flex gap-2 py-10">
                <aside className="w-1/3 p-4 hidden rounded-xl h-max border bg-light xl:flex flex-col gap-6 capitalize sticky top-24">
                    <EachUtils
                        of={data}
                        render={(item, index) => (
                            <a
                                href={`#${item.section}`}
                                className="flex items-center gap-2 w-max cursor-pointer break-words"
                            >
                                <div className="flex justify-center items-center border w-8 aspect-square rounded-md bg-dark/15 text-dark/80">
                                    <h1>{index + 1}</h1>
                                </div>
                                <h1
                                    className={`${
                                        activeSection === item.section
                                            ? "text-primary"
                                            : "text-dark/60"
                                    } transition-template`}
                                >
                                    {item.section}
                                </h1>
                            </a>
                        )}
                    />
                </aside>
                <main className="w-full xl:w-2/3 p-4 rounded-xl border bg-light flex flex-col gap-6 capitalize">
                    <EachUtils
                        of={data}
                        render={(item) => (
                            <div
                                className="flex flex-col gap-3"
                                id={item.section}
                            >
                                <h1 className="text-2xl xl:text-4xl text-dark/90">
                                    {item.section}
                                </h1>
                                <EachUtils
                                    of={item.content}
                                    render={(item) => (
                                        <div className="flex flex-col gap-2 font-light text-xs xl:text-base">
                                            <h3>
                                                <span className="font-medium">
                                                    {item.term}
                                                </span>
                                                , {item.definition}
                                            </h3>
                                        </div>
                                    )}
                                />
                            </div>
                        )}
                    />
                </main>
            </section>
        </>
    );
};

export default TermsAndConditions;
