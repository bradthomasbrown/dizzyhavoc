export default function Home() {
  return (
    <div>
      <div class="flex flex-col items-center justify-center overflow-hidden">
        <div class="mb-5 w-[1920px] h-[400px] overflow-hidden flex justify-center items-center">
          <image class="h-[600px] lg:h-auto" src="/dizzyhavoc_eye_3.jpeg"/>
        </div>
        <h1 class="text-4xl font-bold font-mono">dizzyhavoc-bridge</h1>
        <div class="flex flex-col items-center gap-1">
            <input placeholder={'destination'}></input>
            <input placeholder={'address'}></input>
            <input placeholder={'amount'}></input>
            <button>bridge</button>
        </div>
      </div>
    </div>
  );
}
