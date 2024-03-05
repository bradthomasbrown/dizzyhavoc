export default function Roadmap(){
    return (
        <div class="flex flex-col justify-center w-full xl:w-[50%] mb-[1rem] h-[100%] rounded-xl shadow-lg bg-blur">
        <div class="flex flex-col mt-7 w-full items-center ml-0 ">
        <p class="font-[Poppins] underline flex  text-[1.4rem] text-center mb-[-15px] mt-2">
          Stage 1 progress:
          <br />
          <br />
        </p>
        <div class="flex flex-row justify-start top-0">
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
        <p class="font-[Poppins] text-lg mt-2 text-center">
         more details in the{" "}
          <a
            class="text-indigo-600"
            href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit"
            target="_blank"
          >
            litepaper
          </a>
          <br />
          <br />
        </p>
      </div>
      </div>
    )
}