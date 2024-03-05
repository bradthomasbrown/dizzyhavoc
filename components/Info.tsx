export default function Info() {
  const content1 =
    "At present, the primary innovation lies in the deployment method of DZHV, it utilizes an upgradable proxy that directs to a specialized upgradable proxy resolver, subsequently linked to one or more upgradable implementations. Since proxies introduce additional usage costs the application of machine code is employed to alleviate this increment.";
  const content2 =
    "● Implementation code, like ERC20, is deployed only once, and subsequent ERC20 deployments reference the implementation rather than repeatedly redeploying identical code. This approach should significantly reduce deployment costs.";
  const content3 =
    "● The resolver, in an abstract sense, serves as an upgradable ERC or EIP. With the capability to point to multiple implementations, it can be configured to point to an ERC20 implementation. Alternatively, it can be utilized to construct an ERC20 implementation by referencing ERC20 Transfer, Approve, TransferFrom implementation. This approach not only eliminates the need for rewriting code, but also allows breakdown for every ERC and EIP into reusable parts, fostering code reusability across various ERCs and EIPs.";
  const content4 =
    "● As these components are also upgradable, ERCs and EIPs can evolve and be optimized over time. Every deployment created in this manner that points to the same implementation would instantly benefit from any optimization, enhancements, bug fix, etc., made to that implementation.";
  const content5 =
    "The primary focus at the moment is on constructing the cross chain bridge. The token doesn't have immediate utility; it's utility is part of the planned future developments. However, it's worth mentioning that one of the upcoming plans involves using the token as payment for a convenient service, allowing users to deploy contracts. More infos in the litepaper";
  return (
    <div class="flex xl:flex-row flex-col justify-center w-full mb-[1rem] h-[100%] rounded-xl bg-blur">
      <div class="flex w-full flex-col">
        <p class="font-[monospace] underline text-[1.4rem] text-center mb-[-15px]">
          Utility and Goals:
          <br />
          <br />
        </p>
        <div class="xl:max-h-[80%] px-2 max-h-full overflow-y-auto xl:overflow-y-scroll">
          <ul>
            <li class="text-2xl">What's the innovation ?</li>
            <p class="mt-2">{content1}</p>
            <li class="text-2xl mt-2">What would be its impact ?</li>
            <p class="text-lg mt-2 italic">
              Deploying in this manner is expected to have several positive
              effects:
            </p>
            <ul class="mt-2">
              <li>{content2}</li>
              <li>{content3}</li>
              <li>{content4}</li>
            </ul>
            <li class="text-2xl mt-2">What to expect next ?</li>
            <p class="mt-2">{content5}</p>
          </ul>
        </div>
      </div>
      <div class="flex flex-col xl:ml-[50px] w-full items-center ml-0 ">
        <p class="font-[monospace] underline flex  text-[1.4rem] text-center mb-[-15px] mt-2">
          Stage 1 progress:
          <img
            title="see page 8 of litepaper for more details."
            class="size-[20px] flex mt-1 mx-1 hover:scale-110"
            src="/help.png"
          ></img>
          <br />
          <br />
        </p>
        <div class="flex flex-row justify-center">
          <ol class="flex items-center scale-125  gap-4 text-center  w-full text-xs text-gray-900 font-medium xl:text-base">
            <li class="flex w-full relative text-indigo-600  after:content-['']  after:w-full after:h-0.5  after:bg-indigo-100 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
              <div class="block whitespace-nowrap z-10">
                <span class="w-6 h-6 bg-gray-50 border-4 border-indigo-800 rounded-full flex  justify-center items-center mx-auto mb-3 text-[6px] text-sm text-indigo-800 lg:w-8 lg:h-8">
                  I
                </span>
              </div>
            </li>
            <li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
              <div class="block whitespace-nowrap z-10">
                <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-gray-900 lg:w-8 lg:h-8">
                  II
                </span>
              </div>
            </li>
            <li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5  after:top-3 after:left-4">
              <div class="block whitespace-nowrap z-10">
                <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-8 lg:h-8">
                  III
                </span>
              </div>
            </li>
            <li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
              <div class="block whitespace-nowrap z-10">
                <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-8 lg:h-8">
                  IV
                </span>
              </div>
            </li>
            <li class="flex w-full relative text-gray-900  ">
              <div class="block whitespace-nowrap z-10">
                <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-8 lg:h-8">
                  V
                </span>
              </div>
            </li>
          </ol>
        </div>
        <div class="h-full w-full flex flex-wrap">
          <div class="flex items-start">
            <ul>
              <div class="flex items-start">
                <li class="text-xl mx-2 inline">I. </li>
                <p class="inline">
                  Building the bridge so holders on all chains can exchange
                  $DZHV across chains freely, 1 : 1 ratio.
                </p>
              </div>
              <div class="flex items-start mt-2">
                <li class="text-xl mx-2  inline">II. </li>
                <p class=" inline">
                  Expanding to as many mainnet chains to broaden our reach, with
                  the goal of expanding to numerous chains (potentially dozens
                  or even hundreds) by bridging coins and deploying various
                  projects.
                </p>
              </div>
              <div class="flex items-start mt-2">
                <li class="text-xl mx-2  inline">III. </li>
                <p class=" inline">
                  First gameFi feature: Trading game as a gas-efficient
                  improvement to rebasing.
                </p>
              </div>
              <div class="flex items-start mt-2">
                <li class="text-xl mx-2  inline">IV. </li>
                <p class=" inline">
                  Second gameFi feature: Dusting, a system to incentivize token
                  holders to engage in on-chain advertising. The system is going
                  to strategically send tokens to individuals who have yet to
                  possess them, creating a new exposure through the intentional
                  distribution of tokens into targeted wallets.
                </p>
              </div>
              <div class="flex items-start mt-2">
                <li class="text-xl mx-2  inline">V. </li>
                <p class=" inline">
                  Last objective for Stage 1 is to finely tune the efficiency of
                  ERC20 standards and potentially integrate some elements from
                  GameFi concepts to it. This process aims to minimize gas
                  consumption expenses, counterbalancing the elevated costs
                  associated with proxy implementation and the utilization of
                  upgradable patterns. By doing the above said the final
                  milestone is reaching a decent ERC20 token presence, not only
                  in major but also numerous minor chains.
                </p>
              </div>
            </ul>
          </div>
        </div>
        <p class="font-[monospace] text-lg font-bold bottom-2 text-center">
          litepaper:{" "}
          <a
            class="text-indigo-600"
            href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit"
            target="_blank"
          >
            doc
          </a>
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}
