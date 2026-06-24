"use client";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { BlueTitle, GrayTitle } from "@/components/Reusable";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PLACEHOLDERS, SUGGESTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Sign } from "crypto";
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

  useEffect(() => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }       
  
  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    textAreaRef.current?.focus();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center bg-gradient-to-b from-[#fdfdfd] to-[#fdfdfd]">
      
      <GravityStarsBackground className="absolute inset-0 h-full w-full" />
       
      <Badge variant={'outline'} className="gap-1 py-3  backdrop-blur-xl border-2 border-gray-400 text-sm text-black/80 font-medium tracking-wide z-10">
        <div className="h-4.5 w-4.5 animate-pulse rounded-full bg-primary"/>
        Powered by Gemini 3.5 Flash
      </Badge>

      <h1 className="leading-1.5 font-bold tracking-tight my-2 z-10 py-2 px-4 rounded-lg to-purple-300/20 backdrop-blur-md border border-white/10 sm:text-xl lg:text-4xl ">
        <GrayTitle >Codexa your dream</GrayTitle>
        <br />
        <BlueTitle>from a single prompt.</BlueTitle>
      </h1>

      <p className="mx-auto max-w-7xl text-balance  font-serif  leading-tight tracking-tight  z-10 sm:text-sm lg:text-3xl">
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
            />

            <div className="flex item-center justify-between border-t border-white/6 py-2.5 px-4">
            <span className="text-xs text-blue-600">
              Press 
            
              Shift + Enter for new line
            </span>
            {
              isSignedIn ? (<Button 
              onClick={handleSubmit} 
              disabled={!prompt.trim()}
              variant={prompt.trim()? "default": "secondary"}

              className="bg-blue-600 rounded-2xl font-medium text-sm sm:text-base h-10 sm:h-8 px-2 sm:px-5 cursor-pointer hover:bg-white/80 hover:text-black">
                Generate Code
              </Button>) : (
                <SignInButton mode='modal'>
                <Button 
                variant="default"
                className="bg-blue-600 rounded-2xl font-medium text-sm sm:text-base h-10 sm:h-8 px-2 sm:px-5 cursor-pointer hover:bg-white/80 hover:text-black">
                  Sign In to Generate Code
                </Button>
              </SignInButton>
              )
            }

            </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2"> 
          {SUGGESTIONS.map((suggestion, index) => (
            <Button 
            key={index}
             onAuxClick={()=> handleSuggestion(s)}
            variant="outline"
            size="sm"
            className="bg-blue-300/20 text-black/80 hover:bg-blue-400/20 hover:text-black/90"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4 z-10 ">
        Gemini 3.5 Flash is a large language model trained by Google DeepMind. It is not affiliated with OpenAI or ChatGPT.
      </p>
      </section>
    </main>
  );
}
