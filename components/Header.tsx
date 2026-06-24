import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { IconButton } from './animate-ui/components/buttons/icon'

const Header = () => {
  return (
    <header className="bg-black/90 text-white p-4 fixed
    top-0 left-0 h-16 w-full z-50 border-white/6 backdrop-blur-2xl border-b">
        <nav className="container mx-auto flex justify-between items-center max-w-7xl px-2 sm:px-4 lg:px-8">
            <Link href="/" className="text-2xl font-bold">
                {/* <Image 
                src={"/logo.png"} 
                alt="Logo" 
                width={100} 
                height={100} 
                className="inline-block mr-2 rounded-md" /> */}
                <h1 className='text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-fuchsia-600'> 

                    Codexa
                   
                  </h1>
            </Link>
            <div className='text-md font-semibold  text-white items-center flex gap-1 md:gap-4'>

                <Show when="signed-in">
                    <Link href="/projects" className="mr-4  hover:text-white/80 hover:underline">
                    Projects
                </Link>
                
                <span className="inline-flex h-8 items-center ml-6 text-sm font-medium text-white/70 rounded-full bg-white/10 px-3 border border-white/20">
                    <Zap className="inline-block mr-1 fill-white/70" size={16} />
                    3/40 credits
                </span>
              <UserButton />
            </Show>

                
                

                <Show when="signed-out" fallback={null}>
              <SignInButton mode='modal'>
                <Button variant="ghost" className=" bg-blue-600 rounded-2xl font-medium text-sm sm:text-base h-10 sm:h-8 px-2 sm:px-5 cursor-pointer hover:bg-white/80 hover:text-black">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button variant="ghost" className=" bg-blue-600 rounded-2xl font-medium text-sm sm:text-base h-10 sm:h-8 px-2 sm:px-5 cursor-pointer hover:bg-white/80 hover:text-black">
                  Sign Up
                </Button>
              </SignUpButton>
              
            </Show>
            

            </div>
        </nav>
    </header>
  )
}

export default Header
