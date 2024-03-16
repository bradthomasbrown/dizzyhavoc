export default function Roadmap() {
  return (
    <>

    <div class="w-full h-full sm:h-screen max-w-screen-lg  mx-auto flex flex-col justify-center">
      <div class="flex p-7 flex-col rounded-xl shadow-lg bg-blur2">
      <p
  id="info"
  class="info
  font-medium
  italic
  text-[1rem]
  unselectable
  sm:text-[2rem]
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  mx-auto
  font-[Poppins]
  shadow-lg
  py-3
  bg-blur2
  lg:max-w-[32rem]
  max-w-full
  rounded-xl
  px-6
  mb-[0.5rem]">
  Stage 1</p>
            <div class="xl:flex-row gap-2 flex-col flex p-2">
            <div class="xl:flex-row gap-2 flex-col flex">
                <div class="flex flex-row dark:text-[#d2d2d2] border-[#e0cdad] border-2 text-[#3d3d3d] rounded-xl shadow-lg dark:bg-blur4 bg-blur3">
              <div class="flex p-4 flex-col">
                  <h1 class="text-3xl text-center font-bold font-[Poppins]">I.</h1>
                  <p class="mt-2 text-xl">
                    <ul>
                      <li class="items-center flex h-full text-xl">
                      Building the bridge so holders on all chains can exchange $DZHV across chains freely. 1 : 1 ratio.
                      </li>
                    </ul>
                  </p>
                </div>

                </div>
                </div>
              <div class="flex flex-row w-full dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg bg-blur3">
                <div class="flex p-4 flex-col">
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
                  <div class="flex p-4 flex-col">
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
                <div class="flex p-4 flex-col">
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
                <div class="flex p-4 flex-col">
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


          {/* <p class="font-[Poppins] dark:text-[#d2d2d2] text-center text-lg">
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
          </p> */}

      </div>
    </div>
    </>
  );
}
