import Button from '../islands/Button.tsx'
import Web3Input from '../islands/Web3Input.tsx'

export default function Home() {
  return (
    <div>
      <div class="flex flex-col items-center justify-center overflow-hidden">
        <div class="mb-5 w-[1920px] h-[400px] overflow-hidden flex justify-center items-center">
          <image class="h-[600px] lg:h-auto" src="/dizzyhavoc_eye_3.jpeg"/>
        </div>
        <h1 class="text-4xl font-bold font-mono mb-8">dizzyhavoc-bridge</h1>
        <div class="flex flex-col items-center gap-1">
        
            <input list="chains" placeholder={'destination'}></input>
            <input placeholder={'address'}></input>
            <Web3Input placeholder="amount" maxVal={1000000000000000000000000n} decimals={18n}></Web3Input>
            <Button>bridge</Button>
            
            <datalist id="chains">
              <option value="ETH"></option>
              <option value="AVAX"></option>
              <option value="BASE"></option>
              <option value="ARB"></option>
              <option value="BSC"></option>
            </datalist>
            
        </div>
      </div>
    </div>
  );
}

