export default function Info() {
  const content1 =
    "DizzyHavoc is a new deployment method for smart contracts, specifically designed to reduce costs and enhance flexibility. Instead of redeploying the same code multiple times, it utilizes an upgradable proxy that points to a specialized resolver, which in turn links to one or more implementations. By doing this, it significantly lowers deployment costs and allows for easier maintenance and upgrades of smart contracts.";
  const content2 =
    "● Reduction in deployment costs by reusing implementation code instead of redeploying it.";
  const content3 =
    "● Flexibility in configuring the resolver to point to different implementations, promoting code reusability.";
  const content4 =
    "● Ability to evolve and optimize smart contracts over time, with all deployments benefiting from updates to the underlying implementation.";
  const content5 =
    "The primary focus at the moment is on constructing the cross chain bridge.";
 
 return (
      <div class="flex flex-col justify-center min-w-full xl:min-w-[50rem] max-w-[70rem] xl:max-w-[70rem] mx-auto mb-[1rem] h-[100%] rounded-xl shadow-lg bg-blur2">
        <div class="flex w-full flex-col  p-4">
          <p class="font-[Poppins] underline text-[1.4rem] text-center mb-[-15px]">
            Utility and Goals:
            <br />
            <br />
          </p>
          <div class="xl:max-h-[90%] px-2 max-h-full">
            <ul>
              <li class="text-2xl font-[Poppins]">What is DizzyHavoc?</li>
              <p class="mt-2 text-xl">{content1}</p>
              <p class="text-lg mt-2 italic">
                Deploying in this manner is expected to have several positive
                effects:
              </p>
              <ul class="mt-2">
                <li class="text-xl">{content2}</li>
                <li class="text-xl">{content3}</li>
                <li class="text-xl">{content4}</li>
              </ul>
              <li class="text-2xl mt-2 font-[Poppins]">What to expect next ?</li>
              <p class="mt-2 text-xl">
                {content5} More infos in the litepaper{" "}
                <a
                  class="text-indigo-900 bold"
                  target="_blank"
                  href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit"
                >
                  here
                </a>
              </p>
            </ul>
          </div>
        </div>
      </div>
    );
    
}
