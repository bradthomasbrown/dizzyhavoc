import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { PriceHistory } from "../../lib/stats/Requests/priceHistory.tsx";
import { Chiffres } from "../../lib/stats/Requests/Chiffres.tsx";
import { Omnibar } from "./marketbars/omnibar.tsx";
import { tokenCache } from "../../lib/stats/Requests/tokencache.tsx";

export function MarketBarsContainer() {
  if (!IS_BROWSER) return <></>;
  let data = tokenCache ? tokenCache : {};
  const initialloading = useSignal<boolean>(true);
  // holders for each chain
  const arbholders = useSignal<number>(0);
  const bscholders = useSignal<number>(0);
  const baseholders = useSignal<number>(0);
  const avaxholders = useSignal<number>(0);
  const ethholders = useSignal<number>(0);
  // transfers for each chain
  const arbtransfers = useSignal<number>(0);
  const bsctransfers = useSignal<number>(0);
  const basetransfers = useSignal<number>(0);
  const avaxtransfers = useSignal<number>(0);
  const ethtransfers = useSignal<number>(0);
  // index in MarketBar column
  const arborder = useSignal<number>(0);
  const bscorder = useSignal<number>(0);
  const baseorder = useSignal<number>(0);
  const avaxorder = useSignal<number>(0);
  const ethorder = useSignal<number>(0);
  // marketBar tooltip display state
  const arbtooltip = useSignal<boolean>(false);
  const bsctooltip = useSignal<boolean>(false);
  const basetooltip = useSignal<boolean>(false);
  const avaxtooltip = useSignal<boolean>(false);
  const ethtooltip = useSignal<boolean>(false);

  const getPrices = async () => {
      data = tokenCache
      await PriceHistory();
      if(data.base){
        largestPriceDelta(data.eth.price, data.arb.price, data.bsc.price, data.base.price, data.avax.price);
      }
    initialloading.value = false;
  };
  const getChiffres = async() => {
    if (!ethholders.value) {
      const chiffres = await Chiffres();
      if (chiffres) {
        // holders
        ethholders.value = chiffres.holders.eth;
        arbholders.value = chiffres.holders.arb;
        bscholders.value = chiffres.holders.bsc;
        baseholders.value = chiffres.holders.base;
        avaxholders.value = chiffres.holders.avax;
        // transfers
        ethtransfers.value = chiffres.transfers.eth;
        arbtransfers.value = chiffres.transfers.arb;
        bsctransfers.value = chiffres.transfers.bsc;
        basetransfers.value = chiffres.transfers.base;
        avaxtransfers.value = chiffres.transfers.avax;
      }
    }
  }
  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
    token_avax: number
  ) {
    const tokens = {
      Eth: token_eth,
      Arb: token_arb,
      Bsc: token_bsc,
      Base: token_base,
      Avax: token_avax,
    };
    const sortedTokens = Object.entries(tokens).sort((a, b) => a[1] - b[1]); // Sort the tokens by price
    sortedTokens.forEach(([token], index) => {
      switch (token) {
        case "Eth":
          ethorder.value = index;
          break;
        case "Arb":
          arborder.value = index;
          break;
        case "Bsc":
          bscorder.value = index;
          break;
        case "Base":
          baseorder.value = index;
          break;
        case "Avax":
          avaxorder.value = index;
          break;
        default:
          break;
      }
    });
  }
  const starttimer = () => {
    // auto refresh logic
    let x = 0;
    const intervalId = setInterval(() => {
      if (x < 100) {
        x += 0.05;
      } else {
        setTimeout(() => {
          getPrices();
          starttimer();
        }, 250);
        clearInterval(intervalId); // Stop the interval when x reaches 100
      }
    }, 1);
  };
  useState(() => {
    // on load, fetch data and start timer
    getPrices();
    getChiffres();
    starttimer();
  });

  if(data){return (
    <>
      <div class="w-full flex flex-col gap-[5px] sm:gap-1">
        {/* ETH MarketBar */}
        <Omnibar
          chain="eth" 
          link="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
          ico="/chains/token_eth.png"
          initialloading={initialloading}
          order={ethorder}
          tooltip={ethtooltip}
          token={data.eth ? data.eth.price : 0}
          h24={data.eth ? data.eth.h24 : 0}
          liq={data.eth ? data.eth.liq : 0}
          vol24={data.eth ? data.eth.vol24 : 0}
          tx={data.eth ? data.eth.tx : 0}
          holders={ethholders}
          transfers={ethtransfers}
          contract="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
          trade="https://app.uniswap.org/swap?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&chain=ethereum"
        />
        {/* Arb MarketBar */}
        <Omnibar
          chain="arb"
          link="https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83"
          ico="/chains/token_arb.png"
          initialloading={initialloading}
          order={arborder}
          tooltip={arbtooltip}
          token={data.arb ? data.arb.price : 0}
          h24={data.arb ? data.arb.h24 : 0}
          liq={data.arb ? data.arb.liq : 0}
          vol24={data.arb ? data.arb.vol24 : 0}
          tx={data.arb ? data.arb.tx : 0}
          holders={arbholders}
          transfers={arbtransfers}
          contract="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
          trade="https://app.uniswap.org/swap?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&chain=arbitrum"
        />
        {/* Avax MarketBar */}
        <Omnibar
          chain="avax"
          link="https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643"
          ico="/chains/token_avax.png"
          initialloading={initialloading}
          order={avaxorder}
          tooltip={avaxtooltip}
          token={data.avax ? data.avax.price : 0}
          h24={data.avax ? data.avax.h24 : 0}
          liq={data.avax ? data.avax.liq : 0}
          vol24={data.avax ? data.avax.vol24 : 0}
          tx={data.avax ? data.avax.tx : 0}
          holders={avaxholders}
          transfers={avaxtransfers}
          contract="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
          trade="https://traderjoexyz.com/avalanche/trade?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
        />
        {/* Base MarketBar */}
        <Omnibar
          chain="base"
          link="https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e"
          ico="/chains/token_base.png"
          initialloading={initialloading}
          order={baseorder}
          tooltip={basetooltip}
          token={data.base ? data.base.price : 0}
          h24={data.base ? data.base.h24 : 0}
          liq={data.base ? data.base.liq : 0}
          vol24={data.base? data.base.vol24 : 0}
          tx={data.base ? data.base.tx : 0}
          holders={baseholders}
          transfers={basetransfers}
          contract="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
          trade="https://app.uniswap.org/swap?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&chain=base"
        />
        {/* BSC MarketBar */}
        <Omnibar
          chain="bsc"
          link="https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5"
          ico="/chains/token_bsc.png"
          initialloading={initialloading}
          order={bscorder}
          tooltip={bsctooltip}
          token={data.bsc ? data.bsc.price : 0}
          h24={data.bsc ? data.bsc.h24 : 0}
          liq={data.bsc ? data.bsc.liq : 0}
          vol24={data.bsc ? data.bsc.vol24 : 0}
          tx={data.bsc ? data.bsc.tx : 0}
          holders={bscholders}
          transfers={bsctransfers}
          contract="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
          trade="https://pancakeswap.finance/swap?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&chainId=56"
        />
      </div>
    </>
  );}
}
