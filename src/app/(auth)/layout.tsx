import React from 'react'
import AuthDesign from './_components/auth-design';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid grid-cols-2 min-h-screen'>
      <AuthDesign />
      {children }
    </div>
  )
}
