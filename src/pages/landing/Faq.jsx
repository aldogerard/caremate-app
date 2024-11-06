import {Accordion, AccordionItem} from "@nextui-org/react";

export default function FAQ() {
  const faqItems = [
    {
      question: "How does CareMate work?",
      answer:
        "CareMate works by allowing users to set up fundraisers for various causes. Donations can be made directly through the platform.",
    },
    {
      question: "What can I raise money for?",
      answer:
        "You can raise money for personal needs, medical expenses, community projects, and more.",
    },
    {
      question: "How does CareMate keep fundraisers safe?",
      answer:
        "CareMate has verification processes to ensure that fundraisers are genuine and that funds are used responsibly.",
    },
    {
      question: "How do I withdraw funds from my campaign?",
      answer:
        "Funds can be withdrawn by following the instructions on your campaign dashboard once the required criteria are met.",
    },
    {
      question: "Are there any deadlines or time limits?",
      answer:
        "Campaigns typically do not have deadlines, but specific causes may set their own time limits.",
    },
  ];
  const donateItems = [
    {
      question: "How does CareMate work?",
      answer:
        "CareMate works by allowing users to set up fundraisers for various causes. Donations can be made directly through the platform.",
    },
    {
      question: "What can I raise money for?",
      answer:
        "You can raise money for personal needs, medical expenses, community projects, and more.",
    },
    {
      question: "How does CareMate keep fundraisers safe?",
      answer:
        "CareMate has verification processes to ensure that fundraisers are genuine and that funds are used responsibly.",
    },
    {
      question: "How do I withdraw funds from my campaign?",
      answer:
        "Funds can be withdrawn by following the instructions on your campaign dashboard once the required criteria are met.",
    },
    {
      question: "Are there any deadlines or time limits?",
      answer:
        "Campaigns typically do not have deadlines, but specific causes may set their own time limits.",
    },
  ];

  return (
    <div className="bg-white p-5 md:p-12 lg:p-20">
      <h2 className="text-2xl font-medium text-black mb-4 md:text-4xl">
        Find Answers to Your Questions about CareMate
      </h2>
      <p className="text-lg text-gray-700 mb-12 md:text-xl">
        Learn more about fundraising and donating in CareMate
      </p>

      <h2 className="text-2xl font-medium text-black mb-4">
        Question about fundraising
      </h2>
      {faqItems.map((item, index) => (
        <Accordion>
      <AccordionItem key={index} aria-label={item.question} title={item.question}>
        {item.answer}
      </AccordionItem>
    </Accordion>
      ))}
      <h2 className="text-2xl font-medium text-black mb-4 mt-12">
        Question about donating
      </h2>
      {donateItems.map((item, index) => (
        <div key={index} className="collapse collapse-plus bg-white mb-4">
          <input
            type="radio"
            name="faq-accordion"
            defaultChecked={index === 0}
          />
          <div className="collapse-title text-xl font-medium text-black">
            {item.question}
          </div>
          <div className="collapse-content text-black text-justify">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
