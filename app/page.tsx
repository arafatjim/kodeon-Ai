"use client";

import { BlueTitle, GrayTitle, SectionHeading, SelectionLabel } from "@/components/Reusable";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PricingTable, SignInButton, useAuth } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";

import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { ChevronRight, ZapIcon, ZoomIn } from "lucide-react";
import { DrawerRoot } from "@base-ui/react";

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
    <main className="flex min-h-screen bg-black text-white flex-col items-center justify-between mb-10 px-4 pt-6">
      <GravityStarsBackground className="absolute inset-0 w-full h-screen" />
      <section className="relative mt-16 h-screen flex flex-col items-center overflow-hidden px-4  text-center sm:text-lg lg:text-xl">
      
      
       
      <Badge variant={'outline'} className="gap-1 py-3  backdrop-blur-xl border-2 border-gray-400 text-sm text-white font-medium tracking-wide z-10">
        <div className="h-4.5 w-4.5 animate-pulse rounded-full bg-primary"/>
        Powered by Gemini 3.5 Flash
      </Badge>

      <h1 className="leading-1.5 font-bold tracking-tight my-2 z-10 py-2 px-4 rounded-lg to-purple-300/20 backdrop-blur-md sm:text-xl lg:text-4xl ">
        <GrayTitle >Codexa your dream</GrayTitle>
        <br />
        <BlueTitle>from a single prompt.</BlueTitle>
      </h1>

      <p className="mx-auto max-w-7xl text-balance  font-serif  leading-tight tracking-tight  z-10 sm:text-sm lg:text-3xl text-white">
        Describe what you want to build.AI writes the code, picks the packages, and renders a live preview all inside your browser. No setup, no configuration, no hassle.
      </p>


      {/* Prompt Box */}
      <div className="relative mx-auto my-12 w-full text-white max-w-2xl">
        <div
          className={cn(
            "bg-blue-300/20 rounded-2xl text-white border duration-200 ",
            isFocused ? "border-white/20 ring-1 ring-black" : "border-black/10 ring-0"
          )}
        >
          <textarea className="w-full rounded-2xl bg-transparent- p-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-0 sm:text-xl " 
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

            <div className="flex item-center  justify-between border-t border-white/6 py-2.5 px-4 ">
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
                className="bg-blue-600 rounded-2xl  font-medium text-sm sm:text-base h-10 sm:h-8 px-2  sm:px-5 cursor-pointer hover:bg-white/80 hover:text-black">
                  Sign In to Generate Code
                </Button>
              </SignInButton>
              )
            }

            </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 "> 
          {SUGGESTIONS.map((suggestion, index) => (
            <Button 
            key={index}
             onAuxClick={()=> handleSuggestion(s)}
            variant="outline"
            size="sm"
            className="bg-blue-300/20 text-xs text-white hover:bg-blue-400/20 hover:text-blue-500/80"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
      </div>

      <p className="text-sm text-muted-foreground p-2 z-10 ">
        Gemini 3.5 Flash is a large language model trained by Google DeepMind. It is not affiliated with OpenAI or ChatGPT.
      </p>
      </section>


      <section className="relative mx-auto mt-2 w-full max-w-7xl  px-0 pb-20 ">
        <GravityStarsBackground className="absolute inset-0 w-full h-screen" />
        <div className="mx-auto max-w-8xl overflow-hidden rounded-3xl border-6 border-black/10 bg-white/20 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="rounded-3xl border border-black/5 bg-[#0f172a] p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            <div className="mb-3 flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-300">
              <span className="mr-2 text-slate-500">https://</span>
              <span className="truncate">app.codexa.ai/workspace</span>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.25rem] border border-white/10 bg-[#020617] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Workspace chat</p>
                    <p className="text-xs text-slate-400">Live AI collaboration</p>
                  </div>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                    Online
                  </div>
                </div>

                <div className="space-y-3 rounded-[1rem] border border-white/10 bg-slate-950/70 p-3">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-blue-500 px-3 py-2 text-sm text-white">
                      Create a sprint board for our launch
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-sm text-slate-100">
                      I’ll map the workflow into a kanban view with clear priorities.
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-sm text-slate-100">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span>Drafting board structure</span>
                      </div>
                      <div className="h-2 w-24 rounded-full bg-slate-700" />
                      <div className="mt-2 flex gap-2">
                        <div className="h-2 w-12 rounded-full bg-slate-700" />
                        <div className="h-2 w-16 rounded-full bg-slate-700" />
                        <div className="h-2 w-10 rounded-full bg-slate-700" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
                    </span>
                    Typing...
                  </div>

                  <div className="mt-2 flex items-center rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-400">
                    <span className="flex-1">Type a message…</span>
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">Send</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-white/10 bg-[#0f172a] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200">Preview</div>
                    <div className="rounded-full bg-slate-800/70 px-2.5 py-1 text-xs text-slate-400">Code</div>
                    <div className="rounded-full bg-slate-800/70 px-2.5 py-1 text-xs text-slate-400">Settings</div>
                  </div>
                  <div className="text-xs text-slate-400">Kanban board</div>
                </div>

                <div className="rounded-[1rem] border border-white/10 bg-[#020617] p-3">
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                    <span>Launch prep</span>
                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-300">Auto-generated</span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-200">Todo</span>
                        <span className="text-xs text-slate-500">3</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-lg border border-dashed border-slate-700 bg-slate-950/70" />
                        <div className="h-12 rounded-lg border border-dashed border-slate-700 bg-slate-950/70" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-200">In Progress</span>
                        <span className="text-xs text-slate-500">2</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-14 rounded-lg border border-dashed border-slate-700 bg-slate-950/70" />
                        <div className="h-10 rounded-lg border border-dashed border-slate-700 bg-slate-950/70" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-200">Done</span>
                        <span className="text-xs text-slate-500">4</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-lg border border-dashed border-slate-700 bg-slate-950/70" />
                        <div className="h-16 rounded-lg border border-dashed border-slate-700 bg-slate-950/70" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* Features section */}
        <section className="w-full max-w-7xl my-4">
          
          <div className="mx-auto mb-14 text-center">
            
            <SelectionLabel>Everything you need</SelectionLabel>
            <SectionHeading gray={"From prompt"} blue={"to production."} />
          </div>

          <div className="mx-auto p-2 grid grid-cols-1 gap-2 overflow-hidden border-6 border-white/70 rounded-2xl b bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="group  bg-[#132440] text-white p-6 hover:bg-black rounded-lg">
                
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-white text-blue-600">
                  <Icon className="h-4 w-4 " />
              </div>

                  <p className="mb-2  text-sm font-semibold ">{label}</p>
                  <p className="text-sm text-white  leading-relaxed text-black/80 ">
                  {desc}
                  </p>
      
    
  </div>
))}
          </div>
        </section>

{/* HOW IT WORKS / Steps section */}
      <section className="w-full max-w-7xl my-4">
        
          <div className="mx-auto mb-14 text-center">
            
            <SelectionLabel>How it works</SelectionLabel>

            <SectionHeading gray={"For steps"} blue={"to a working app."} />
          </div>

          <div className="mx-auto p-2 border-6 border-gray-300 rounded-2xl max-w-3xl">
            
            {STEPS.map((step, i)=>{
              return(
                
                <div key={step.number} className="flex items-center gap-6">
                  
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/10">
                    
                        <span className="font-mono p-2 text-xs font-smeibold text-white/90">
                          {step?.number}
                        </span>
                    </div>
                    {
                      i< STEPS.length - 1 && (
                        <div className="mt-2 h-full w-px bg-white/8"/>
                      )
                    }
                  </div>

                  <div className="pb-10 pt-1.5">
                    <p className="mb-1.5 text-sm font-semibold sm:text-base">
                      {step?.label}
                    </p>
                    <p className="text-sm loading-relaxed text-white/40">
                      {step?.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>


{/* Pricing section */}

      <section className="w-full max-w-7xl my-4  flexborder-white px-8  ">
        <GravityStarsBackground className="absolute  " />
          <div className="mx-auto mb-14 py-14 text-center">
            <SelectionLabel>Simple Pricing</SelectionLabel>
            <SectionHeading gray={"Start free"} blue={"scale when ready."} />

            <p className="mx-auto mt-4 max-w-sm text-sm text-white/70">No credit card required. Upgrade or downgrade anytime.</p>

          </div>


          <div className="mx-auto max-w-3xl ">
            {/* Pricing Table */}
              <PricingTable
                checkoutProps={{
                  appearance:{
                    elements:{
                      drawerRoot:{
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              />
          </div>
        </section>


{/* Sales Scale Section */}
        <section className="relative mx-auto px-8 py-14 mb-32 max-w-5xl w-full overflow-hidden rounded-2xl border border-white/8 text-center my-16">
            <GravityStarsBackground className="w-full  absolute" />

              <SectionHeading gray="Start building," blue="for free."/>

              <p className="py-2">
                Get 10 free generations on sign up. No credit card required.
                <br />
                Upgrade when you&apos;re ready.
              </p>

              <SignInButton mode="modal">
                <Button 
                  size="lg"
                  className="relative h-11 rounded-full bg-blue-500 px-8 hover:bg-white hover:text-black font-semibold"
                >
                  Get started free
                  <ChevronRight className="h-6 w-6"/>
                </Button>
              </SignInButton>
        </section>



{/* Footer Section */}
        <footer className="relative w-full z-10 border-t-2 border-white/60 py-12 px-6 flex flex-wrap items-center justify-center text-stone-400">
          Made by Y@JIM
        </footer>
    </main>
  );
}
