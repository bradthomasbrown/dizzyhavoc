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
    "The primary focus at the moment is on constructing the cross chain bridge. The token doesn't have immediate utility; it's utility is part of the planned future developments. However, it's worth mentioning that one of the upcoming plans involves using the token as payment for a convenient service, allowing users to deploy contracts.";
  return (
    <div class="flex flex-col justify-center w-full xl:w-[60%] mb-[1rem] h-[100%] rounded-xl shadow-lg bg-blur">
      <div class="flex w-full flex-col">
        <p class="font-[Poppins] underline text-[1.4rem] text-center mb-[-15px]">
          Utility and Goals:
          <br />
          <br />
        </p>
        <div class="xl:max-h-[90%] px-2 max-h-full">
          <ul>
            <li class="text-2xl font-[Poppins]">What's the innovation ?</li>
            <p class="mt-2">{content1}</p>
            <li class="text-2xl mt-2 font-[Poppins]">
              What would be its impact ?
            </li>
            <p class="text-lg mt-2 italic">
              Deploying in this manner is expected to have several positive
              effects:
            </p>
            <ul class="mt-2">
              <li>{content2}</li>
              <li>{content3}</li>
              <li>{content4}</li>
            </ul>
            <li class="text-2xl mt-2 font-[Poppins]">What to expect next ?</li>
            <p class="mt-2">
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
