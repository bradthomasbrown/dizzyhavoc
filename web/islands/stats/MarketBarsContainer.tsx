import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { PriceHistory } from "../../lib/stats/Requests/priceHistory.tsx";
import { Chiffres } from "../../lib/stats/Requests/Chiffres.tsx";
import { Omnibar } from "./marketbars/omnibar.tsx";
import { cachedData } from "../../lib/stats/Requests/caches/dexCache.tsx";
import { sortby } from "../../components/stats/SettingsMenu.tsx";

export function MarketBarsContainer() {
  if (!IS_BROWSER) return <></>;
  // console.log(data,'logging after while loop');
  const initialloading = useSignal<boolean>(true);
  const timestamp = useSignal<number>(null);
  const now = useSignal<number>(0);
  // liquidity
  const liq_eth = useSignal<number>(0);
  const liq_arb = useSignal<number>(0);
  const liq_bsc = useSignal<number>(0);
  const liq_base = useSignal<number>(0);
  const liq_avax = useSignal<number>(0);
  // daily volume
  const vol24_eth = useSignal<number>(0);
  const vol24_arb = useSignal<number>(0);
  const vol24_bsc = useSignal<number>(0);
  const vol24_base = useSignal<number>(0);
  const vol24_avax = useSignal<number>(0);
  // prices
  const token_eth = useSignal<number>(0);
  const token_arb = useSignal<number>(0);
  const token_bsc = useSignal<number>(0);
  const token_base = useSignal<number>(0);
  const token_avax = useSignal<number>(0);
  // txn count
  const tx_eth = useSignal<number>(0);
  const tx_arb = useSignal<number>(0);
  const tx_bsc = useSignal<number>(0);
  const tx_base = useSignal<number>(0);
  const tx_avax = useSignal<number>(0);
  // h24 price change
  const h24_eth = useSignal<number>(0);
  const h24_arb = useSignal<number>(0);
  const h24_bsc = useSignal<number>(0);
  const h24_base = useSignal<number>(0);
  const h24_avax = useSignal<number>(0);
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
    const data = cachedData; // get data from summary's cached values
    const result = await data;
    timestamp.value = result.timestamp; // timestamp for last update
    await PriceHistory(); // get chart data
    let arbprice = 0,
      ethprice = 0,
      bscprice = 0,
      baseprice = 0,
      avaxprice = 0;

    for (let i = 0; i < result.pairs.length; i++) { // for each item in sanatized list, assign values
      const fixedvalue = result.pairs[i].priceUsd ? Number(result.pairs[i].priceUsd).toFixed(5) : 0;
      const fixedliq = result.pairs[i].liquidity.usd ? Number(result.pairs[i].liquidity.usd).toFixed(5) : 0;
      const fixedvol =  result.pairs[i].volume.h24 ? result.pairs[i].volume.h24 : 0;
      const fixedbuys = result.pairs[i].txns.h24.buys ? result.pairs[i].txns.h24.buys : 0;
      const fixedsells = result.pairs[i].txns.h24.sells ? result.pairs[i].txns.h24.sells : 0;
      const fixedh24 = result.pairs[i].priceChange.h24 ? result.pairs[i].priceChange.h24 : 0;
      switch (result.pairs[i].url) {
        case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
          token_eth.value = ethprice = Number(fixedvalue);
          liq_eth.value = fixedliq
          vol24_eth.value = fixedvol
          tx_eth.value = fixedbuys + fixedsells
          h24_eth.value = fixedh24
          break;
        case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
          token_arb.value = arbprice = Number(fixedvalue);
          liq_arb.value = fixedliq
          vol24_arb.value = fixedvol
          tx_arb.value = fixedbuys + fixedsells
          h24_arb.value = fixedh24
          break;
        case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
          token_bsc.value = bscprice = Number(fixedvalue);
          liq_bsc.value = fixedliq
          vol24_bsc.value = fixedvol
          tx_bsc.value = fixedbuys + fixedsells
          h24_bsc.value = fixedh24
          break;
        case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
          token_base.value = baseprice = Number(fixedvalue);
          liq_base.value = fixedliq
          vol24_base.value = fixedvol
          tx_base.value = fixedbuys + fixedsells
          h24_base.value = fixedh24
          break;
        case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
          token_avax.value = avaxprice = Number(fixedvalue);
          liq_avax.value = fixedliq
          vol24_avax.value = fixedvol
          tx_avax.value = fixedbuys + fixedsells
          h24_avax.value = fixedh24
          break;
        default:
          break;
      }
    }
    initialloading.value = false;
    if (sortby.value === "price") { // when sorting by price, default 
      sortPairs(ethprice, arbprice, bscprice, baseprice, avaxprice);
    } else if (sortby.value === "liquidity") { // by liquidity
      sortPairs(
        liq_eth.value,
        liq_arb.value,
        liq_bsc.value,
        liq_base.value,
        liq_avax.value
      );
    } else if (sortby.value === "volume") {  // by volume
      sortPairs(
        vol24_eth.value,
        vol24_arb.value,
        vol24_bsc.value,
        vol24_base.value,
        vol24_avax.value
      );
    } else if (sortby.value === "txn") { // by txn
      sortPairs(
        tx_eth.value,
        tx_arb.value,
        tx_bsc.value,
        tx_base.value,
        tx_avax.value
      );
    } else if (sortby.value === "24h") { // by 24h change
      sortPairs(
        h24_eth.value,
        h24_arb.value,
        h24_bsc.value,
        h24_base.value,
        h24_avax.value
      );
    }
  };
  const getChiffres = async () => {
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
  };
  function sortPairs(
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
    setInterval(() => {
      getPrices();
      now.value = new Date();
    }, 500);
  };
  function timediff(now: number, timestamp: number): string {
    const timeDiff = (now - timestamp) / 1000;
    if (timeDiff >= 1) {
      if (timeDiff >= 7200) {
        const hours = Math.floor(timeDiff / 3600);
        return `${hours}hrs ago`;
      }
      if (timeDiff >= 3600) {
        const hours = Math.floor(timeDiff / 3600);
        return `${hours}hr ago`;
      }
      if (timeDiff >= 120) {
        const minutes = Math.floor(timeDiff / 60);
        return `${minutes}mins ago`;
      }
      if (timeDiff >= 60) {
        const minutes = Math.floor(timeDiff / 60);
        return `${minutes}min ago`;
      } else {
        const seconds = Math.floor(timeDiff);
        return `${seconds}s ago`;
      }
    } else {
      return "just now";
    }
  }
  useState(() => {
    // on load, start cache loop and get holder & transfer counts
    starttimer();
    getChiffres();
  });
  return (
    <div class="relative">
      {timestamp.value != 0 ? (
        <p class="dark:text-[#9ca3af] text-[#313131] font-[Poppins] font-light unselectable sm:text-[10px] text-[7px] absolute -top-[9px] sm:-top-[18px] left-[1.5%] sm:left-[87%] z-[5]">
          {timediff(now.value, timestamp.value)}
        </p>
      ) : null}
      <div class="w-full flex flex-col gap-[6px]">
        {/* ETH MarketBar */}
        <Omnibar
          chain="eth"
          link="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
          ico="/chains/token_eth.png"
          initialloading={initialloading}
          order={ethorder}
          tooltip={ethtooltip}
          token={token_eth}
          h24={h24_eth}
          liq={liq_eth}
          vol24={vol24_eth}
          tx={tx_eth}
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
          token={token_arb}
          h24={h24_arb}
          liq={liq_arb}
          vol24={vol24_arb}
          tx={tx_arb}
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
          token={token_avax}
          h24={h24_avax}
          liq={liq_avax}
          vol24={vol24_avax}
          tx={tx_avax}
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
          token={token_base}
          h24={h24_base}
          liq={liq_base}
          vol24={vol24_base}
          tx={tx_base}
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
          token={token_bsc}
          h24={h24_bsc}
          liq={liq_bsc}
          vol24={vol24_bsc}
          tx={tx_bsc}
          holders={bscholders}
          transfers={bsctransfers}
          contract="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
          trade="https://pancakeswap.finance/swap?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&chainId=56"
        />
      </div>
    </div>
  );
}
