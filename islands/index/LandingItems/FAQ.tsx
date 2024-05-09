import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
function FAQItem({ question, answer }) {
  const [exp, setexp] = useState(false);
  return (
    <>
      <div className="flex flex-col vignets">
        <div
          class="sm:text-3xl text-xl font-[Poppins] relative unselectable dark:text-[#a9a9a9] text-[#3d3d3d] px-3 my-1 text-start rounded-md bg-gradient-to-r from-[#f1f1f180] dark:from-[#28282880] dark:via-[#1e1e1e] via-[#f1f1f1] to-[#f1f1f180] dark:to-[#19191980] sm:w-full w-screen cursor-pointer hover:scale-[100.5%] active:scale-[99.5%]"
          onClick={() => setexp(!exp)}
        >
          {question}
          {exp ? (
            <a class="text-lg ml-1 font-[Poppins] absolute right-1">-</a>
          ) : (
            <a class="text-lg ml-1 font-[Poppins] absolute right-1">+</a>
          )}
        </div>
        {exp && (
          <p class="sm:text-xl text-lg tracking-tight font-[Poppins] mb-4 sm:w-full w-screen unselectable dark:text-[#d2d2d2] text-[#3d3d3d]">
            {answer}
          </p>
        )}
      </div>
    </>
  );
}
export let state = false;
export function FAQ() {
  if (!IS_BROWSER) return null;

  const faqItems = [
    {
      question: "What is DizzyHavoc?",
      answer: (
        <ul>
          <li>
            DizzyHavoc is a new deployment method for smart contracts,
            specifically designed to reduce costs and enhance flexibility.
          </li>
          <li>It's also a movement of global optimization in the realm of Web3.</li>
        </ul>
      ),
    },
    {
      question: "What makes DizzyHavoc unique?",
      answer:
        "The utilization of the EVM bytecode language instead of Solidity. This implies a more low-level and hardware-specific form of programming, closely tied to the architecture of CPUs.",
    },
    {
      question: "What would be its impact?",
      answer: (
        <ul>
          <li>
            ● Reduction in deployment costs by reusing implementation code
            instead of redeploying it.
          </li>
          <li>
            ● Flexibility in configuring the resolver to point to different
            implementations, promoting code reusability.
          </li>
          <li>
            ● Ability to evolve and optimize smart contracts over time, with all
            deployments benefiting from updates to the underlying
            implementation.
          </li>
        </ul>
      ),
    },
    {
      question: "Which chains are supported?",
      answer:
        "Ethereum, Arbitrum, Avalanche, BSC & Base. More EVM chains are coming soon.",
    },
    {
      question: "Prices are different on each chain?",
      answer:
        "Different liquidity pools for each chain lead to different prices. It will eventually even out, or not.",
    },
    {
      question: "Can I contribute?",
      answer: (
        <ul>
          <li>
            Yes, contributions are greatly appreciated. You can check the github
            to access the base code.
          </li>
          <li>
          You can also contribute by creating DizzyHavoc related art or documentation;
           your creations might end up on the website!
          </li>
        </ul>
      ),
    },
    {
      question: "What to expect next?",
      answer:
      <ul>
      <li>
      The primary focus at the moment is on constructing the cross chain bridge. Then, expanding to as many mainnet chains as possible.
      </li>
      <li>
      You can follow the progress on the <a target="_blank" class="text-[#3b2d82] dark:text-[#ccb286] bold" href="/roadmap">Roadmap</a> page.
      </li>
  
      </ul>
    },
    {
      question: "When marketing?",
      answer: ".",
    },
  ];

  return (
    <div class="flex w-full sm:items-end items-center flex-col sm:flex-row gap-x-4">
      <div class="w-[99vw] sm:w-[810px] h-[450px] grid items-end overflow-y-scroll overflow-x-hidden">
        {
          faqItems.map((item) => (
            <FAQItem question={item.question} answer={item.answer} />
          ))}
      </div>
    </div>
  );
}
