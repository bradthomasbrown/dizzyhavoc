import { useState } from "preact/hooks";

function FAQItem({ question, answer }) {
  const [exp, setexp] = useState(false);


  return (
    <div className="flex flex-col">
      <div class="text-xl font-[Poppins] unselectable dark:text-[#d2d2d2] text-[#3d3d3d] px-3 my-1 rounded-lg bg-blur3 w-[400px] cursor-pointer hover:scale-[100.5%] active:scale-[99.5%]" onClick={() => setexp(!exp)}>{question}</div>
      {exp && <p class="text-md font-[Poppins] unselectable dark:text-[#d2d2d2] text-[#3d3d3d]">{answer}</p>}
    </div>
  );
}

export function FAQ() {
const [hidden, sethidden] = useState(false);
  const faqItems = [
    {
      question: 'What is DizzyHavoc?',
      answer: 'DizzyHavoc is a decentralized ecosystem that allows you to...',
    },
    {
      question: 'How does it work?',
      answer: 'DizzyHavoc works by...',
    },
  ];

  return (
    <>
    <div class="w-full h-[150px] overflow-y-scroll overflow-x-hidden">
    <div onClick={() => sethidden(!hidden)} className="text-xl mb-2 font-medium font-[Poppins] text-center unselectable rounded-lg bg-blur3 w-[90px] cursor-pointer hover:scale-[100.5%] active:scale-[99.5%] dark:text-[#d2d2d2] text-[#3d3d3d]">FAQ</div>
      {hidden&& faqItems.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
    </>
  );
}