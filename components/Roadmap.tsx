export default function Roadmap() {
  return (
    <>
      <p
        class="
  mt-[1rem]
  sm:mt-[3rem]
  mb-[1rem]
  font-medium
  sm:text-3xl
  text-xl
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[Poppins]
  lg:max-w-[32rem]
  max-w-full
  rounded-xl
  xl-mt"
      >
        Roadmap
      </p>
      <div class="flex flex-col gap-y-[1rem] items-center">
        <div class="border-2 border-[#ff2c2c4d] flex text-lg sm:text-xl tracking-tight font-[Poppins] dark:text-[#d2d2d2] text-[#3d3d3d] font-light p-4 sm:w-[42%] w-screen flex-col rounded-xl shadow-lg bg-blur4">
          <ul>
            <li>
            <h1 class="text-bold text-nowrap unselectable font-[monospace] text-2xl">I</h1>
            Building the bridge so holders on all chains can exchange $DZHV across chains freely.
            </li>
            <li class="text-bold">
            1 : 1 ratio.
            </li>
          </ul>
        </div>
        <div class="flex text-lg sm:text-xl tracking-tight font-[Poppins] dark:text-[#d2d2d2] text-[#3d3d3d] font-light p-4 sm:w-[42%] w-screen flex-col rounded-xl shadow-lg bg-blur4">
        <h1 class="text-bold unselectable font-[monospace] text-2xl">II</h1>
    Expanding to as many mainnet chains to broaden our
    reach, with the goal of expanding to numerous chains
    (potentially dozens or even hundreds) by bridging coins
    and deploying various projects.
        </div>
        <div class="flex text-lg sm:text-xl tracking-tight font-[Poppins] dark:text-[#d2d2d2] text-[#3d3d3d] font-light p-4 sm:w-[42%] w-screen flex-col rounded-xl shadow-lg bg-blur4">
        <h1 class="text-bold unselectable font-[monospace] text-2xl">III</h1>
    First gameFi feature: Trading game as a gas-efficient
    improvement to rebasing.
        </div>
        <div class="flex text-lg sm:text-xl tracking-tight font-[Poppins] dark:text-[#d2d2d2] text-[#3d3d3d] font-light p-4 sm:w-[42%] w-screen flex-col rounded-xl shadow-lg bg-blur4">
          <ul>
            <li>
            <h1 class="text-bold unselectable font-[monospace] text-2xl">IV</h1>
            Second gameFi feature: Dusting, a system to incentivize
  token holders to engage in on-chain advertising.
            </li>
            <li>
            The
  system is going to strategically send tokens to
  individuals who have yet to possess them, creating a new
  exposure through the intentional distribution of tokens
  into targeted wallets.
            </li>
          </ul>

        </div>
        <div class="flex text-lg sm:text-xl tracking-tight font-[Poppins] dark:text-[#d2d2d2] text-[#3d3d3d] font-light p-4 sm:w-[42%] w-screen flex-col rounded-xl shadow-lg bg-blur4">
          <ul>
          <li>
          <h1 class="text-bold unselectable font-[monospace] text-2xl">V</h1>
            Last objective for Stage 1 is to finely tune the
    efficiency of ERC20 standards and potentially integrate
    some elements from GameFi concepts to it.</li>
    <li>This process
    aims to minimize gas consumption expenses, 
    counterbalancing the elevated costs associated with
    proxy implementation and the utilization of upgradable
    patterns.</li>
    <li>By doing the above said the final milestone is
    reaching a decent ERC20 token presence, not only in
    major but also numerous minor chains.</li>  
          </ul>

        </div>
      </div>
    </>
  );
}

{
 
}
