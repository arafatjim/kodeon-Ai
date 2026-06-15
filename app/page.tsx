import { FireworksBackground } from "@/components/animate-ui/components/backgrounds/fireworks";
import { BlueTitle, GrayTitle } from "@/components/Reusable";
import { Badge } from "@/components/ui/badge";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20 ">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center ">
      
      <FireworksBackground className="absolute inset-0 h-full w-full"/>
       
      <Badge variant={'outline'} className="gap-2 p-3 backdrop-blur-xl border-2 border-gray-400 text-white/90">
        <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-primary"/>
        Powered by Gemini 3.5 Flash
      </Badge>

      <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
        <GrayTitle>Kodeon AI your dream</GrayTitle>
        <br />
        <BlueTitle>from a single prompt.</BlueTitle>
      </h1>
      </section>
    </main>
  );
}
