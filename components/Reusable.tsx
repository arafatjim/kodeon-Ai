import React from 'react'

export const GrayTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-gray-600 font-bold text-3xl tracking-wide">
      {children}
    </span>
  );
};

export const BlueTitle = ({ children, className=""}
    : { 
        children: React.ReactNode,
        className?: string
     }) => {
  return (
    <span className={`text-blue-500 text-3xl font-bold tracking-tight ${className}`}>
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
    <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-1.5 font-bold tracking-tight mb-2">
      <GrayTitle>{gray} </GrayTitle>
      <br />
      <BlueTitle>{blue}</BlueTitle>
    </h1>
  );
}