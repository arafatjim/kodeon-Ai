import { Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-black/90 text-white p-4 fixed
    top-0 left-0 h-16 w-full z-50 border-white/6 backdrop-blur-2xl border-b">
        <nav className="container mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-2xl font-bold">
                <Image 
                src={"/logo.png"} 
                alt="Logo" 
                width={100} 
                height={100} 
                className="inline-block mr-2 rounded-md" />
            </Link>
            <div className='text-md font-semibold  text-white'>
                <Link href="/projects" className="mr-4  hover:text-white/80 hover:underline">
                    Projects
                </Link>
                <Link href="/contact" className="mr-4  hover:text-white/80 hover:underline">
                    Contact
                </Link>
                <span className="inline-flex h-8 items-center ml-6 text-sm font-medium text-white/70 rounded-full bg-white/10 px-3 border border-white/20">
                    <Zap className="inline-block mr-1 fill-white/70" size={16} />
                    3/40 credits
                </span>
            </div>
        </nav>
    </header>
  )
}

export default Header
