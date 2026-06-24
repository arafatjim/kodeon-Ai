"use client";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { BlueTitle, GrayTitle } from "@/components/Reusable";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PLACEHOLDERS } from "@/lib/data";
export default function Home() {

  const {isSignedIn} = useAuth();
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if(prompt.trim() || !isSignedIn){
      router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
    }
  }

  const [prompt, setPrompt] = useState("");
  const [isFocused, setFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect( () => {
    const t = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % PLACEHOLDERS.length);
    }, 5000);

    return () => clearInterval(t);
  }, [isFocused, prompt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }                                      

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfdfd] to-[#fdfdfd]">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center bg-gradient-to-b from-[#fdfdfd] to-[#fdfdfd]">
      
      <GravityStarsBackground className="absolute inset-0 h-full w-full" />
       
      <Badge variant={'outline'} className="gap-1 p-3 backdrop-blur-xl border-2 border-gray-400 text-md text-black/80 font-medium tracking-wide z-10">
        <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-primary"/>
        Powered by Gemini 3.5 Flash
      </Badge>

      <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-4xl lg:text-7xl z-10">
        <GrayTitle>Codexa your dream</GrayTitle>
        <br />
        
        <BlueTitle>from a single prompt.</BlueTitle>
      </h1>

      <p className="mx-auto max-w-xl text-balance  font-serif text-xl leading-tight tracking-tight  z-10 sm:text-2xl lg:text-3xl">
        Describe what you want to build.AI writes the code, picks the packages, and renders a live preview all inside your browser. No setup, no configuration, no hassle.
      </p>

      {/* Prompt Box */}
      <div className="relative mx-auto mt-12 w-full max-w-2xl">
        <div
          className={cn(
            "bg-blue-300/20 rounded-2xl border  duration-200",
            isFocused ? "border-white/20 ring-1 ring-black" : "border-black/10 ring-0"
          )}
        >
          <textarea className="w-full rounded-2xl bg-transparent- p-4 text-lg text-black/80 placeholder:text-black/40 focus:outline-none focus:ring-0 sm:text-xl" 
          ref = {textAreaRef}
           value={prompt}
           onFocus={() => setFocused(true)}
           onBlur={() => setFocused(false)}
           onKeyDown={handleKeyDown}
           rows={1}
           onChange={(e) => setPrompt(e.target.value)}
           style={ {minHeight: 56, maxHeight: 200}}
            placeholder={PLACEHOLDERS[placeholderIndex]}

            >
          
            
          </textarea>
        </div>
      </div>
      </section>
    </main>
  );
}
