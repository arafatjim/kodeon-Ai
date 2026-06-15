import React from 'react'

export const GrayTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-gray-500 text-sm font-medium tracking-wide">
      {children}
    </span>
  );
};

export const BlueTitle = ({ children, className="" }
    : { 
        children: React.ReactNode,
        className?: string
     }) => {
  return (
    <span className={`bg-liner-to-br font-serif from-blue-300 to-blue-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export const SelectionLabel = ({ children,  }
    : { 
        children: React.ReactNode,
        
     }) => {
  return (
    <p className={`text-sm text-blue-400 font-semibold tracking-[0.14em] uppercase mb-4`}>
      <span className='w-4 h-px bg-blue-400'/>
        {children}
        <span className='w-4 h-px bg-blue-400'/>
    </p>
  );
};

export const SectionHeading = ({gray, blue}: {gray: string, blue: string}) => {
  return (
    <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-1.5 font-bold tracking-tight mb-6">
      <GrayTitle>{gray} </GrayTitle>
      <br />
      <BlueTitle>{blue}</BlueTitle>
    </h1>
  );
}