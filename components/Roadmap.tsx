export default function Roadmap() {
  return (
    <div class="w-full">
      <p class="font-medium text-[1.7rem] unselectable sm:text-[2.5rem] text-center dark:text-[#d0d0d0] text-[#3d3d3d] mx-auto font-[Poppins] shadow-lg mt-[0.5rem] py-3 bg-blur2 lg:max-w-[32rem] max-w-full rounded-xl px-6 mb-[1rem]">
        Roadmap
      </p>

      <div class="flex flex-col w-full mx-auto  min-w-full xl:min-w-[50rem] max-w-[70rem] xl:max-w-[70rem] rounded-xl shadow-lg bg-blur2">
        <div class="flex mt-5 flex-col w-full items-center sm:p-4 p-1 ml-0 ">
          <div class="flex flex-row justify-start  top-0"> {/* Roadmap stepper */}
            <ol class="flex items-center scale-125  sm:p-4 p-1 text-center  w-full text-xs  text-gray-900 font-medium xl:text-base"> {/* First stepper element (circle+bar) */}
              <li class="flex w-full relative text-indigo-600 dark:text-[#9f7d44]  after:content-['']  after:w-full after:h-0.5  after:bg-indigo-100 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
                <div class="block whitespace-nowrap z-10">
                  <span class="w-6 h-6 bg-gray-50 border-4 dark:border-[#cf983f] border-indigo-800 rounded-full flex  justify-center items-center mx-2 mb-3 text-[6px] text-sm text-indigo-800 lg:w-8 lg:h-8">
                    I
                  </span>
                </div>
              </li>
              <li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
                <div class="block whitespace-nowrap z-10">
                  <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-2 mb-3 text-sm text-gray-900 lg:w-8 lg:h-8">
                    II
                  </span>
                </div>
              </li>
              <li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5  after:top-3 after:left-4">
                <div class="block whitespace-nowrap z-10">
                  <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-2 mb-3 text-sm  lg:w-8 lg:h-8">
                    III
                  </span>
                </div>
              </li>
              <li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
                <div class="block whitespace-nowrap z-10">
                  <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-2 mb-3 text-sm  lg:w-8 lg:h-8">
                    IV
                  </span>
                </div>
              </li>
              <li class="flex w-full relative text-gray-900  ">
                <div class="block whitespace-nowrap z-10">
                  <span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-2 mb-3 text-sm  lg:w-8 lg:h-8">
                    V
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div class="flex p-2 flex-col w-full"> {/* Roadmap card elements */}
            <div class="xl:flex-row gap-2 flex-col flex p-2"> {/* First element */}
              <div class="flex flex-row  dark:text-[#d2d2d2] text-[#3d3d3d] border-2 dark:border-[#e0cdad] border-indigo-800 rounded-xl shadow-lg dark:bg-blur4 bg-blur3">
                <div class="flex p-7 flex-col">
                  <ul>
                    <h1 class="text-3xl text-center font-bold font-[Poppins]">I.</h1>
                    <li class="items-center pb-3 flex h-full text-xl">
                      Building the bridge so holders on all chains can exchange
                      $DZHV across chains freely, 1 : 1 ratio.
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex flex-row w-full sm:w-[90%] dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg bg-blur3">
                <div class="flex p-7 flex-col">
                  <h1 class="text-3xl text-center font-bold font-[Poppins]">II.</h1>
                  <p class="mt-2 text-xl">
                    <ul>
                      <li class="items-center flex h-full text-xl">
                        Expanding to as many mainnet chains to broaden our
                        reach, with the goal of expanding to numerous chains
                        (potentially dozens or even hundreds) by bridging coins
                        and deploying various projects.
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
              <div class="xl:flex-row gap-2 flex-col flex">
                <div class="flex flex-row dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg dark:bg-blur4 bg-blur3">
                  <div class="flex p-7 flex-col">
                    <ul>
                      <h1 class="text-3xl text-center font-bold font-[Poppins]">III.</h1>
                      <li class="items-center pb-5 flex h-full text-xl">
                        First gameFi feature: Trading game as a gas-efficient
                        improvement to rebasing.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="xl:flex-row gap-2 flex-col flex p-2">
              <div class="flex flex-row dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg dark:bg-blur4 bg-blur3">
                <div class="flex p-7 flex-col">
                  <ul>
                    <h1 class="text-3xl text-center font-bold font-[Poppins]">IV.</h1>
                    <li class="items-center pb-5 flex h-full text-xl">
                      Second gameFi feature: Dusting, a system to incentivize
                      token holders to engage in on-chain advertising. The
                      system is going to strategically send tokens to
                      individuals who have yet to possess them, creating a new
                      exposure through the intentional distribution of tokens
                      into targeted wallets.
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex flex-row dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg bg-blur3">
                <div class="flex p-7 flex-col">
                  <h1 class="text-3xl text-center font-bold font-[Poppins]">V.</h1>
                  <p class="mt-2 text-xl">
                    <ul>
                      <li class="items-center pb-5 flex h-full text-xl">
                        {" "}
                        Last objective for Stage 1 is to finely tune the
                        efficiency of ERC20 standards and potentially integrate
                        some elements from GameFi concepts to it.{"\n"}This process
                        aims to minimize gas consumption expenses, 
                        counterbalancing the elevated costs associated with
                        proxy implementation and the utilization of upgradable
                        patterns.{"\n"} By doing the above said the final milestone is
                        reaching a decent ERC20 token presence, not only in
                        major but also numerous minor chains.
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
            {/* 
          </div>
          <div class="flex flex-row w-full bg-blur3  sm:p-4 p-1 mb-4">
          <div class="flex flex-col">
                <li class="text-xl dark:text-[#d2d2d2]  mx-2 inline">III. </li>
                <p class="text-xl dark:text-[#d2d2d2]  inline">
                First gameFi feature: Trading game as a gas-efficient
                  improvement to rebasing.
                </p>
              </div>
          </div>
          <div class="flex flex-row w-full bg-blur3  sm:p-4 p-1 mb-4">
          <div class="flex flex-col">
                <li class="text-xl dark:text-[#d2d2d2]  mx-2 inline">IV. </li>
                <p class="text-xl dark:text-[#d2d2d2]  inline">
                Second gameFi feature: Dusting, a system to incentivize token
                  holders to engage in on-chain advertising. The system is going
                  to strategically send tokens to individuals who have yet to
                  possess them, creating a new exposure through the intentional
                  distribution of tokens into targeted wallets.
                </p>
              </div>
          </div>
          <div class="flex flex-row w-full bg-blur3  sm:p-4 p-1 mb-4">
          <div class="flex flex-col">
                <li class="text-xl dark:text-[#d2d2d2]  mx-2 inline">V. </li>
                <p class="text-xl dark:text-[#d2d2d2]  inline">
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
          </div>
        </div> */}
          </div>

          <p class="font-[Poppins] dark:text-[#d2d2d2] mt-7 text-lg">
            more details in the{" "}
            <a
              class="text-indigo-900 dark:text-[#e0cdad]"
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
    </div>
  );
}
